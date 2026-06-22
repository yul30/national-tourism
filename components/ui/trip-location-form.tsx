"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, X, Check, Sparkles, MapPin, Loader2 } from "lucide-react";
import { Location as PrismaLocation } from "@/app/generated/prisma/client";
import "leaflet/dist/leaflet.css";

type NewLocation = Omit<PrismaLocation, "id" | "createdAt" | "tripId"> & {
  id?: string;
};

interface AISuggestion {
  name: string;
  address: string;
  reason: string;
}

interface TripLocationFormProps {
  onLocationsChange: (locations: NewLocation[]) => void;
  initialLocations?: NewLocation[];
}

export default function TripLocationForm({
  onLocationsChange,
  initialLocations = [],
}: TripLocationFormProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef          = useRef<any>(null);
  const initedRef       = useRef(false);
  const markersRef      = useRef<any[]>([]);
  const lineRef         = useRef<any>(null);

  const [locations, setLocations]             = useState<NewLocation[]>(initialLocations);
  const [currentLocation, setCurrentLocation] = useState({ title: "", address: "" });
  const [isAdding, setIsAdding]               = useState(false);
  const [isGeocoding, setIsGeocoding]         = useState(false);
  const [aiSuggestions, setAiSuggestions]     = useState<AISuggestion[]>([]);
  const [aiLoading, setAiLoading]             = useState(false);
  const [addingIndex, setAddingIndex]         = useState<number | null>(null);

  // ── Инициализация карты ──────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current || initedRef.current) return;
    initedRef.current = true;

    import("leaflet").then((L) => {
      if ((mapContainerRef.current as any)?._leaflet_id) return;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      if (!document.getElementById("trip-map-style")) {
        const style = document.createElement("style");
        style.id = "trip-map-style";
        style.textContent = `
          @keyframes markerPop {
            0%   { transform: scale(0) translateY(10px); opacity: 0; }
            70%  { transform: scale(1.2) translateY(-2px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          @keyframes suggestionFade {
            0%   { opacity: 0; transform: translateY(6px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .marker-route {
            animation: markerPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
          }
          .marker-suggest {
            animation: markerPop 0.4s ease both;
          }
        `;
        document.head.appendChild(style);
      }

      const map = L.map(mapContainerRef.current!).setView([53.9, 27.5], 7);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        initedRef.current = false;
      }
    };
  }, []);

  // ── Перерисовка маркеров ─────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;

    import("leaflet").then((L) => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      lineRef.current?.remove();

      if (locations.length === 0) return;

      const latlngs: [number, number][] = locations.map((l) => [l.lat, l.lng]);

      lineRef.current = L.polyline(latlngs, {
        color: "#111",
        weight: 2,
        dashArray: "6 5",
        opacity: 0.5,
      }).addTo(mapRef.current);

      locations.forEach((loc, i) => {
        setTimeout(() => {
          if (!mapRef.current) return;

          const icon = L.divIcon({
            className: "",
            html: `<div class="marker-route" style="
              width:32px;height:32px;border-radius:50%;
              background:#111;color:#fff;
              display:flex;align-items:center;justify-content:center;
              font-family:Georgia,serif;font-weight:700;font-size:13px;
              border:3px solid #fff;
              box-shadow:0 3px 12px rgba(0,0,0,0.35);
            ">${i + 1}</div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          const marker = L.marker([loc.lat, loc.lng], { icon, zIndexOffset: 1000 })
            .addTo(mapRef.current)
            .bindPopup(`<b>${loc.locationTitle}</b>`);

          markersRef.current.push(marker);
        }, i * 200);
      });

      if (locations.length === 1) {
        mapRef.current.setView([locations[0].lat, locations[0].lng], 10);
      } else {
        mapRef.current.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] });
      }
    });
  }, [locations]);

  // ── Геокодирование ───────────────────────────────────
  const addLocation = async () => {
    if (!currentLocation.title || !currentLocation.address) return;
    setIsGeocoding(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          currentLocation.address
        )}&limit=1`,
        { headers: { "User-Agent": "TravelPlannerApp/1.0" } }
      );
      const data = await res.json();

      const lat = data?.[0] ? parseFloat(data[0].lat) : 53.9045;
      const lng = data?.[0] ? parseFloat(data[0].lon) : 27.5618;

      const newLocation: NewLocation = {
        id: Date.now().toString(),
        locationTitle: currentLocation.title,
        lat,
        lng,
        order: locations.length,
      };

      const updated = [...locations, newLocation];
      setLocations(updated);
      onLocationsChange(updated);
      setCurrentLocation({ title: "", address: "" });
      setIsAdding(false);

      fetchAISuggestions(updated);
    } catch (err) {
      console.error("Geocoding error:", err);
    } finally {
      setIsGeocoding(false);
    }
  };

  // ── AI-подсказки ─────────────────────────────────────
  const fetchAISuggestions = async (currentLocs: NewLocation[]) => {
    if (currentLocs.length === 0) return;
    setAiLoading(true);
    setAiSuggestions([]);

    const lastLoc = currentLocs[currentLocs.length - 1];
    const alreadyAdded = currentLocs.map((l) => l.locationTitle).join(", ");

    try {
      const res = await fetch("/api/ai-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lastLocation: lastLoc.locationTitle,
          alreadyAdded,
        }),
      });
      const data = await res.json();
      if (Array.isArray(data.suggestions)) {
        setAiSuggestions(data.suggestions);
      }
    } catch (err) {
      console.error("AI suggestions error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  // ── Добавить место из подсказки ──────────────────────
  const addSuggestion = async (suggestion: AISuggestion, index: number) => {
    setAddingIndex(index);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          suggestion.address
        )}&limit=1`,
        { headers: { "User-Agent": "TravelPlannerApp/1.0" } }
      );
      const data = await res.json();

      const lat = data?.[0] ? parseFloat(data[0].lat) : 53.9045;
      const lng = data?.[0] ? parseFloat(data[0].lon) : 27.5618;

      const newLocation: NewLocation = {
        id: Date.now().toString(),
        locationTitle: suggestion.name,
        lat,
        lng,
        order: locations.length,
      };

      const updated = [...locations, newLocation];
      setLocations(updated);
      onLocationsChange(updated);
      setAiSuggestions((prev) => prev.filter((_, i) => i !== index));
      fetchAISuggestions(updated);
    } catch (err) {
      console.error("Add suggestion error:", err);
    } finally {
      setAddingIndex(null);
    }
  };

  const removeLocation = (id: string) => {
    const updated = locations.filter((l) => l.id !== id);
    setLocations(updated);
    onLocationsChange(updated);
    if (updated.length > 0) fetchAISuggestions(updated);
    else setAiSuggestions([]);
  };

  return (
    <div className="space-y-4">

      {/* Карта */}
      <div
        ref={mapContainerRef}
        className="w-full rounded-xl overflow-hidden border border-gray-200"
        style={{ height: 280 }}
      />

      {/* Список локаций */}
      {locations.length > 0 && (
        <div className="space-y-2">
          {locations.map((loc, i) => (
            <div
              key={loc.id}
              className="flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-100"
              style={{ animation: "suggestionFade 0.3s ease both" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{loc.locationTitle}</p>
                  <p className="text-xs text-gray-400">{loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeLocation(loc.id!)}
                className="text-gray-300 hover:text-red-500 transition ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* AI подсказки */}
      {(aiLoading || aiSuggestions.length > 0) && (
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
            <Sparkles className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              AI предлагает добавить
            </span>
          </div>

          {aiLoading ? (
            <div className="flex items-center gap-3 px-4 py-4">
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
              <span className="text-sm text-gray-400">Ищу ближайшие интересные места...</span>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {aiSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                  style={{ animation: `suggestionFade 0.3s ease ${i * 0.08}s both` }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{s.name}</p>
                      <p className="text-xs text-gray-400 truncate">{s.reason}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addSuggestion(s, i)}
                    disabled={addingIndex === i}
                    className="ml-3 flex-shrink-0 w-7 h-7 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition disabled:opacity-40"
                  >
                    {addingIndex === i
                      ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      : <Plus className="w-3.5 h-3.5" />
                    }
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Форма добавления */}
      {isAdding ? (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Название места</label>
            <input
              type="text"
              value={currentLocation.title}
              onChange={(e) => setCurrentLocation({ ...currentLocation, title: e.target.value })}
              placeholder="например: Мирский замок"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Адрес (для определения координат)
            </label>
            <input
              type="text"
              value={currentLocation.address}
              onChange={(e) => setCurrentLocation({ ...currentLocation, address: e.target.value })}
              placeholder="например: г. Мир, Гродненская область"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={addLocation}
              disabled={isGeocoding || !currentLocation.title || !currentLocation.address}
              className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              {isGeocoding ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Определение координат...</>
              ) : (
                <><Check className="w-4 h-4" /> Добавить</>
              )}
            </button>
            <button
              type="button"
              onClick={() => { setIsAdding(false); setCurrentLocation({ title: "", address: "" }); }}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-600 hover:text-gray-700 transition flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Добавить место в маршрут
        </button>
      )}
    </div>
  );
}