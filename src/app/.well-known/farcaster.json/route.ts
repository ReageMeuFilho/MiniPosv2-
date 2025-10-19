import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: process.env.NEXT_PUBLIC_FARCASTER_HEADER || '',
      payload: process.env.NEXT_PUBLIC_FARCASTER_PAYLOAD || '',
      signature: process.env.NEXT_PUBLIC_FARCASTER_SIGNATURE || '',
    },
    frame: {
      version: '1',
      name: 'Cast-POS',
      iconUrl: `${process.env.NEXT_PUBLIC_URL}/icon-192x192.png`,
      homeUrl: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
      imageUrl: `${process.env.NEXT_PUBLIC_URL}/og-image.png`,
      buttonTitle: 'Open Cast-POS',
      splashImageUrl: `${process.env.NEXT_PUBLIC_URL}/splash.png`,
      splashBackgroundColor: '#2563eb',
      webhookUrl: `${process.env.NEXT_PUBLIC_URL}/api/webhook`,
    },
    metadata: {
      name: 'Cast-POS',
      description: 'Accept crypto payments as easily as cash',
      version: '2.0.0',
      primaryCategory: 'finance',
      tags: ['payments', 'pos', 'usdc', 'base', 'treasury', 'merchant', 'commerce'],
      author: 'Wesley Rios',
      website: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
      support: {
        email: 'wesley.f.rios@gmail.com',
        url: `${process.env.NEXT_PUBLIC_URL}`,
      },
      social: {
        github: 'https://github.com/ReageMeuFilho/crypto-brokerage-miniapp',
      },
    },
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

