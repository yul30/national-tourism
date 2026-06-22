"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
  tripId: string;
  initialSaved?: boolean;
}

export default function SaveButton({ tripId, initialSaved = false }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    // Если уже сохранено — ничего не делаем
    if (isSaved || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/trips/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId }),
      });

      if (!response.ok) throw new Error("Ошибка при сохранении");

      const data = await response.json();
      setIsSaved(data.saved ?? true);

      // Показываем тост
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);

      router.refresh();
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
    
      <button
        onClick={handleSave}
        disabled={isLoading || isSaved}
        title={isSaved ? "Уже сохранено" : "Сохранить тур"}
        className={`
          relative w-12 h-12 rounded-full flex items-center justify-center
          backdrop-blur-md border transition-all duration-300
          ${isSaved
            ? "bg-red-500/90 border-red-400 cursor-default shadow-lg shadow-red-500/30"
            : "bg-white/20 border-white/30 hover:bg-white/30 hover:scale-110 cursor-pointer"
          }
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        <Heart
          className={`w-5 h-5 transition-all duration-300 ${
            isSaved
              ? "fill-white text-white scale-110"
              : "text-white"
          } ${isLoading ? "animate-pulse" : ""}`}
        />

        {/* Ripple при сохранении */}
        {isSaved && (
          <span className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" style={{ animationIterationCount: 1 }} />
        )}
      </button>
    </div>
  );
}