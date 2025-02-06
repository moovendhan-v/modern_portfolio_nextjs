import { galleries } from '../galleries-data';
import { GalleryClient } from '../gallery-client';
import NotFound from '../not-found';

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

export interface Gallery {
  title: string;
  description: string;
  images: GalleryImage[];
}

export function generateStaticParams() {
  return Object.keys(galleries).map((category) => ({
    category,
  }));
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const gallery = galleries[params.category as keyof typeof galleries];

  if (!gallery) {
    NotFound();
  }

  return <GalleryClient gallery={gallery} />;
}
