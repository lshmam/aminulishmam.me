"use client";

import React, { useState, useEffect, useRef } from 'react';
import Grainient from '@/components/Grainient';
import BlurText from '@/components/BlurText';
import Link from 'next/link';
import { Download } from 'lucide-react';

export default function LandingPage4() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(0);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  // Deepgram Transcription State
  const [finalTranscription, setFinalTranscription] = useState("");
  const [interimTranscription, setInterimTranscription] = useState("");
  const [sentenceId, setSentenceId] = useState(0);

  // Orb Animation Controls
  const [baseWarpAmplitude, setBaseWarpAmplitude] = useState(50);
  const [baseWarpSpeed, setBaseWarpSpeed] = useState(2);
  const [baseNoiseScale, setBaseNoiseScale] = useState(2);
  const [timeSpeed, setTimeSpeed] = useState(0.25);
  const [colorBalance, setColorBalance] = useState(0.0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const orbContainerRef = useRef<HTMLButtonElement>(null);
  const polygonRef = useRef<SVGPolygonElement>(null);

  const handleOrbClick = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      setFinalTranscription("");
      setInterimTranscription("");
      setSentenceId(0);
      audioChunksRef.current = [];

      // Open Deepgram WebSocket Connection
      const apiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
      console.log("Deepgram API Key loaded:", !!apiKey);
      
      if (apiKey) {
        const socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2&punctuate=true&interim_results=true', [
          'token',
          apiKey
        ]);

        socket.onopen = () => {
          console.log("Deepgram WebSocket opened");
          // If any chunks were recorded before the socket opened (like the crucial WebM header), send them now!
          if (audioChunksRef.current.length > 0) {
            audioChunksRef.current.forEach(chunk => socket.send(chunk));
          }
        };

        socket.onclose = (e) => console.log("Deepgram WebSocket closed", e.code, e.reason);
        socket.onerror = (e) => console.error("Deepgram WebSocket error", e);

        socket.onmessage = (message) => {
          const received = JSON.parse(message.data);
          const transcript = received.channel?.alternatives[0]?.transcript;
          if (transcript) {
            if (received.is_final) {
              setFinalTranscription(transcript);
              setInterimTranscription("");
            } else {
              setFinalTranscription(prev => {
                if (prev !== "") setSentenceId(id => id + 1);
                return "";
              });
              setInterimTranscription(transcript);
            }
          }
        };

        socketRef.current = socket;
      } else {
        console.error("NEXT_PUBLIC_DEEPGRAM_API_KEY is missing from .env.local!");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Setup Web Audio API for visualizer
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;

      // Setup MediaRecorder for capturing audio
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            // Only send the newest chunk, because onopen flushed the older ones
            socketRef.current.send(event.data);
          }
        }
      };

      mediaRecorder.start(250); // Emit audio chunks every 250ms for real-time streaming
      setIsRecording(true);
      updateAudioData();
    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("Microphone access denied or not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }
    if (sourceRef.current) {
      sourceRef.current.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (socketRef.current) {
      // Send close message to Deepgram
      socketRef.current.send(JSON.stringify({ type: 'CloseStream' }));
      socketRef.current.close();
      socketRef.current = null;
    }

    setIsRecording(false);
    setAudioData(0);
    if (orbContainerRef.current) orbContainerRef.current.style.clipPath = 'circle(40% at 50% 50%)';
  };

  const updateAudioData = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    
    analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
    
    // Calculate volume for the Orb Grainient
    let sum = 0;
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      sum += dataArrayRef.current[i];
    }
    const average = sum / dataArrayRef.current.length;
    const normalized = average / 255;
    
    // Smooth lerp for visual stability of the gradient
    setAudioData(prev => prev + (normalized - prev) * 0.3);

    // Apply dynamic polygon mask via SVG for fading edges
    const polygon = polygonRef.current;
    if (polygon) {
      let pointsString = "";
      const totalPoints = 64; 
      const step = (Math.PI * 2) / totalPoints;
      
      for (let i = 0; i < totalPoints; i++) {
        // Map 0 -> 32 -> 0 to mirror the FFT perfectly across 360 degrees
        const binIndex = i <= (totalPoints / 2) ? i : totalPoints - i;
        const value = dataArrayRef.current[binIndex];
        
        // Base radius 0.20 (20%), spike up to +0.15 (max 0.35)
        // We limit the max to 0.35 to give a MASSIVE safety padding from the edges!
        const radius = 0.20 + ((value / 255) * 0.15); 
        
        // Start from top (12 o'clock)
        const angle = (i * step) - (Math.PI / 2);
        
        const x = 0.5 + Math.cos(angle) * radius;
        const y = 0.5 + Math.sin(angle) * radius;
        
        pointsString += `${x.toFixed(3)},${y.toFixed(3)} `;
      }
      
      polygon.setAttribute('points', pointsString.trim());
    }

    animationFrameRef.current = requestAnimationFrame(updateAudioData);
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      if (sourceRef.current) {
        sourceRef.current.mediaStream.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Map audio to visual intensity for the gradient (adding on top of base slider values)
  const dynamicWarpAmplitude = baseWarpAmplitude + (audioData * 10);
  const dynamicWarpSpeed = baseWarpSpeed + (audioData * 10);
  const dynamicNoiseScale = baseNoiseScale + (audioData * 5);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 overflow-hidden relative py-12">

      {/* SVG Definitions for Fading Mask */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <mask id="fadeMask" maskContentUnits="objectBoundingBox">
            <polygon ref={polygonRef} fill="url(#fadeGradient)" />
          </mask>
          <radialGradient id="fadeGradient" cx="0.5" cy="0.5" r="0.35">
            {/* Solid white up to the base radius (0.20 / 0.35 = 57%) */}
            <stop offset="57%" stopColor="white" stopOpacity="1" />
            {/* Fade to transparent towards the spike tips (100%) */}
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <div className="flex-1 flex flex-col items-center justify-center relative w-full z-20 -mt-8 md:-mt-16">
        
        {/* Container for Orb and Levitation Shadow */}
        <div className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px] -mb-24 md:-mb-40">
          
          {/* Levitation Ground Shadow (Mirrored jagged mask) */}
          <div 
            className="absolute inset-0 bg-black/20 blur-md pointer-events-none z-0"
            style={{
              transform: `translateY(160px) scaleY(0.25) scaleX(${isRecording ? 1.0 + audioData * 0.5 : 0.8})`,
              maskImage: isRecording ? 'url(#fadeMask)' : 'radial-gradient(circle at center, black 0%, black 40%, transparent 40.5%)',
              WebkitMaskImage: isRecording ? 'url(#fadeMask)' : 'radial-gradient(circle at center, black 0%, black 40%, transparent 40.5%)',
              transition: isRecording ? 'none' : 'transform 0.5s ease-out, mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out'
            }}
          />

          {/* Drop shadow wrapper for the masked orb */}
          <div 
            className="absolute inset-0 transition-all duration-300 z-10"
            style={{
              filter: isRecording 
                ? `drop-shadow(0 0 40px rgba(168, 85, 247, ${0.4 + audioData}))` 
                : 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15))'
            }}
          >
            {/* The Morphing Orb / Record Button */}
            <button 
              ref={orbContainerRef}
              onClick={handleOrbClick}
              className="w-full h-full group focus:outline-none hover:opacity-90 transition-opacity"
              style={{
                transform: isRecording ? `scale(${1.0 + audioData * 0.5})` : 'scale(0.8)',
                maskImage: isRecording ? 'url(#fadeMask)' : 'radial-gradient(circle at center, black 0%, black 40%, transparent 40.5%)',
                WebkitMaskImage: isRecording ? 'url(#fadeMask)' : 'radial-gradient(circle at center, black 0%, black 40%, transparent 40.5%)',
                transition: isRecording ? 'none' : 'transform 0.5s ease-out, mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out'
              }}
            >
              <Grainient
                color1="#FF9FFC"
                color2="#5227FF"
                color3="#B497CF"
                timeSpeed={timeSpeed}
                colorBalance={colorBalance}
                warpStrength={1.0}
                warpFrequency={5.0}
                warpSpeed={dynamicWarpSpeed}
                warpAmplitude={dynamicWarpAmplitude}
                blendAngle={0.0}
                blendSoftness={0.05}
                rotationAmount={500.0}
                noiseScale={dynamicNoiseScale}
                grainAmount={0.1}
                grainScale={2.0}
                grainAnimated={false}
                contrast={1.5}
                gamma={1.0}
                saturation={1.0}
                centerX={0.0}
                centerY={0.0}
                zoom={0.9}
              />
              {/* Hover instruction overlay */}
              <div className={`absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${isRecording ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                <span className="text-white font-bold tracking-widest uppercase text-sm drop-shadow-md">Click to Record</span>
              </div>
              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-xs font-bold tracking-widest uppercase">Recording</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Transcription Display */}
        {(finalTranscription || interimTranscription || isRecording) && (
          <div className="w-full max-w-3xl px-6 min-h-[100px] flex items-center justify-center animate-in fade-in slide-in-from-bottom-8 mt-4 z-30">
            <div 
              className={`text-2xl md:text-4xl font-semibold text-center leading-snug tracking-tight flex flex-wrap justify-center gap-x-2 transition-all duration-300 ${
                finalTranscription ? 'text-gray-800' : 'text-gray-400 opacity-80'
              }`}
            >
              {(finalTranscription || interimTranscription) && (
                <BlurText
                  key={sentenceId}
                  text={finalTranscription || interimTranscription}
                  delay={50}
                  animateBy="words"
                  direction="bottom"
                  className="inline-flex flex-wrap justify-center"
                />
              )}
              {isRecording && !interimTranscription && (
                <span className="animate-pulse inline-block text-purple-400">...</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Orb Animation Controls (Hidden for now) */}
      <div className="hidden mt-4 z-20 w-full max-w-lg mx-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-8">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-6 text-center border-b border-gray-200 pb-2">Orb Controls</h3>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span>Warp Amplitude</span>
              <span>{baseWarpAmplitude}</span>
            </div>
            <input
              type="range" min="0" max="200" step="1"
              value={baseWarpAmplitude}
              onChange={(e) => setBaseWarpAmplitude(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span>Warp Speed</span>
              <span>{baseWarpSpeed}</span>
            </div>
            <input
              type="range" min="0" max="10" step="0.1"
              value={baseWarpSpeed}
              onChange={(e) => setBaseWarpSpeed(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span>Noise Scale</span>
              <span>{baseNoiseScale}</span>
            </div>
            <input
              type="range" min="0" max="10" step="0.1"
              value={baseNoiseScale}
              onChange={(e) => setBaseNoiseScale(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span>Time Speed</span>
              <span>{timeSpeed}</span>
            </div>
            <input
              type="range" min="0" max="2" step="0.05"
              value={timeSpeed}
              onChange={(e) => setTimeSpeed(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span>Color Balance</span>
              <span>{colorBalance}</span>
            </div>
            <input
              type="range" min="-1" max="1" step="0.05"
              value={colorBalance}
              onChange={(e) => setColorBalance(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Accessibility Fallback */}
      <div className="absolute bottom-8 w-full max-w-lg mx-4 flex flex-col items-center z-20">
        <button
          onClick={() => setShowTextInput(!showTextInput)}
          className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 transition-colors"
        >
          {showTextInput ? "Close text input" : "Prefer to type?"}
        </button>

        {showTextInput && (
          <div className="mt-4 w-full bg-white rounded-2xl shadow-xl p-4 border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <textarea
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-gray-900 placeholder:text-gray-400"
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  alert("Message saved!");
                  setTextMessage("");
                  setShowTextInput(false);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-sm"
              >
                Save Message
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
