import { NextResponse } from 'next/server';

async function fetchWithRetry(url: string, retries: number = 3): Promise<any> {
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store', // Ensure fresh data every request
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0) {
      const delay = 1000 * Math.pow(2, 3 - retries); // Exponential backoff (1s, 2s, 4s)
      console.warn(`Retrying after ${delay}ms... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1);
    } else {
      console.error('Failed to fetch YouTube videos after multiple attempts:', error);
      throw error;
    }
  }
}

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      console.error('Missing required environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=6`;

    console.log('Fetching YouTube videos from:', apiUrl);

    const data = await fetchWithRetry(apiUrl);
    console.log('YouTube videos:', data.items);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json({ error: 'Failed to fetch YouTube videos' }, { status: 500 });
  }
}
