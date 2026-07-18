import { WebSocketServer, WebSocket } from 'ws';
import { GoogleAuth } from 'google-auth-library';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
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

wss.on('connection', async (clientWs) => {
  console.log('Client connected to proxy.');
  let vertexWs = null;

  try {
    // 1. Authenticate using Application Default Credentials
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    console.log('Fetching Google Cloud access token...');
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    if (!accessToken.token) {
      throw new Error("Failed to get access token");
    }

    // 2. Connect to Vertex AI Live API
    const vertexUrl = `wss://${LOCATION}-aiplatform.googleapis.com/ws/google.cloud.aiplatform.v1beta1.LlmBidiService/BidiGenerateContent?access_token=${accessToken.token}`;
    
    console.log(`Connecting to Vertex AI at ${LOCATION}...`);
    vertexWs = new WebSocket(vertexUrl);

    vertexWs.on('open', () => {
      console.log('Connected to Vertex AI Live API.');
      clientWs.send(JSON.stringify({ type: 'proxy_connected' }));
    });

    vertexWs.on('message', (data) => {
      // Forward Vertex AI messages directly to the client
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(data.toString());
      }
    });

    vertexWs.on('close', (code, reason) => {
      console.log(`Vertex AI disconnected: ${code} - ${reason}`);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.close(code, reason);
      }
    });

    vertexWs.on('error', (err) => {
      console.error('Vertex AI WebSocket error:', err);
      clientWs.send(JSON.stringify({ type: 'proxy_error', error: err.message }));
    });

    // 3. Handle messages from the browser client
    clientWs.on('message', (message) => {
      if (vertexWs && vertexWs.readyState === WebSocket.OPEN) {
        try {
          const msgObj = JSON.parse(message.toString());
          // Rewrite the model string if a setup message is sent, because Vertex AI requires full paths!
          if (msgObj.setup && msgObj.setup.model) {
            const shortModel = msgObj.setup.model.replace('models/', '');
            msgObj.setup.model = `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${shortModel}`;
            console.log(`Rewrote setup model to: ${msgObj.setup.model}`);
            vertexWs.send(JSON.stringify(msgObj));
            return;
          }
        } catch (e) {
          // not JSON or other issue, just pass through below
        }
        
        // Pass the raw payload directly to Vertex AI
        vertexWs.send(message.toString());
      }
    });

  } catch (error) {
    console.error('Failed to establish Vertex AI session:', error);
    clientWs.send(JSON.stringify({ type: 'proxy_error', error: error.message }));
    clientWs.close();
  }

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
});
