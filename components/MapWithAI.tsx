"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Send, X } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import "leaflet/dist/leaflet.css";

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600", "700", "900"],
});

interface BubbleMessage {
  role: "user" | "assistant";
  content: string;
}

interface MapLocation {
  locationTitle: string;
  lat: number;
  lng: number;
}

interface Props {
  locations: MapLocation[];
}

const REGION_CENTERS: Record<string, [number, number]> = {
  Минская:     [53.9045, 27.5618],
  Брестская:   [52.0976, 23.7341],
  Гродненская: [53.6694, 23.8131],
  Витебская:   [55.1848, 30.2016],
  Гомельская:  [52.4412, 30.9878],
  Могилевская: [53.9168, 30.3449],
};

export default function MapWithAI({ locations }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef          = useRef<any>(null);
  const initedRef       = useRef(false);
  const chatEndRef      = useRef<HTMLDivElement>(null);

  const [bubbleRegion, setBubbleRegion]     = useState<string | null>(null);
  const [bubbleMessages, setBubbleMessages] = useState<BubbleMessage[]>([]);
  const [bubbleInput, setBubbleInput]       = useState("");
  const [bubbleLoading, setBubbleLoading]   = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bubbleMessages, bubbleLoading]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (initedRef.current) return;
    initedRef.current = true;

    import("leaflet").then((L) => {
      if ((mapContainerRef.current as any)?._leaflet_id) return;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      const map = L.map(mapContainerRef.current!).setView([53.9, 27.5], 7);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      locations.forEach((loc) => {
        if (loc.lat && loc.lng) {
          L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(loc.locationTitle);
        }
      });

      if (!document.getElementById("ai-bubble-style")) {
        const style = document.createElement("style");
        style.id = "ai-bubble-style";
        style.textContent = `
          @keyframes bubbleIn {
            0%   { opacity:0; transform:scale(.88) translateY(8px); }
            100% { opacity:1; transform:scale(1)   translateY(0);   }
          }
        `;
        document.head.appendChild(style);
      }

      Object.entries(REGION_CENTERS).forEach(([region, center]) => {
        const circle = L.circle(center, {
          radius: 80000,
          color: "#111",
          weight: 1,
          fillColor: "#111",
          fillOpacity: 0,
          opacity: 0,
        }).addTo(map);

        circle.on("mouseover", () => circle.setStyle({ fillOpacity: 0.07, opacity: 0.2 }));
        circle.on("mouseout",  () => circle.setStyle({ fillOpacity: 0,    opacity: 0   }));
        circle.on("click", (e: any) => {
          L.DomEvent.stopPropagation(e);
          map.flyTo(center, 8, { duration: 1 });
          openBubble(region);
        });
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const openBubble = (region: string) => {
    setBubbleRegion(region);
    setBubbleMessages([]);
    setBubbleInput("");
    fetchInitialAI(region);
  };

  const fetchInitialAI = async (region: string) => {
    setBubbleLoading(true);
    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Расскажи про ${region} область Беларуси. Ответь строго по шаблону:

🏆 Главная фишка: [одно предложение — что делает эту область уникальной]

📍 Топ-3 места:
- [название] — [5-7 слов почему стоит посетить]
- [название] — [5-7 слов почему стоит посетить]
- [название] — [5-7 слов почему стоит посетить]

❓ [Один вопрос про интересы туриста]`,
        }),
      });
      const data = await res.json();
      const content = data.response?.message ?? (typeof data.response === "string" ? data.response : "Не удалось загрузить 😔");
      setBubbleMessages([{ role: "assistant", content }]);
    } catch {
      setBubbleMessages([{ role: "assistant", content: "Не удалось загрузить 😔 Спроси сам!" }]);
    } finally {
      setBubbleLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!bubbleInput.trim() || bubbleLoading || !bubbleRegion) return;
    const text = bubbleInput;
    setBubbleMessages((prev) => [...prev, { role: "user", content: text }]);
    setBubbleInput("");
    setBubbleLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `[${bubbleRegion} область Беларуси] ${text}`,
        }),
      });
      const data = await res.json();
      const content = data.response?.message ?? (typeof data.response === "string" ? data.response : "Ошибка соединения 😔");
      setBubbleMessages((prev) => [...prev, { role: "assistant", content }]);
    } catch {
      setBubbleMessages((prev) => [...prev, { role: "assistant", content: "Ошибка соединения 😔" }]);
    } finally {
      setBubbleLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />

      {bubbleRegion && (
        <div
          className="absolute z-[1000] bottom-6 left-6 w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ maxHeight: 440, animation: "bubbleIn .25s ease both" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 flex-shrink-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className={`${playfair.className} text-sm font-semibold text-gray-900`}>
                {bubbleRegion} область
              </span>
            </div>
            <button
              onClick={() => setBubbleRegion(null)}
              className="text-gray-400 hover:text-gray-700 transition rounded p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: 140 }}>
            {bubbleLoading && bubbleMessages.length === 0 && (
              <div className="space-y-2 pt-1">
                <div className="h-3 bg-gray-100 rounded-full w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded-full w-full animate-pulse" />
                <div className="h-3 bg-gray-100 rounded-full w-5/6 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded-full w-2/3 animate-pulse mt-3" />
                <div className="h-3 bg-gray-100 rounded-full w-full animate-pulse" />
                <div className="h-3 bg-gray-100 rounded-full w-4/5 animate-pulse" />
              </div>
            )}

            {bubbleMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[92%] rounded-xl px-3 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-gray-900 text-white rounded-br-sm"
                    : "bg-gray-50 text-gray-800 rounded-bl-sm border border-gray-100"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {bubbleLoading && bubbleMessages.length > 0 && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-xl rounded-bl-sm px-3 py-2.5">
                  <div className="flex gap-1.5">
                    {[0, 150, 300].map((d) => (
                      <div key={d} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="px-3 py-3 border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={bubbleInput}
                onChange={(e) => setBubbleInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Спроси про регион..."
                disabled={bubbleLoading}
                className="flex-1 text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-gray-500 focus:bg-white transition disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={bubbleLoading || !bubbleInput.trim()}
                className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition disabled:opacity-40 flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}