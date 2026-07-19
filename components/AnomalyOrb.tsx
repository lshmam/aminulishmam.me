"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AnomalyOrbProps {
  audioLevel: number;
}

export default function AnomalyOrb({ audioLevel }: AnomalyOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Keep refs to the materials to update their uniforms without full re-renders
  const outerMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const glowMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const anomalyObjectRef = useRef<THREE.Group | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    
    // Create a local camera so it scales strictly to the container
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // fully transparent background
    
    containerRef.current.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    const pointLight1 = new THREE.PointLight(0xff4e42, 1, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xc2362f, 1, 10);
    pointLight2.position.set(-2, -2, -2);
    scene.add(pointLight2);

    // ANOMALY OBJECT (The Orb)
    const anomalyObject = new THREE.Group();
    anomalyObjectRef.current = anomalyObject;
    
    const radius = 3;
    const resolution = 32;
    const distortionAmount = 1.0;

    const outerGeometry = new THREE.IcosahedronGeometry(radius, Math.max(1, Math.floor(resolution / 8)));
    
    const outerMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0xFF9FFC) },
        color2: { value: new THREE.Color(0x5227FF) },
        color3: { value: new THREE.Color(0xB497CF) },
        audioLevel: { value: 0 },
        distortion: { value: distortionAmount }
      },
      vertexShader: `
      uniform float time;
      uniform float audioLevel;
      uniform float distortion;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vNoise;
      
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        
        float slowTime = time * 0.3;
        vec3 pos = position;
        
        float noise = snoise(vec3(position.x * 0.5, position.y * 0.5, position.z * 0.5 + slowTime));
        vNoise = noise;
        pos += normal * noise * 0.2 * distortion * (1.0 + audioLevel);
        
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
      `,
      fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform float audioLevel;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vNoise;
      
      void main() {
        // Create the gradient effect using the noise from the vertex shader
        vec3 mix1 = mix(color1, color2, smoothstep(-0.5, 0.5, vNoise));
        float mixPattern = sin(vPosition.y * 1.5 + time) * 0.5 + 0.5;
        vec3 baseColor = mix(mix1, color3, mixPattern);

        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = 1.0 - max(0.0, dot(viewDirection, vNormal));
        fresnel = pow(fresnel, 2.0 + audioLevel * 2.0);
        
        float pulse = 0.8 + 0.2 * sin(time * 2.0);
        
        vec3 finalColor = baseColor * fresnel * pulse * (1.0 + audioLevel * 0.8);
        
        // Make the wireframe slightly more solid so the colors pop
        float alpha = fresnel * (0.85 - audioLevel * 0.15);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
      `,
      wireframe: true,
      transparent: true
    });
    
    outerMaterialRef.current = outerMaterial;
    
    const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
    anomalyObject.add(outerSphere);
    scene.add(anomalyObject);

    // GLOW SPHERE
    const glowGeometry = new THREE.SphereGeometry(radius * 1.2, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0xFF9FFC) },
        color2: { value: new THREE.Color(0x5227FF) },
        color3: { value: new THREE.Color(0xB497CF) },
        audioLevel: { value: 0 }
      },
      vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float audioLevel;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position * (1.0 + audioLevel * 0.2);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
      }
      `,
      fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform float time;
      uniform float audioLevel;
      
      void main() {
        float mixPattern1 = sin(vPosition.x * 0.8 + time) * 0.5 + 0.5;
        float mixPattern2 = cos(vPosition.y * 0.8 - time) * 0.5 + 0.5;
        vec3 mix1 = mix(color1, color2, mixPattern1);
        vec3 baseColor = mix(mix1, color3, mixPattern2);

        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = 1.0 - max(0.0, dot(viewDirection, vNormal));
        fresnel = pow(fresnel, 3.0 + audioLevel * 3.0);
        
        float pulse = 0.5 + 0.5 * sin(time * 2.0);
        float audioFactor = 1.0 + audioLevel * 3.0;
        
        vec3 finalColor = baseColor * fresnel * (0.8 + 0.2 * pulse) * audioFactor;
        
        // Boost glow alpha to show off the gradient
        float alpha = fresnel * (0.6 * audioFactor) * (1.0 - audioLevel * 0.2);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    glowMaterialRef.current = glowMaterial;
    
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    anomalyObject.add(glowSphere);

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      
      if (outerMaterialRef.current) {
        outerMaterialRef.current.uniforms.time.value = time;
      }
      
      if (glowMaterialRef.current) {
        glowMaterialRef.current.uniforms.time.value = time;
      }
      
      if (anomalyObjectRef.current) {
        // Subtle constant rotation like the original
        // Plus a dynamic rotation based on audioLevel
        const audioRotationFactor = 1 + (outerMaterialRef.current?.uniforms.audioLevel.value || 0) * 1.0;
        anomalyObjectRef.current.rotation.y += 0.005 * audioRotationFactor;
        anomalyObjectRef.current.rotation.z += 0.002 * audioRotationFactor;
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    
    // We don't use window resize because the container might be smaller.
    // Use ResizeObserver for perfect scaling.
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      renderer.dispose();
      outerGeometry.dispose();
      outerMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
    };
  }, []);

  // Sync React prop to Three.js shader uniforms instantly!
  useEffect(() => {
    if (outerMaterialRef.current) {
      outerMaterialRef.current.uniforms.audioLevel.value = audioLevel;
    }
    if (glowMaterialRef.current) {
      glowMaterialRef.current.uniforms.audioLevel.value = audioLevel;
    }
  }, [audioLevel]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ minHeight: '300px' }}
    />
  );
}
