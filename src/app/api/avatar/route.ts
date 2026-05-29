import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const seed = searchParams.get('seed') || Math.random().toString(36).substring(7);
    const style = searchParams.get('style') || 'fun-emoji';
    
    // Request a PNG version from DiceBear
    const url = `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&size=256`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`DiceBear responded with ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching AI avatar:', error);
    return NextResponse.json({ error: 'Failed to fetch AI avatar' }, { status: 500 });
  }
}
