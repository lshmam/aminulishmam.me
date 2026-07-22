import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    // Bypass Turnstile for localhost dev tokens
    const isDevBypass = token === 'localhost-dev-token';

    if (!isDevBypass) {
      if (!token) {
        return NextResponse.json({ error: 'Turnstile token required' }, { status: 400 });
      }

      const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        console.error("Turnstile verification failed:", verifyData);
        return NextResponse.json({ error: 'Bot detected' }, { status: 403 });
      }
    }

    // Return the Deepgram API key
    const deepgramKey = process.env.DEEPGRAM_API_KEY || process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
    
    if (!deepgramKey) {
      return NextResponse.json({ error: 'Deepgram key not configured on server' }, { status: 500 });
    }

    return NextResponse.json({ key: deepgramKey });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
