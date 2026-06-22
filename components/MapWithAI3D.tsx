"use client";
import { useEffect, useRef, useState } from "react";
import { X, Send, Navigation, List, Layers, Sparkles, ArrowLeft } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";

// Remove top-level initialization to prevent crash on load
const getAI = () => {
  // Check all possible locations for the API key
  const key = 
    process.env.GEMINI_API_KEY || 
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    (import.meta as any).env?.GEMINI_API_KEY;
  
  if (key) {
    console.log("Gemini API Key detected:", key.substring(0, 6) + "..." + key.substring(key.length - 4));
  } else {
    console.warn("Gemini API key is missing in all environments.");
  }

  if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
    return null;
  }
  
  try {
    return new GoogleGenAI({ apiKey: key });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI:", e);
    return null;
  }
};

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

const REGIONS: Record<string, { center: [number, number]; city: string }> = {
  Минская:     { center: [53.9045, 27.5618], city: "Минск" },
  Брестская:   { center: [52.0976, 23.7341], city: "Брест" },
  Гродненская: { center: [53.6694, 23.8131], city: "Гродно" },
  Витебская:   { center: [55.1848, 30.2016], city: "Витебск" },
  Гомельская:  { center: [52.4412, 30.9878], city: "Гомель" },
  Могилевская: { center: [53.9168, 30.3449], city: "Могилёв" },
};

export default function MapWithAI3D({ locations }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [messages, setMessages] = useState<BubbleMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [is3D, setIs3D] = useState(false);

  // Resize map when chat panel opens/closes
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (mapRef.current) {
      timeoutId = setTimeout(() => {
        if (mapRef.current && mapRef.current.getContainer()) {
          mapRef.current.resize();
        }
      }, 500); // Match panel animation duration
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeRegion]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let isMounted = true;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [28.0, 53.7],
      zoom: 5.8,
      pitch: 0,
      bearing: 0,
    });

    mapRef.current = map;

    map.on("load", () => {
      if (!isMounted || !mapRef.current) return;

      // Add Belarus border
      fetch("https://raw.githubusercontent.com/codeforgermany/click_that_hood/master/public/data/belarus.geojson")
        .then(r => r.json())
        .then(belarus => {
          if (!isMounted || !mapRef.current) return;
          
          map.addSource("belarus-border", {
            type: "geojson",
            data: belarus,
          });

          map.addLayer({
            id: "belarus-border-line",
            type: "line",
            source: "belarus-border",
            paint: {
              "line-color": "rgba(255,255,255,0.5)",
              "line-width": 2,
            },
          });
        })
        .catch(err => console.error("Failed to load geojson:", err));

      // Visited locations markers
      locations.forEach((loc) => {
        if (!loc.lat || !loc.lng || !isMounted) return;
        const el = document.createElement("div");
        el.style.cssText = `
          width: 8px; height: 8px; border-radius: 50%;
          background: white; border: 1.5px solid #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        `;
        
        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([loc.lng, loc.lat])
          .addTo(map);
        markersRef.current.push(marker);
      });

      // Region pins
      Object.entries(REGIONS).forEach(([region, { center }]) => {
        if (!isMounted) return;
        const el = document.createElement("div");
        el.className = "region-pin";
        el.innerHTML = `
          <div class="pin-circle">
            <div class="inner-dot"></div>
          </div>
        `;
        
        el.addEventListener("click", () => {
          if (!mapRef.current) return;
          mapRef.current.flyTo({
            center: [center[1], center[0]],
            zoom: 10,
            pitch: 45,
            duration: 1500
          });
          setIs3D(true);
          setActiveRegion(region);
          fetchAI(region);
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([center[1], center[0]])
          .addTo(map);
        markersRef.current.push(marker);
      });
    });

    return () => {
      isMounted = false;
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations]);

  const resetView = () => {
    if (!mapRef.current || !mapRef.current.loaded()) return;
    mapRef.current.flyTo({
      center: [28.0, 53.7],
      zoom: 5.8,
      pitch: 0,
      bearing: 0,
      duration: 1500,
    });
    setIs3D(false);
    setActiveRegion(null);
  };

  const fetchAI = async (region: string) => {
    const ai = getAI();
    if (!ai) {
      setMessages([{ role: "assistant", content: "Ключ API не настроен. Пожалуйста, убедитесь, что GEMINI_API_KEY или NEXT_PUBLIC_GEMINI_API_KEY заданы в настройках или .env файле." }]);
      return;
    }
    setLoading(true);
    setMessages([]);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Расскажи кратко про ${region} область Беларуси для туриста. 
        Упомяни 2-3 главных достопримечательности. Ответь на русском языке.
        Формат:
        🏆 Главная фишка: ...
        📍 Топ-3 места: ...
        ❓ Вопрос для туриста: ...`,
      });
      setMessages([{ role: "assistant", content: response.text || "Информация временно недоступна." }]);
    } catch (error) {
      console.error("AI Fetch Error:", error);
      setMessages([{ role: "assistant", content: "Ошибка при получении данных от ИИ. Проверьте настройки API ключа." }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || !activeRegion) return;
    const ai = getAI();
    if (!ai) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Контекст: ${activeRegion} область Беларуси. Вопрос: ${userMsg}`,
      });
      setMessages(prev => [...prev, { role: "assistant", content: response.text || "Ошибка." }]);
    } catch (error) {
      console.error("AI Send Message Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Произошла ошибка при ответе. Попробуйте еще раз." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full overflow-hidden rounded-xl border border-gray-200 shadow-inner bg-white font-sans text-gray-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        .region-pin {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .region-pin:hover {
          transform: translateY(-4px);
        }
        .pin-circle {
          width: 12px;
          height: 12px;
          background: white;
          border: 2px solid #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .inner-dot {
          width: 4px;
          height: 4px;
          background: #3b82f6;
          border-radius: 50%;
        }
        .glass-panel {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0;
          color: #1a1a1a;
        }
        .playfair {
          font-family: 'Playfair Display', serif;
        }
        .markdown-content {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #1a1a1a;
        }
        .markdown-content p {
          margin-bottom: 1rem;
        }
        .markdown-content strong {
          color: black;
          font-weight: 700;
        }
        .markdown-content ul {
          list-style-type: disc;
          padding-left: 1.25rem;
          margin-bottom: 0.75rem;
        }
      `}</style>

      <div className="relative flex-1 h-full min-w-0">
        <div ref={mapContainerRef} className="w-full h-full" />

        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left: Reset Button */}
          <button 
            onClick={resetView}
            className="absolute top-6 left-6 z-10 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md border border-black/10 rounded-full hover:bg-black hover:text-white transition active:scale-95 pointer-events-auto shadow-lg group"
            title="Сброс"
          >
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* AI Assistant Panel (Slide-in from right) */}
      {activeRegion && (
        <div className="w-full md:w-[40%] h-full bg-white border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-500 shadow-2xl">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">
                {REGIONS[activeRegion]?.city || "Регион"}
              </span>
              <h2 className="playfair text-2xl font-black text-gray-900 leading-none">{activeRegion} область</h2>
            </div>
            <button onClick={() => setActiveRegion(null)} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-black">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[90%] ${
                  msg.role === "user" 
                    ? "bg-gray-900 text-white p-5 rounded-sm shadow-xl" 
                    : "bg-white text-gray-900 border-b border-gray-100 pb-6 w-full"
                }`}>
                  <div className="markdown-content">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-center text-gray-400 italic text-sm">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" />
                <span>AI изучает регион...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex gap-4 items-center border-b border-black pb-2 focus-within:border-gray-400 transition-colors">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="ВАШ ВОПРОС..."
                className="flex-1 bg-transparent py-2 text-sm focus:outline-none text-gray-900 placeholder:text-gray-300 uppercase tracking-widest font-bold"
              />
              <button 
                onClick={sendMessage}
                className="text-black hover:text-gray-500 transition disabled:opacity-30"
                disabled={loading || !input.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
