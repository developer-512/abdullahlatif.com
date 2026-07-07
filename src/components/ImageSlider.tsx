"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  alt: string;
  autoPlayInterval?: number;
}

export default function ImageSlider({
  images,
  alt,
  autoPlayInterval = 5000,
}: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (images.length === 0) return;
      setCurrent((index + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [images.length, isHovered, autoPlayInterval]);

  if (images.length === 0) {
    return (
      <div className="text-zinc-700 font-mono text-sm">No Screenshot</div>
    );
  }

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={`${alt} — image ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goTo(current - 1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goTo(current + 1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goTo(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-5 bg-emerald-400"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
