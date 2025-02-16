import { notFound } from 'next/navigation';
import { GalleryClient } from '../gallery-client';

async function getGalleryData() {
  try {
    const res = await fetch('http://localhost:3000/api/gallery', {
      next: { revalidate: 3600 },
      cache: 'force-cache',
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
      },
      // Add timeout and retry logic
      signal: AbortSignal.timeout(30000), // 5 second timeout
    });
    
    if (!res.ok) throw new Error('Failed to fetch gallery data');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    // Return empty categories if fetch fails
    return {
      photography: [],
      photoshop: [],
      personal: [],
      gaming: []
    };
  }
}

export const dynamicParams = true; // Allow dynamic routes

const categories = ['Photography', 'Photoshop', 'Personal', 'Gaming'];

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  return {
    title: `Gallery - ${params.category}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  try {
    const galleries = await getGalleryData();
    const gallery = galleries[params.category.toLowerCase()];

    if (!gallery) {
      return notFound();
    }

    return <GalleryClient gallery={gallery} />;
  } catch (error) {
    console.error('Error loading gallery:', error);
    return notFound();
  }
}
