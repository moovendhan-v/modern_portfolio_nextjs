'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Gallery } from '@/lib/types';

interface GalleryClientProps {
  gallery: Gallery[];
}

export function GalleryClient({ gallery }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(
      selectedImage === 0 ? gallery.length - 1 : selectedImage - 1
    );
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(
      selectedImage === gallery.length - 1 ? 0 : selectedImage + 1
    );
  };

  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Gallery</h1>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 p-6">
          {gallery.map((item, index) => (
            <div
              key={item.image}
              className="relative group overflow-hidden rounded-xl mb-6 break-inside-avoid"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1536px) 33vw, 25vw"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError({ ...imageError, [item.image]: true })}
                loading="lazy"
                quality={75}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 p-4 w-full">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-200 text-sm">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={selectedImage !== null}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl bg-black/90 border-white/10">
          {selectedImage !== null && (
            <div className="relative">
              <div className="aspect-[4/3] relative">
                <Image
                  src={gallery[selectedImage].image}
                  alt={gallery[selectedImage].title}
                  fill
                  className="object-contain"
                  quality={100}
                  priority
                />
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
