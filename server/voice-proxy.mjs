import { WebSocketServer, WebSocket } from 'ws';
import { GoogleAuth } from 'google-auth-library';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const PORT = process.env.VOICE_PROXY_PORT || 8080;
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

if (!PROJECT_ID) {
  console.warn("⚠️ Warning: GOOGLE_CLOUD_PROJECT is not set in .env.local");
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Voice Proxy Server is running.\n');
});

const wss = new WebSocketServer({ server });

async function connectToVertex(clientWs, onConnected) {
  try {
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });

    console.log('Fetching Google Cloud access token...');
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    if (!accessToken.token) throw new Error("Failed to get access token");

    const vertexUrl = `wss://${LOCATION}-aiplatform.googleapis.com/ws/google.cloud.aiplatform.v1beta1.LlmBidiService/BidiGenerateContent?access_token=${accessToken.token}`;

    console.log(`Connecting to Vertex AI at ${LOCATION}...`);
    const vertexWs = new WebSocket(vertexUrl);

    vertexWs.on('open', () => {
      console.log('Connected to Vertex AI Live API.');
      clientWs.send(JSON.stringify({ type: 'proxy_connected' }));
      onConnected(vertexWs);
    });

    vertexWs.on('message', (data) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(data.toString());
      }
    });

    vertexWs.on('close', (code, reason) => {
      console.log(`Vertex AI disconnected: ${code} - ${reason}`);
      if (clientWs.readyState === WebSocket.OPEN) {
        try {
          const validCode = (typeof code === 'number' && code >= 1000 && code <= 4999) ? code : 1000;
          clientWs.close(validCode, reason ? reason.toString() : '');
        } catch (e) {
          clientWs.close();
        }
      }
    });

    vertexWs.on('error', (err) => {
      console.error('Vertex AI WebSocket error:', err);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ type: 'proxy_error', error: err.message }));
      }
    });

  } catch (error) {
    console.error('Failed to establish Vertex AI session:', error);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ type: 'proxy_error', error: error.message }));
      clientWs.close(1011, "Internal error");
    }
  }
}

wss.on('connection', (clientWs) => {
  console.log('Client connected to proxy.');
  let vertexWs = null;

  // Connect immediately — no auth gate
  connectToVertex(clientWs, (ws) => { vertexWs = ws; });

  clientWs.on('message', async (message) => {
    // Silently drop legacy auth messages
    try {
      const msgObj = JSON.parse(message.toString());
      if (msgObj.type === 'auth') return;

      if (vertexWs && vertexWs.readyState === WebSocket.OPEN) {
        // Rewrite model path for Vertex AI
        if (msgObj.setup && msgObj.setup.model) {
          const shortModel = msgObj.setup.model.replace('models/', '');
          msgObj.setup.model = `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${shortModel}`;
          vertexWs.send(JSON.stringify(msgObj));
          return;
        }
        vertexWs.send(JSON.stringify(msgObj));
      }
    } catch (e) {
      // Not JSON — forward raw
      if (vertexWs && vertexWs.readyState === WebSocket.OPEN) {
        vertexWs.send(message.toString());
      }
    }
  });

  clientWs.on('close', () => {
    console.log('Client disconnected from proxy.');
    if (vertexWs && vertexWs.readyState === WebSocket.OPEN) {
      vertexWs.close();
    }
  });
});

server.listen(PORT, () => {
  console.log(`🎤 Voice Proxy Server running on ws://localhost:${PORT}`);
  console.log(`Project ID: ${PROJECT_ID || 'NOT SET'}`);
  console.log(`Location: ${LOCATION}`);
  console.log(`Turnstile Bot Protection: DISABLED`);
});
