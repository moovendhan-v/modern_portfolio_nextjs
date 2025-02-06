'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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

export function GalleryClient({ gallery }: { gallery: Gallery }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(
      selectedImage === 0 ? gallery.images.length - 1 : selectedImage - 1
    );
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(
      selectedImage === gallery.images.length - 1 ? 0 : selectedImage + 1
    );
  };

  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{gallery.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {gallery.description}
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {gallery.images.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid"
              onClick={() => setSelectedImage(index)}
            >
              <div className="group relative overflow-hidden rounded-xl cursor-pointer">
                <div className="aspect-[4/5] relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-0 p-4 flex items-end opacity-0 transition-opacity group-hover:opacity-100">
                    <h3 className="text-lg font-semibold text-white">
                      {image.title}
                    </h3>
                  </div>
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
                  src={gallery.images[selectedImage].src}
                  alt={gallery.images[selectedImage].alt}
                  fill
                  className="object-contain"
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
