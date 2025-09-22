import { GalleryClient } from './gallery-client';
import { Gallery } from '@/lib/types';

async function getGalleryData(): Promise<Record<string, Gallery[]>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/gallery`, {
      next: { revalidate: 3600 },
      cache: 'force-cache',
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
      },
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) throw new Error('Failed to fetch gallery data');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return {
      photography: [],
      photoshop: [],
      personal: [],
      gaming: []
    };
  }
}

export default async function GalleryPage() {
  const galleries = await getGalleryData();

  // Flatten all images from all categories into one array
  const allImages = Object.values(galleries).flat();

  return <GalleryClient gallery={allImages} />;
}
