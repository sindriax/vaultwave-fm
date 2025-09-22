import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const streamUrl = searchParams.get('url');

  if (!streamUrl) {
    return new Response('Missing stream URL', { status: 400 });
  }

  try {
    const response = await fetch(streamUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VaultWave FM/1.0)',
        'Accept': 'audio/*,*/*',
        'Range': 'bytes=0-',
      },
    });

    if (!response.ok) {
      throw new Error(`Stream failed: ${response.status}`);
    }

    const headers = new Headers();

    const relevantHeaders = [
      'content-type',
      'content-length',
      'accept-ranges',
      'icy-name',
      'icy-genre',
      'icy-br',
      'icy-url',
    ];

    relevantHeaders.forEach(header => {
      const value = response.headers.get(header);
      if (value) {
        headers.set(header, value);
      }
    });

    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Range, Accept, User-Agent');

    headers.set('Cache-Control', 'no-cache');
    headers.set('Connection', 'keep-alive');

    return new Response(response.body, {
      status: response.status,
      headers,
    });

  } catch (error) {
    console.error('Stream proxy error:', error);
    return new Response('Stream unavailable', { status: 503 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Accept, User-Agent',
    },
  });
}