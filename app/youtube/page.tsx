// app/youtube/page.tsx
import { YouTubeClient } from './youtube-client';

async function getYouTubeVideos() {
  try {
    // Use absolute URL with fallback for development
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/youtube`, {
      next: { revalidate: 3600 },
      cache: 'force-cache',
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
      },
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    console.log('YouTube API response:',res, res.status, res.statusText);
   
    if (!res.ok) {
      console.error('Failed to fetch videos:', res.status, res.statusText);
      return [];
    }
    
    const data = await res.json();
    
    // Check if data has a posts property that is an array
    if (data && Array.isArray(data.posts)) {
      return data.posts;
    } else if (Array.isArray(data)) {
      // Fallback for if the API returns an array directly
      return data;
    } else {
      console.error('API did not return expected format:', data);
      return [];
    }
    return data;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

export default async function YouTubePage() {
  const videos = await getYouTubeVideos();
  console.log('YouTube videos:', videos);
  
  return <YouTubeClient videos={videos} />;
}