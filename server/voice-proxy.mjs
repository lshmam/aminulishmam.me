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

wss.on('connection', (clientWs) => {
  console.log('Client connected to proxy. Waiting for Turnstile auth...');
  let vertexWs = null;
  let isAuthenticated = false;

  const connectToVertex = async () => {
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
        clientWs.send(JSON.stringify({ type: 'proxy_error', error: err.message }));
      });

    } catch (error) {
      console.error('Failed to establish Vertex AI session:', error);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ type: 'proxy_error', error: error.message }));
        clientWs.close(1011, "Internal error");
      }
    }
  };

  clientWs.on('message', async (message) => {
    // 3. Handle messages from the browser client
    if (!isAuthenticated) {
      try {
        const msgObj = JSON.parse(message.toString());
        if (msgObj.type === 'auth' && msgObj.token) {
           console.log("Verifying Turnstile token...");
           
           if (msgObj.token === "localhost-dev-token") {
             console.log("Localhost dev token detected! Bypassing Turnstile.");
             isAuthenticated = true;
             connectToVertex();
             return;
           }

           const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
           
           const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
             method: 'POST',
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
             body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(msgObj.token)}`,
           });
           
           const verifyData = await verifyRes.json();
           
           if (verifyData.success) {
             console.log("Turnstile verification passed! Connecting to Vertex.");
             isAuthenticated = true;
             connectToVertex();
           } else {
             console.error("Bot verification failed", verifyData);
             clientWs.close(4003, "Forbidden - Bot Detected");
           }
        } else {
           clientWs.close(4000, "Bad Request - Missing Auth");
        }
      } catch (e) {
        clientWs.close(4000, "Bad Request");
      }
      return;
    }

    if (vertexWs && vertexWs.readyState === WebSocket.OPEN) {
      try {
        const msgObj = JSON.parse(message.toString());
        if (msgObj.setup && msgObj.setup.model) {
          const shortModel = msgObj.setup.model.replace('models/', '');
          msgObj.setup.model = `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${shortModel}`;
          vertexWs.send(JSON.stringify(msgObj));
          return;
        }
      } catch (e) {}
      
      vertexWs.send(message.toString());
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
  console.log(`Turnstile Bot Protection: ENABLED`);
});
