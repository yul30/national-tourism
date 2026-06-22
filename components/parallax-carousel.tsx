"use client";
import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["900"],
});

const photos = [
  { cls: "slide-1", src: "/photos/1.jpg" },
  { cls: "slide-2", src: "/photos/2.jpg" },
  { cls: "slide-3", src: "/photos/3.jpg" },
  { cls: "slide-4", src: "/photos/4.jpg" },
];

export default function ParallaxCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      ref.current.style.transform = `translateY(${scrolled * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-[40%] relative bg-gray-100 overflow-hidden">
      <style>{`
        @keyframes carousel {
          0%   { opacity: 0; }
          8%   { opacity: 1; }
          28%  { opacity: 1; }
          36%  { opacity: 0; }
          100% { opacity: 0; }
        }
        .slide-1 { animation: carousel 20s ease-in-out infinite 0s; }
        .slide-2 { animation: carousel 20s ease-in-out infinite 5s; }
        .slide-3 { animation: carousel 20s ease-in-out infinite 10s; }
        .slide-4 { animation: carousel 20s ease-in-out infinite 15s; }
      `}</style>

      <div ref={ref} className="absolute inset-0 scale-110">
        {photos.map(({ cls, src }) => (
          <div key={src} className={`${cls} absolute inset-0 opacity-0`}>
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-end z-10 pb-12 px-8">
        <h2 className={`${playfair.className} text-5xl font-black text-white text-center leading-[1.1] drop-shadow-lg`}>
          ВЛЮБИТЬСЯ<br />В БЕЛАРУСЬ
        </h2>
      </div>
    </div>
  );
}