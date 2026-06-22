"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface CarouselProps {
  children: React.ReactNode;
  title?: string;
  viewAllLink?: string;
  viewAllText?: string;
}

export default function Carousel({ children, title, viewAllLink, viewAllText = "Все" }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const newScrollLeft = direction === "left" 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
      
      // Проверяем видимость стрелок после прокрутки
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative group">
      {/* Заголовок и ссылка "Все" */}
      <div className="flex items-center justify-between mb-6">
        {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
        {viewAllLink && (
          <Link 
            href={viewAllLink}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition"
          >
            {viewAllText} →
          </Link>
        )}
      </div>

      {/* Контейнер с каруселью */}
      <div className="relative">
        {/* Левая стрелка */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition opacity-0 group-hover:opacity-100 focus:outline-none"
            aria-label="Прокрутить влево"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Правая стрелка */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition opacity-0 group-hover:opacity-100 focus:outline-none"
            aria-label="Прокрутить вправо"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Контейнер для скролла */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}