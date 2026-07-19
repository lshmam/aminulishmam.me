const workletCode = `
class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0];
      const pcm16 = new Int16Array(channelData.length);
      for (let i = 0; i < channelData.length; i++) {
        // Float32 to Int16 conversion
        let s = Math.max(-1, Math.min(1, channelData[i]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
      this.port.postMessage(pcm16.buffer);
    }
    return true;
  }
}
registerProcessor('pcm-processor', PCMProcessor);
`;

export type AgentState = 'idle' | 'listening' | 'speaking';

export interface GeminiLiveClientOptions {
  turnstileToken: string;
  onStateChange: (state: AgentState) => void;
  onToolCall: (toolCall: any) => Promise<any>;
  onAudioLevel: (level: number) => void;
  onText?: (text: string, isFinal?: boolean) => void;
  systemInstruction?: string;
}

export class GeminiLiveClient {
  private ws: WebSocket | null = null;
  private captureContext: AudioContext | null = null;
  private playbackContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private workletNode: AudioWorkletNode | null = null;
  
  private captureAnalyser: AnalyserNode | null = null;
  private playbackAnalyser: AnalyserNode | null = null;
  private captureDataArray: Uint8Array | null = null;
  private playbackDataArray: Uint8Array | null = null;
  private animationFrameId: number | null = null;
  
  private nextPlaybackTime: number = 0;
  private options: GeminiLiveClientOptions;

  constructor(options: GeminiLiveClientOptions) {
    this.options = options;
  }

  get isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  async connect() {
    return new Promise<void>((resolve, reject) => {
      this.ws = new WebSocket('ws://localhost:8080');

      this.ws.onopen = () => {
        console.log('Connected to local Voice Proxy, sending auth token...');
        this.ws?.send(JSON.stringify({ type: 'auth', token: this.options.turnstileToken }));
      };

      this.ws.onmessage = async (event) => {
        let msg: any;
        try {
          msg = JSON.parse(event.data);
        } catch (e) {
          return;
        }

        if (msg.type === 'proxy_connected') {
          console.log('Proxy established connection to Vertex AI. Sending setup...');
          this.sendSetup();
          resolve();
        } else if (msg.type === 'proxy_error') {
          console.error('Proxy Error:', msg.error);
          reject(new Error(msg.error));
        } else if (msg.serverContent) {
          // Model returned content
          if (msg.serverContent.modelTurn) {
            this.options.onStateChange('speaking');
            const parts = msg.serverContent.modelTurn.parts;
            for (const part of parts) {
              if (part.inlineData && part.inlineData.data) {
                // Decode base64 PCM and play it
                this.playAudioChunk(part.inlineData.data);
              }
              if (part.text && this.options.onText) {
                this.options.onText(part.text, false);
              }
            }
          }
          if (msg.serverContent.turnComplete) {
            this.options.onStateChange('listening');
            if (this.options.onText) {
              this.options.onText('', true); // signal end of turn
            }
          }
        } else if (msg.toolCall) {
          // Model requested a tool
          this.handleToolCall(msg.toolCall);
        }
      };

      this.ws.onclose = () => {
        console.log('Voice Proxy disconnected');
        this.stop();
      };
    });
  }

  private sendSetup() {
    const setupMsg = {
      setup: {
        model: 'models/gemini-live-2.5-flash-native-audio',
        generationConfig: {
          responseModalities: ['AUDIO'],
        },
        systemInstruction: {
          parts: [{ text: this.options.systemInstruction || "You are a helpful voice assistant." }]
        },
        tools: [
          {
            functionDeclarations: [
              {
                name: 'show_project',
                description: 'Navigates the user to a specific project page.',
                parameters: {
                  type: 'OBJECT',
                  properties: {
                    slug: { type: 'STRING', enum: ['arrive', 'faeth-studio', 'jim-coach', 'mytrials', 'neta-bridge', 'neucler'] }
                  },
                  required: ['slug']
                }
              },
              {
                name: 'show_about',
                description: 'Navigates the user to the about page.',
                parameters: { type: 'OBJECT', properties: {} }
              },
              {
                name: 'close_project',
                description: 'Closes the current project and returns the user to the home page.',
                parameters: { type: 'OBJECT', properties: {} }
              },
              {
                name: 'show_image',
                description: 'Displays a specific project image in a lightbox. Call this exactly when you want the user to look at the image.',
                parameters: {
                  type: 'OBJECT',
                  properties: {
                    project: { type: 'STRING' },
                    index: { type: 'INTEGER' }
                  },
                  required: ['project', 'index']
                }
              },
              {
                name: 'render_diagram',
                description: 'Generates and displays an architectural diagram on the user\'s screen. Use this when explaining complex pipelines, flows, or architectures.',
                parameters: {
                  type: 'OBJECT',
                  properties: {
                    mermaidCode: { type: 'STRING', description: 'Valid Mermaid.js flowchart syntax (e.g., "graph TD; A-->B;")' },
                    title: { type: 'STRING' }
                  },
                  required: ['mermaidCode', 'title']
                }
              },
              {
                name: 'scroll_to_section',
                description: 'Scrolls the current page to a specific section by CSS selector.',
                parameters: {
                  type: 'OBJECT',
                  properties: {
                    selector: { type: 'STRING' }
                  },
                  required: ['selector']
                }
              }
            ]
          }
        ]
      }
    };

    this.ws?.send(JSON.stringify(setupMsg));
    
    // Send initial greeting trigger
    this.ws?.send(JSON.stringify({
      clientContent: {
        turns: [{
          role: 'user',
          parts: [{ text: 'Greet the visitor and briefly introduce the portfolio.' }]
        }],
        turnComplete: true
      }
    }));
  }

  sendText(text: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        clientContent: {
          turns: [{
            role: 'user',
            parts: [{ text }]
          }],
          turnComplete: true
        }
      }));
    }
  }

  sendImage(base64Data: string, mimeType: string = 'image/jpeg') {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        realtimeInput: {
          mediaChunks: [
            {
              mimeType,
              data: base64Data
            }
          ]
        }
      }));
    }
  }

  private async handleToolCall(toolCallMsg: any) {
    const responses: any[] = [];
    
    for (const call of toolCallMsg.functionCalls) {
      console.log('Executing Tool:', call.name, call.args);
      try {
        const result = await this.options.onToolCall(call);
        responses.push({
          id: call.id,
          name: call.name,
          response: result
        });
      } catch (err: any) {
        responses.push({
          id: call.id,
          name: call.name,
          response: { error: err.message }
        });
      }
    }

    // Send tool response back
    this.ws?.send(JSON.stringify({
      toolResponse: {
        functionResponses: responses
      }
    }));
  }

  async startRecording() {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Live API expects 16kHz PCM
      this.captureContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });

      // Setup audio analyzer for capture context
      this.captureAnalyser = this.captureContext.createAnalyser();
      this.captureAnalyser.fftSize = 256;
      this.captureDataArray = new Uint8Array(this.captureAnalyser.frequencyBinCount);

      const source = this.captureContext.createMediaStreamSource(this.mediaStream);
      source.connect(this.captureAnalyser);

      // Setup Worklet
      const blob = new Blob([workletCode], { type: 'application/javascript' });
      const workletUrl = URL.createObjectURL(blob);
      await this.captureContext.audioWorklet.addModule(workletUrl);
      
      this.workletNode = new AudioWorkletNode(this.captureContext, 'pcm-processor');
      
      this.workletNode.port.onmessage = (e) => {
        const buffer = e.data as ArrayBuffer;
        if (this.ws?.readyState === WebSocket.OPEN) {
          // Convert to base64
          const bytes = new Uint8Array(buffer);
          let binary = '';
          for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          const base64 = btoa(binary);

          this.ws.send(JSON.stringify({
            realtimeInput: {
              mediaChunks: [{
                mimeType: "audio/pcm;rate=16000",
                data: base64
              }]
            }
          }));
        }
      };

      source.connect(this.workletNode);
      this.workletNode.connect(this.captureContext.destination);

      // Start visualization loop
      this.startAudioLoop();
      this.options.onStateChange('listening');
    } catch (err) {
      console.error('Error starting audio capture:', err);
    }
  }

  private async playAudioChunk(base64Data: string) {
    if (!this.playbackContext) {
      // Vertex returns 24kHz PCM
      this.playbackContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000
      });
      
      this.playbackAnalyser = this.playbackContext.createAnalyser();
      this.playbackAnalyser.fftSize = 256;
      this.playbackDataArray = new Uint8Array(this.playbackAnalyser.frequencyBinCount);
      this.startAudioLoop();
    }

    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Convert Int16 bytes back to Float32 for Web Audio API
    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
    }

    const audioBuffer = this.playbackContext.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);

    const source = this.playbackContext.createBufferSource();
    source.buffer = audioBuffer;
    
    // Connect to playback analyser for visualizer, then to output
    if (this.playbackAnalyser) {
      source.connect(this.playbackAnalyser);
      this.playbackAnalyser.connect(this.playbackContext.destination);
    } else {
      source.connect(this.playbackContext.destination);
    }

    const currentTime = this.playbackContext.currentTime;
    if (this.nextPlaybackTime < currentTime) {
      this.nextPlaybackTime = currentTime;
    }

    source.start(this.nextPlaybackTime);
    this.nextPlaybackTime += audioBuffer.duration;
  }

  private startAudioLoop() {
    const update = () => {
      let captureLevel = 0;
      let playbackLevel = 0;

      if (this.captureAnalyser && this.captureDataArray) {
        this.captureAnalyser.getByteFrequencyData(this.captureDataArray as any);
        let sum = 0;
        for (let i = 0; i < this.captureDataArray.length; i++) {
          sum += this.captureDataArray[i];
        }
        captureLevel = (sum / this.captureDataArray.length) / 255;
      }

      if (this.playbackAnalyser && this.playbackDataArray) {
        this.playbackAnalyser.getByteFrequencyData(this.playbackDataArray as any);
        let sum = 0;
        for (let i = 0; i < this.playbackDataArray.length; i++) {
          sum += this.playbackDataArray[i];
        }
        playbackLevel = (sum / this.playbackDataArray.length) / 255;
      }

      // Combine levels (take max of both)
      this.options.onAudioLevel(Math.max(captureLevel, playbackLevel));
      
      this.animationFrameId = requestAnimationFrame(update);
    };
    if (this.animationFrameId === null) {
      update();
    }
  }

  stop() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }
    if (this.captureContext) {
      this.captureContext.close();
      this.captureContext = null;
    }
    if (this.playbackContext) {
      this.playbackContext.close();
      this.playbackContext = null;
    }
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.options.onStateChange('idle');
    this.options.onAudioLevel(0);
  }
}
