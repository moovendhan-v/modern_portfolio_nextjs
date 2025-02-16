'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export function YouTubeClient({ videos }: { videos: Video[] }) {
  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`https://youtube.com/watch?v=${video.id}`}
            target="_blank"
            className="group"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">
                {video.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
} 