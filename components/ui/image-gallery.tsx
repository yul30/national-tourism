"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

interface ImageGalleryProps {
  images: { url: string; id: string }[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Миниатюры */}
      <div className="mb-8">
        <h2 className={`${playfair.className} text-3xl font-black text-gray-900 mb-6 uppercase`}>
          ФОТОГАЛЕРЕЯ
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition group"
              onClick={() => {
                setCurrentIndex(index);
                setShowLightbox(true);
              }}
            >
              <Image
                src={image.url}
                alt={`${title} - фото ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox для полноэкранного просмотра */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition bg-black/30 rounded-full p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition bg-black/30 rounded-full p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-6xl aspect-video mx-4">
            <Image
              src={images[currentIndex].url}
              alt={`${title} - фото ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute bottom-6 left-0 right-0 text-center text-white/80 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}