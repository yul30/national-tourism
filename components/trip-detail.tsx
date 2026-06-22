"use client";

import { useState, Suspense } from "react";
import { Castle, TreePine, Landmark, Compass, Mountain, History, MapPin, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Playfair_Display } from "next/font/google";
import SaveButton from "@/components/ui/save-button";
import ImageGallery from "@/components/ui/image-gallery";
import NewLocation from "@/components/new-location";

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600", "700", "900"],
});

// Карта — только на клиенте
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gray-100 flex items-center justify-center rounded-3xl">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
    </div>
  ),
});

// ─── Interfaces ───────────────────────────────────────
interface Location {
  id: string;
  locationTitle: string;
  lat: number;
  lng: number;
  order: number;
}

interface TripImage {
  id: string;
  url: string;
}

interface Trip {
  id: string;
  title: string;
  description: string | null;
  startDate: Date | string;
  endDate: Date | string;
  imageUrl: string | null;
  images?: TripImage[];
  isPublic?: boolean;
  user?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  locations?: Location[];
}

interface TripDetailClientProps {
  trip: Trip;
  isOwner?: boolean;
  initialSaved?: boolean; // передаётся с сервера
}

// ─── Component ────────────────────────────────────────
export default function TripDetailClient({
  trip,
  isOwner = false,
  initialSaved = false,
}: TripDetailClientProps) {
  const router = useRouter();

  if (!trip) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className={`${playfair.className} text-2xl text-gray-700`}>ОШИБКА ЗАГРУЗКИ</p>
      </div>
    );
  }

  const locations = Array.isArray(trip.locations) ? trip.locations : [];

  const formatDate = (date: Date | string) => {
    try {
      return new Date(date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Дата не указана";
    }
  };

  const getIcon = () => {
    const t = trip.title.toLowerCase();
    if (t.includes("замок") || t.includes("усадьб")) return Castle;
    if (t.includes("парк")  || t.includes("пущ"))    return TreePine;
    if (t.includes("истори") || t.includes("музей")) return History;
    if (t.includes("гор")   || t.includes("озер"))   return Mountain;
    if (t.includes("достопримечательность"))          return Landmark;
    return Compass;
  };

  const Icon = getIcon();

  const renderDescription = (description: string | null, images: TripImage[] = []) => {
    if (!description) return null;
    const parts = description.split(/(\[img:\d+\])/g);
    return parts.map((part, index) => {
      const match = part.match(/\[img:(\d+)\]/);
      if (match) {
        const img = images[parseInt(match[1], 10)];
        if (!img) return null;
        return (
          <div key={`img-${index}`} className="my-10 group relative">
            <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-100">
              <img
                src={img.url}
                alt={`Trip visual`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        );
      }
      if (!part.trim()) return null;
      return part.split(/\n+/).map((para, pIndex) =>
        para.trim() ? (
          <p key={`p-${index}-${pIndex}`} className="text-lg text-gray-600 leading-relaxed mb-6 text-justify">
            {para.trim()}
          </p>
        ) : null
      );
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}</style>

      {/* ── Hero ── */}
      <div className="relative h-screen overflow-hidden bg-gray-100">
        {trip.imageUrl ? (
          <>
            <Image
              src={trip.imageUrl}
              alt={trip.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <Icon className="w-40 h-40 text-white/20" />
          </div>
        )}

        {/* Кнопка НАЗАД — реальная навигация */}
        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 px-8 py-4 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold text-white/90 uppercase tracking-wider z-10 shadow-lg hover:bg-white/30 hover:text-white transition-all"
        >
          ← НАЗАД
        </button>

        {/* Кнопка сохранения — сердечко */}
        {!isOwner && (
          <div className="absolute top-8 right-8 z-10">
            <SaveButton tripId={trip.id} initialSaved={initialSaved} />
          </div>
        )}

        {/* Заголовок внизу */}
        <div className="absolute bottom-8 left-0 right-0 z-10 px-8">
          <div className="bg-white/15 backdrop-blur-2xl p-12 rounded-3xl border border-white/20 shadow-2xl mb-6">
            <h1 className={`${playfair.className} text-4xl md:text-5xl font-black text-white uppercase leading-tight mb-4 drop-shadow-lg`}>
              {trip.title || "БЕЗ НАЗВАНИЯ"}
            </h1>
            {trip.user && !isOwner && (
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-white/80" />
                  <span className="text-lg text-white/90 font-medium">
                    {trip.user.name || trip.user.email}
                  </span>
                </div>
                <span className="px-4 py-1 bg-black/40 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/10">
                  ЧУЖОЙ ТУР
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-4 flex-wrap">
            {[
              { label: "Начало",    value: formatDate(trip.startDate) },
              { label: "Окончание", value: formatDate(trip.endDate)   },
              { label: "Локаций",   value: String(locations.length)   },
            ].map((item) => (
              <div key={item.label} className="bg-white/15 backdrop-blur-xl px-8 py-4 rounded-full border border-white/20 shadow-xl">
                <p className="text-xs text-white/70 uppercase tracking-wider mb-1">{item.label}</p>
                <p className={`${playfair.className} text-lg font-bold text-white`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Описание */}
        {trip.description && (
          <div className="mb-16">
            <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100">
              <h2 className={`${playfair.className} text-3xl font-black text-gray-900 mb-8 uppercase text-center`}>
                О ТУРЕ
              </h2>
              <div className="max-w-4xl mx-auto">
                {renderDescription(trip.description, trip.images)}
              </div>
            </div>
          </div>
        )}

        {/* Галерея */}
        {trip.images && trip.images.length > 0 && (
          <div className="mb-16">
            <ImageGallery images={trip.images} title={trip.title} />
          </div>
        )}

        {/* Маршрут + Карта */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Маршрут */}
          <div>
            <h2 className={`${playfair.className} text-3xl font-black text-gray-900 mb-8 uppercase`}>
              МАРШРУТ
            </h2>
            {locations.length === 0 ? (
              <div className="bg-gray-50 p-12 rounded-3xl text-center border-2 border-dashed border-gray-200">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">Пока нет добавленных мест</p>
              </div>
            ) : (
              <div className="h-[600px] overflow-y-auto pr-4 custom-scrollbar space-y-4">
                {locations.map((loc, i) => (
                  <div key={loc.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-lg transition">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <p className={`${playfair.className} text-lg font-semibold text-gray-900`}>
                        {loc.locationTitle}
                      </p>
                      <p className="text-xs text-gray-400 font-mono mt-1">
                        {loc.lat?.toFixed(4)}, {loc.lng?.toFixed(4)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Карта */}
          <div>
            <h2 className={`${playfair.className} text-3xl font-black text-gray-900 mb-8 uppercase`}>
              КАРТА МАРШРУТА
            </h2>
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <Map locations={locations} height="600px" />
            </div>
          </div>
        </div>

        {/* Добавить место (только владелец) */}
        {isOwner && (
          <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100">
            <h2 className={`${playfair.className} text-3xl font-black text-gray-900 mb-8 uppercase text-center`}>
              ДОБАВИТЬ МЕСТО
            </h2>
            <div className="max-w-lg mx-auto">
              <NewLocation tripId={trip.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}