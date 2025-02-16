// app/youtube/youtube-client.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

interface YouTubeClientProps {
  videos: Video[];
}

export function YouTubeClient({ videos }: YouTubeClientProps) {
  if (!videos || videos.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">YouTube Videos</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            No videos found. Check back soon for new content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">YouTube Videos</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Check out our latest videos and tutorials
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="overflow-hidden bg-black/50 border border-gray-800 rounded-lg">
              <div className="aspect-video relative">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(parseISO(video.publishedAt), { addSuffix: true })}
                  </span>
                  <Link
                    href={`https://youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    className="text-sm text-blue-500 hover:text-blue-400"
                  >
                    Watch Video
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}