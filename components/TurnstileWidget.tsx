"use client";

import { useEffect, useRef, useState, useId } from "react";
import Script from "next/script";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  action?: string;
}

export default function TurnstileWidget({ onVerify, action = "login" }: TurnstileWidgetProps) {
  const widgetIdRef = useRef<string | undefined>(undefined);
  const reactId = useId();
  const containerId = `turnstile-${reactId.replace(/:/g, "")}`;
  const [isReady, setIsReady] = useState(false);

  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hostname === "localhost") {
        setIsLocalhost(true);
        onVerify("localhost-dev-token");
        return;
      }
      if ((window as any).turnstile) {
        setIsReady(true);
      }
    }
  }, [onVerify]);

  useEffect(() => {
    if (isLocalhost || !isReady || !(window as any).turnstile) return;

    // Use Cloudflare's always-pass testing keys if no real key is provided in .env.local
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

    try {
      if (widgetIdRef.current !== undefined) {
        (window as any).turnstile.reset(widgetIdRef.current);
      } else {
        widgetIdRef.current = (window as any).turnstile.render(`#${containerId}`, {
          sitekey: siteKey,
          callback: function (token: string) {
            console.log("Turnstile verification passed!", token.substring(0, 10) + "...");
            onVerify(token);
          },
          action: action,
          theme: 'auto',
          'error-callback': function () {
            console.error("Turnstile encountered an error during verification.");
          }
        });
      }
    } catch (err) {
      console.error("Failed to render Turnstile:", err);
    }

    return () => {
      if (widgetIdRef.current !== undefined && (window as any).turnstile) {
        try {
          (window as any).turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = undefined;
        } catch (e) {}
      }
    };
  }, [isReady, onVerify, action]);

  if (isLocalhost) {
    return null;
  }

  return (
    <>
      <Script 
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" 
        strategy="afterInteractive"
        onLoad={() => setIsReady(true)}
      />
      <div id={containerId} className="absolute top-4 right-4 z-50"></div>
    </>
  );
}
