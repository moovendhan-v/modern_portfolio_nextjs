import { YouTubeClient } from './youtube-client';

async function getYouTubeVideos() {
  try {
    const res = await fetch('http://localhost:3000/api/youtube', {
      next: { revalidate: 3600 },
      cache: 'force-cache',
    });
    
    if (!res.ok) throw new Error('Failed to fetch videos');
    return res.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default async function YouTubePage() {
  const videos = await getYouTubeVideos();
  return <YouTubeClient videos={videos} />;
}