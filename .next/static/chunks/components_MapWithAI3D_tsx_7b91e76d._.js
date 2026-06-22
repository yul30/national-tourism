(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/MapWithAI3D.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MapWithAI3D)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/maplibre-gl/dist/maplibre-gl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/genai/dist/web/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("components/MapWithAI3D.tsx")}`;
    }
};
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// Remove top-level initialization to prevent crash on load
const getAI = ()=>{
    // Check all possible locations for the API key
    const key = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GEMINI_API_KEY || ("TURBOPACK compile-time value", "AIzaSyADTjKe98zAdRjY_QFooxaET8kyaD_eE_o") || __TURBOPACK__import$2e$meta__.env?.VITE_GEMINI_API_KEY || __TURBOPACK__import$2e$meta__.env?.GEMINI_API_KEY;
    if ("TURBOPACK compile-time truthy", 1) {
        console.log("Gemini API Key detected:", key.substring(0, 6) + "..." + key.substring(key.length - 4));
    } else {
        "TURBOPACK unreachable";
    }
    if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
        return null;
    }
    try {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
            apiKey: key
        });
    } catch (e) {
        console.error("Failed to initialize GoogleGenAI:", e);
        return null;
    }
};
const REGIONS = {
    Минская: {
        center: [
            53.9045,
            27.5618
        ],
        city: "Минск"
    },
    Брестская: {
        center: [
            52.0976,
            23.7341
        ],
        city: "Брест"
    },
    Гродненская: {
        center: [
            53.6694,
            23.8131
        ],
        city: "Гродно"
    },
    Витебская: {
        center: [
            55.1848,
            30.2016
        ],
        city: "Витебск"
    },
    Гомельская: {
        center: [
            52.4412,
            30.9878
        ],
        city: "Гомель"
    },
    Могилевская: {
        center: [
            53.9168,
            30.3449
        ],
        city: "Могилёв"
    }
};
function MapWithAI3D({ locations }) {
    _s();
    const mapContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [activeRegion, setActiveRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [is3D, setIs3D] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Resize map when chat panel opens/closes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapWithAI3D.useEffect": ()=>{
            let timeoutId;
            if (mapRef.current) {
                timeoutId = setTimeout({
                    "MapWithAI3D.useEffect": ()=>{
                        if (mapRef.current && mapRef.current.getContainer()) {
                            mapRef.current.resize();
                        }
                    }
                }["MapWithAI3D.useEffect"], 500); // Match panel animation duration
            }
            return ({
                "MapWithAI3D.useEffect": ()=>{
                    if (timeoutId) clearTimeout(timeoutId);
                }
            })["MapWithAI3D.useEffect"];
        }
    }["MapWithAI3D.useEffect"], [
        activeRegion
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapWithAI3D.useEffect": ()=>{
            chatEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["MapWithAI3D.useEffect"], [
        messages,
        loading
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapWithAI3D.useEffect": ()=>{
            if (!mapContainerRef.current) return;
            let isMounted = true;
            const map = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Map({
                container: mapContainerRef.current,
                style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
                center: [
                    28.0,
                    53.7
                ],
                zoom: 5.8,
                pitch: 0,
                bearing: 0
            });
            mapRef.current = map;
            map.on("load", {
                "MapWithAI3D.useEffect": ()=>{
                    if (!isMounted || !mapRef.current) return;
                    // Add Belarus border
                    fetch("https://raw.githubusercontent.com/codeforgermany/click_that_hood/master/public/data/belarus.geojson").then({
                        "MapWithAI3D.useEffect": (r)=>r.json()
                    }["MapWithAI3D.useEffect"]).then({
                        "MapWithAI3D.useEffect": (belarus)=>{
                            if (!isMounted || !mapRef.current) return;
                            map.addSource("belarus-border", {
                                type: "geojson",
                                data: belarus
                            });
                            map.addLayer({
                                id: "belarus-border-line",
                                type: "line",
                                source: "belarus-border",
                                paint: {
                                    "line-color": "rgba(255,255,255,0.5)",
                                    "line-width": 2
                                }
                            });
                        }
                    }["MapWithAI3D.useEffect"]).catch({
                        "MapWithAI3D.useEffect": (err)=>console.error("Failed to load geojson:", err)
                    }["MapWithAI3D.useEffect"]);
                    // Visited locations markers
                    locations.forEach({
                        "MapWithAI3D.useEffect": (loc)=>{
                            if (!loc.lat || !loc.lng || !isMounted) return;
                            const el = document.createElement("div");
                            el.style.cssText = `
          width: 8px; height: 8px; border-radius: 50%;
          background: white; border: 1.5px solid #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        `;
                            const marker = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker({
                                element: el
                            }).setLngLat([
                                loc.lng,
                                loc.lat
                            ]).addTo(map);
                            markersRef.current.push(marker);
                        }
                    }["MapWithAI3D.useEffect"]);
                    // Region pins
                    Object.entries(REGIONS).forEach({
                        "MapWithAI3D.useEffect": ([region, { center }])=>{
                            if (!isMounted) return;
                            const el = document.createElement("div");
                            el.className = "region-pin";
                            el.innerHTML = `
          <div class="pin-circle">
            <div class="inner-dot"></div>
          </div>
        `;
                            el.addEventListener("click", {
                                "MapWithAI3D.useEffect": ()=>{
                                    if (!mapRef.current) return;
                                    mapRef.current.flyTo({
                                        center: [
                                            center[1],
                                            center[0]
                                        ],
                                        zoom: 10,
                                        pitch: 45,
                                        duration: 1500
                                    });
                                    setIs3D(true);
                                    setActiveRegion(region);
                                    fetchAI(region);
                                }
                            }["MapWithAI3D.useEffect"]);
                            const marker = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker({
                                element: el
                            }).setLngLat([
                                center[1],
                                center[0]
                            ]).addTo(map);
                            markersRef.current.push(marker);
                        }
                    }["MapWithAI3D.useEffect"]);
                }
            }["MapWithAI3D.useEffect"]);
            return ({
                "MapWithAI3D.useEffect": ()=>{
                    isMounted = false;
                    markersRef.current.forEach({
                        "MapWithAI3D.useEffect": (m)=>m.remove()
                    }["MapWithAI3D.useEffect"]);
                    markersRef.current = [];
                    if (mapRef.current) {
                        mapRef.current.remove();
                        mapRef.current = null;
                    }
                }
            })["MapWithAI3D.useEffect"];
        }
    }["MapWithAI3D.useEffect"], [
        locations
    ]);
    const resetView = ()=>{
        if (!mapRef.current || !mapRef.current.loaded()) return;
        mapRef.current.flyTo({
            center: [
                28.0,
                53.7
            ],
            zoom: 5.8,
            pitch: 0,
            bearing: 0,
            duration: 1500
        });
        setIs3D(false);
        setActiveRegion(null);
    };
    const fetchAI = async (region)=>{
        const ai = getAI();
        if (!ai) {
            setMessages([
                {
                    role: "assistant",
                    content: "Ключ API не настроен. Пожалуйста, убедитесь, что GEMINI_API_KEY или NEXT_PUBLIC_GEMINI_API_KEY заданы в настройках или .env файле."
                }
            ]);
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
        ❓ Вопрос для туриста: ...`
            });
            setMessages([
                {
                    role: "assistant",
                    content: response.text || "Информация временно недоступна."
                }
            ]);
        } catch (error) {
            console.error("AI Fetch Error:", error);
            setMessages([
                {
                    role: "assistant",
                    content: "Ошибка при получении данных от ИИ. Проверьте настройки API ключа."
                }
            ]);
        } finally{
            setLoading(false);
        }
    };
    const sendMessage = async ()=>{
        if (!input.trim() || loading || !activeRegion) return;
        const ai = getAI();
        if (!ai) return;
        const userMsg = input;
        setMessages((prev)=>[
                ...prev,
                {
                    role: "user",
                    content: userMsg
                }
            ]);
        setInput("");
        setLoading(true);
        try {
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `Контекст: ${activeRegion} область Беларуси. Вопрос: ${userMsg}`
            });
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content: response.text || "Ошибка."
                    }
                ]);
        } catch (error) {
            console.error("AI Send Message Error:", error);
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content: "Произошла ошибка при ответе. Попробуйте еще раз."
                    }
                ]);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex w-full h-full overflow-hidden rounded-xl border border-gray-200 shadow-inner bg-white font-sans text-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
      `
            }, void 0, false, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex-1 h-full min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: mapContainerRef,
                        className: "w-full h-full"
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: resetView,
                            className: "absolute top-6 left-6 z-10 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md border border-black/10 rounded-full hover:bg-black hover:text-white transition active:scale-95 pointer-events-auto shadow-lg group",
                            title: "Сброс",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 323,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/MapWithAI3D.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            activeRegion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full md:w-[40%] h-full bg-white border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-500 shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 border-b border-gray-100 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1",
                                        children: REGIONS[activeRegion]?.city || "Регион"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 333,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "playfair text-2xl font-black text-gray-900 leading-none",
                                        children: [
                                            activeRegion,
                                            " область"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveRegion(null),
                                className: "p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-black",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 339,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 338,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 331,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide",
                        children: [
                            messages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `max-w-[90%] ${msg.role === "user" ? "bg-gray-900 text-white p-5 rounded-sm shadow-xl" : "bg-white text-gray-900 border-b border-gray-100 pb-6 w-full"}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "markdown-content",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                                children: msg.content
                                            }, void 0, false, {
                                                fileName: "[project]/components/MapWithAI3D.tsx",
                                                lineNumber: 352,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/MapWithAI3D.tsx",
                                            lineNumber: 351,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 346,
                                        columnNumber: 17
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 345,
                                    columnNumber: 15
                                }, this)),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 items-center text-gray-400 italic text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 359,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "AI изучает регион..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 360,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 358,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: chatEndRef
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 343,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 bg-white border-t border-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 items-center border-b border-black pb-2 focus-within:border-gray-400 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: input,
                                    onChange: (e)=>setInput(e.target.value),
                                    onKeyDown: (e)=>e.key === "Enter" && sendMessage(),
                                    placeholder: "ВАШ ВОПРОС...",
                                    className: "flex-1 bg-transparent py-2 text-sm focus:outline-none text-gray-900 placeholder:text-gray-300 uppercase tracking-widest font-bold"
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 368,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: sendMessage,
                                    className: "text-black hover:text-gray-500 transition disabled:opacity-30",
                                    disabled: loading || !input.trim(),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 381,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 376,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MapWithAI3D.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 330,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MapWithAI3D.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
}
_s(MapWithAI3D, "AZviuro6jwCH9aOtM9ruxhv985s=");
_c = MapWithAI3D;
var _c;
__turbopack_context__.k.register(_c, "MapWithAI3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/MapWithAI3D.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/components/MapWithAI3D.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=components_MapWithAI3D_tsx_7b91e76d._.js.map