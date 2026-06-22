"use client";

import { MapPin, Check } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Playfair_Display } from "next/font/google";
import type { ComponentType } from "react";

interface MapWithAIProps {
  locations: Array<{ locationTitle: string; lat: number; lng: number }>;
}

// Динамический импорт — Leaflet только на клиенте, без SSR
const MapWithAI = dynamic<MapWithAIProps>(() => import("@/components/MapWithAI3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
    </div>
  ),
});

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export interface Location {
  id: string;
  locationTitle: string;
  lat: number;
  lng: number;
  country?: string;
}

export interface Trip {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  locations: Location[];
}

const ALL_REGIONS = ["Брестская", "Витебская", "Гомельская", "Гродненская", "Минская", "Могилевская"];

const REGION_CENTERS: Record<string, [number, number]> = {
  Минская:     [53.9045, 27.5618],
  Брестская:   [52.0976, 23.7341],
  Гродненская: [53.6694, 23.8131],
  Витебская:   [55.1848, 30.2016],
  Гомельская:  [52.4412, 30.9878],
  Могилевская: [53.9168, 30.3449],
};

const regionKeywords: Record<string, string[]> = {
  Минская:     ["минск", "минская", "заславль", "молодечно", "борисов", "солигорск", "слуцк"],
  Брестская:   ["брест", "брестская", "пинск", "барановичи", "кобрин", "берёза", "каменец", "беловежская пуща"],
  Гродненская: ["гродно", "гродненская", "лида", "слоним", "волковыск", "новогрудок", "мир", "несвиж"],
  Витебская:   ["витебск", "витебская", "орша", "полоцк", "новополоцк", "браслав", "лепель"],
  Гомельская:  ["гомель", "гомельская", "мозырь", "речица", "светлогорск", "рогачёв", "добруш"],
  Могилевская: ["могилёв", "могилев", "могилёвская", "бобруйск", "горки", "кричев", "осиповичи"],
};

function getRegionFromTitle(title: string): string | null {
  const t = title.toLowerCase();
  for (const [region, kws] of Object.entries(regionKeywords)) {
    if (kws.some((kw) => t.includes(kw))) return region;
  }
  return null;
}

function getRegionFromCoords(lat: number, lng: number): string {
  let closest = "Другая";
  let minDist = Infinity;
  for (const [name, [rlat, rlng]] of Object.entries(REGION_CENTERS)) {
    const d = Math.hypot(lat - rlat, lng - rlng);
    if (d < minDist) { minDist = d; closest = name; }
  }
  return minDist > 2.0 ? "Другая" : closest;
}

export default function BelarusMapPage() {
  const [visitedRegions, setVisitedRegions] = useState<Set<string>>(new Set());
  const [locations, setLocations]           = useState<Location[]>([]);
  const [mapLocations, setMapLocations]     = useState<Array<{ locationTitle: string; lat: number; lng: number }>>([]);
  const [isLoading, setIsLoading]           = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res   = await fetch("/api/trips");
        const trips: Trip[] = await res.json();
        const now   = new Date();
        const past  = trips.filter((t) => new Date(t.endDate) < now);

        const locs: Location[] = [];
        const mapLocs: Array<{ locationTitle: string; lat: number; lng: number }> = [];
        const regions = new Set<string>();

        past.forEach((trip) => {
          trip.locations?.forEach((loc) => {
            locs.push(loc);
            mapLocs.push({ locationTitle: loc.locationTitle, lat: loc.lat, lng: loc.lng });
            const r = getRegionFromTitle(loc.locationTitle) ?? getRegionFromCoords(loc.lat, loc.lng);
            if (r && r !== "Другая") regions.add(r);
          });
        });

        setLocations(locs);
        setMapLocations(mapLocs);
        setVisitedRegions(regions);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Шапка */}
      <div
        className="border-b border-gray-200 py-16 px-12 relative overflow-hidden"
        style={{
          backgroundImage: "url(/globes.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/40" />
        <div className="max-w-7xl mx-auto flex items-end justify-between relative z-10">
          <div>
            <h1 className={`${playfair.className} text-6xl font-black text-gray-900 leading-[1.1]`}>
              КАРТА<br />ПУТЕШЕСТВИЙ
            </h1>
            <p className="mt-4 text-s text-gray-900 uppercase tracking-widest">
              беларусь • только завершённые поездки
            </p>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-12 py-16 flex gap-16 items-start">

        {/* Карта */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <p className={`${playfair.className} text-2xl font-semibold text-gray-900`}>
              Где вы уже побывали
            </p>
            {!isLoading && (
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Кликни на регион — спроси AI
              </p>
            )}
          </div>

          <div className="w-full" style={{ height: 600 }}>
            {isLoading ? (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
              </div>
            ) : (
              <MapWithAI locations={mapLocations} />
            )}
          </div>
        </div>

        {/* Правая панель */}
        <div className="w-72 flex-shrink-0 sticky top-8">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <p className={`${playfair.className} text-2xl font-semibold text-gray-900`}>Регионы</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : (
            <div>
              {ALL_REGIONS.map((region, i) => {
                const visited = visitedRegions.has(region);
                return (
                  <div key={i} className={`flex items-center justify-between border-b py-4 transition ${visited ? "border-gray-200" : "border-gray-100"}`}>
                    <div className="flex items-center gap-3">
                      <MapPin className={`w-4 h-4 flex-shrink-0 ${visited ? "text-gray-800" : "text-gray-300"}`} />
                      <p className={`${playfair.className} text-lg font-medium ${visited ? "text-gray-900" : "text-gray-400"}`}>
                        {region} обл.
                      </p>
                    </div>
                    {visited && <Check className="w-4 h-4 text-gray-800 flex-shrink-0" />}
                  </div>
                );
              })}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className={`${playfair.className} text-2xl font-semibold text-gray-900`}>
                  Мест: {locations.length}
                </p>
              </div>

              <p className="mt-4 text-xs text-gray-400 leading-relaxed">
                Кликни прямо на карте по любому региону — AI расскажет что там интересного
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}