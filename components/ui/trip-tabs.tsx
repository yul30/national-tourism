"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TripTabsProps {
  activeTab: "upcoming" | "past" | "all";
}

export default function TripTabs({ activeTab }: TripTabsProps) {
  const router = useRouter();

  const handleTabChange = (tab: "upcoming" | "past" | "all") => {
    const params = new URLSearchParams(window.location.search);
    if (tab === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    
    const queryString = params.toString();
    router.push(`/trips${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="flex gap-2 border-b border-gray-200 pb-4">
      <button
        onClick={() => handleTabChange("all")}
        className={cn(
          "px-6 py-2 text-sm font-medium transition-colors relative",
          activeTab === "all"
            ? "text-gray-900 after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-gray-900"
            : "text-gray-400 hover:text-gray-600"
        )}
      >
        Все
      </button>
      <button
        onClick={() => handleTabChange("upcoming")}
        className={cn(
          "px-6 py-2 text-sm font-medium transition-colors relative",
          activeTab === "upcoming"
            ? "text-gray-900 after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-gray-900"
            : "text-gray-400 hover:text-gray-600"
        )}
      >
        Предстоящие
      </button>
      <button
        onClick={() => handleTabChange("past")}
        className={cn(
          "px-6 py-2 text-sm font-medium transition-colors relative",
          activeTab === "past"
            ? "text-gray-900 after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-gray-900"
            : "text-gray-400 hover:text-gray-600"
        )}
      >
        Прошедшие
      </button>
    </div>
  );
}