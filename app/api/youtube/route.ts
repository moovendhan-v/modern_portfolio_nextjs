import { NextResponse } from 'next/server';
import axios, { AxiosRequestConfig } from 'axios';

async function fetchWithRetry(url: string, options: AxiosRequestConfig, retries: number = 3): Promise<any> {
  try {
    const res = await axios(url, options);
    return res;
  } catch (error) {
    if (retries > 0) {
      const delay = 1000 * Math.pow(2, 3 - retries); // 1s, 2s, 4s
      console.warn(`Retrying after ${delay}ms... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1);
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
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/search`;
    const params = new URLSearchParams({
      key: apiKey,
      channelId: channelId,
      part: 'snippet',
      order: 'date',
      maxResults: '6',
    });

    console.log('Fetching YouTube videos from:', `${apiUrl}?${params}`);

    const response = await fetchWithRetry(`${apiUrl}?${params}`, {
      timeout: 20000, // 20 second timeout
      headers: {
        'Accept': 'application/json',
      }
    });

    if (response.status === 500) {
      throw new Error('Internal Server Error');
    }

    const data = response.data;
    console.log('YouTube videos:', data.items);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch YouTube videos' },
      { status: 500 }
    );
  }
}
