(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[next]/internal/font/google/playfair_display_8b57638.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "className": "playfair_display_8b57638-module__RWPu0a__className",
});
}}),
"[next]/internal/font/google/playfair_display_8b57638.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/playfair_display_8b57638.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Playfair Display', 'Playfair Display Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}}),
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
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/playfair_display_8b57638.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
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
    const initedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeRegion, setActiveRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [is3D, setIs3D] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
            if (!mapContainerRef.current || initedRef.current) return;
            initedRef.current = true;
            const key = ("TURBOPACK compile-time value", "G9u4EI5TDFVDqBVzdzgi");
            __turbopack_context__.r("[project]/node_modules/maplibre-gl/dist/maplibre-gl.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i).then({
                "MapWithAI3D.useEffect": (maplibre)=>{
                    const L = maplibre;
                    if (!document.getElementById("maplibre-css")) {
                        const link = document.createElement("link");
                        link.id = "maplibre-css";
                        link.rel = "stylesheet";
                        link.href = "https://cdn.jsdelivr.net/npm/maplibre-gl@3.6.2/dist/maplibre-gl.css";
                        document.head.appendChild(link);
                    }
                    const map = new L.Map({
                        container: mapContainerRef.current,
                        style: `https://api.maptiler.com/maps/satellite/style.json?key=${key}`,
                        center: [
                            27.5,
                            53.5
                        ],
                        zoom: 6.5,
                        pitch: 0,
                        bearing: 0
                    });
                    mapRef.current = map;
                    map.on("load", {
                        "MapWithAI3D.useEffect": ()=>{
                            // 3D рельеф
                            map.addSource("terrain", {
                                type: "raster-dem",
                                url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${key}`,
                                tileSize: 256
                            });
                            map.setTerrain({
                                source: "terrain",
                                exaggeration: 1.8
                            });
                            // Небо
                            map.addLayer({
                                id: "sky",
                                type: "sky",
                                paint: {
                                    "sky-type": "atmosphere",
                                    "sky-atmosphere-sun": [
                                        0.0,
                                        90.0
                                    ],
                                    "sky-atmosphere-sun-intensity": 15
                                }
                            });
                            // Загружаем точный GeoJSON из public/
                            fetch("/belarus.geojson").then({
                                "MapWithAI3D.useEffect": (r)=>r.json()
                            }["MapWithAI3D.useEffect"]).then({
                                "MapWithAI3D.useEffect": (belarus)=>{
                                    const rings = belarus.geometry.type === "Polygon" ? belarus.geometry.coordinates : belarus.geometry.coordinates.flat(1);
                                    // Маска — затемняем всё кроме Беларуси
                                    const mask = {
                                        type: "Feature",
                                        properties: {},
                                        geometry: {
                                            type: "Polygon",
                                            coordinates: [
                                                [
                                                    [
                                                        -180,
                                                        -90
                                                    ],
                                                    [
                                                        180,
                                                        -90
                                                    ],
                                                    [
                                                        180,
                                                        90
                                                    ],
                                                    [
                                                        -180,
                                                        90
                                                    ],
                                                    [
                                                        -180,
                                                        -90
                                                    ]
                                                ],
                                                ...rings
                                            ]
                                        }
                                    };
                                    map.addSource("belarus-mask", {
                                        type: "geojson",
                                        data: mask
                                    });
                                    map.addLayer({
                                        id: "belarus-mask-layer",
                                        type: "fill",
                                        source: "belarus-mask",
                                        paint: {
                                            "fill-color": "#000000",
                                            "fill-opacity": 0.75
                                        }
                                    });
                                    // Граница — 3 слоя
                                    map.addSource("belarus-border", {
                                        type: "geojson",
                                        data: belarus
                                    });
                                    map.addLayer({
                                        id: "belarus-border-glow",
                                        type: "line",
                                        source: "belarus-border",
                                        paint: {
                                            "line-color": "rgba(255,255,255,0.15)",
                                            "line-width": 12,
                                            "line-blur": 8
                                        }
                                    });
                                    map.addLayer({
                                        id: "belarus-border-mid",
                                        type: "line",
                                        source: "belarus-border",
                                        paint: {
                                            "line-color": "rgba(255,255,255,0.5)",
                                            "line-width": 4,
                                            "line-blur": 2
                                        }
                                    });
                                    map.addLayer({
                                        id: "belarus-border-sharp",
                                        type: "line",
                                        source: "belarus-border",
                                        paint: {
                                            "line-color": "rgba(255,255,255,0.95)",
                                            "line-width": 1.5
                                        }
                                    });
                                }
                            }["MapWithAI3D.useEffect"]).catch({
                                "MapWithAI3D.useEffect": (e)=>console.error("Belarus GeoJSON error:", e)
                            }["MapWithAI3D.useEffect"]);
                            // Маркеры посещённых мест
                            locations.forEach({
                                "MapWithAI3D.useEffect": (loc)=>{
                                    if (!loc.lat || !loc.lng) return;
                                    const el = document.createElement("div");
                                    el.style.cssText = `
            width:10px;height:10px;border-radius:50%;
            background:rgba(255,255,255,0.9);
            border:2px solid white;
            box-shadow:0 0 8px rgba(0,0,0,0.5);
            cursor:pointer;
          `;
                                    new L.Marker({
                                        element: el
                                    }).setLngLat([
                                        loc.lng,
                                        loc.lat
                                    ]).addTo(map);
                                }
                            }["MapWithAI3D.useEffect"]);
                            // Пины регионов
                            Object.entries(REGIONS).forEach({
                                "MapWithAI3D.useEffect": ([region, { center }])=>{
                                    const el = document.createElement("div");
                                    el.style.cssText = "display:flex;flex-direction:column;align-items:center;cursor:pointer;";
                                    el.innerHTML = `
            <div class="pin-ring" style="
              width:22px;height:22px;border-radius:50%;
              background:rgba(255,255,255,0.85);
              border:2px solid rgba(255,255,255,0.95);
              box-shadow:0 0 0 4px rgba(255,255,255,0.2),0 4px 16px rgba(0,0,0,0.5);
              transition:transform 0.2s,box-shadow 0.2s;
            "></div>
            <div style="
              margin-top:5px;
              color:rgba(255,255,255,0.95);
              font-size:11px;
              font-family:serif;
              letter-spacing:0.08em;
              text-shadow:0 1px 4px rgba(0,0,0,0.9),0 0 8px rgba(0,0,0,0.6);
              white-space:nowrap;
              pointer-events:none;
            ">${region}</div>
          `;
                                    el.addEventListener("mouseenter", {
                                        "MapWithAI3D.useEffect": ()=>{
                                            const ring = el.querySelector(".pin-ring");
                                            if (ring) ring.style.transform = "scale(1.3)";
                                        }
                                    }["MapWithAI3D.useEffect"]);
                                    el.addEventListener("mouseleave", {
                                        "MapWithAI3D.useEffect": ()=>{
                                            const ring = el.querySelector(".pin-ring");
                                            if (ring) ring.style.transform = "scale(1)";
                                        }
                                    }["MapWithAI3D.useEffect"]);
                                    el.addEventListener("click", {
                                        "MapWithAI3D.useEffect": ()=>{
                                            map.flyTo({
                                                center: [
                                                    center[1],
                                                    center[0]
                                                ],
                                                zoom: 11,
                                                pitch: 60,
                                                bearing: -20,
                                                duration: 2500
                                            });
                                            setIs3D(true);
                                            openPanel(region);
                                        }
                                    }["MapWithAI3D.useEffect"]);
                                    new L.Marker({
                                        element: el
                                    }).setLngLat([
                                        center[1],
                                        center[0]
                                    ]).addTo(map);
                                }
                            }["MapWithAI3D.useEffect"]);
                        }
                    }["MapWithAI3D.useEffect"]);
                }
            }["MapWithAI3D.useEffect"]);
            return ({
                "MapWithAI3D.useEffect": ()=>{
                    if (mapRef.current) {
                        mapRef.current.remove();
                        mapRef.current = null;
                        initedRef.current = false;
                    }
                }
            })["MapWithAI3D.useEffect"];
        }
    }["MapWithAI3D.useEffect"], []);
    const resetView = ()=>{
        if (!mapRef.current) return;
        mapRef.current.flyTo({
            center: [
                27.5,
                53.5
            ],
            zoom: 6.5,
            pitch: 0,
            bearing: 0,
            duration: 1800
        });
        setIs3D(false);
    };
    const openPanel = (region)=>{
        setActiveRegion(region);
        setMessages([]);
        setInput("");
        fetchAI(region);
    };
    const closePanel = ()=>{
        setActiveRegion(null);
        setMessages([]);
        resetView();
    };
    const fetchAI = async (region)=>{
        setLoading(true);
        try {
            const res = await fetch("/api/ai-assistant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: `Расскажи про ${region} область Беларуси. Ответь строго по шаблону:

🏆 Главная фишка: [одно предложение — что делает эту область уникальной]

📍 Топ-3 места:
- [название] — [5-7 слов почему стоит посетить]
- [название] — [5-7 слов почему стоит посетить]
- [название] — [5-7 слов почему стоит посетить]

❓ [Один вопрос про интересы туриста]`
                })
            });
            const data = await res.json();
            const content = data.response?.message ?? (typeof data.response === "string" ? data.response : "Не удалось загрузить 😔");
            setMessages([
                {
                    role: "assistant",
                    content
                }
            ]);
        } catch  {
            setMessages([
                {
                    role: "assistant",
                    content: "Не удалось загрузить 😔"
                }
            ]);
        } finally{
            setLoading(false);
        }
    };
    const sendMessage = async ()=>{
        if (!input.trim() || loading || !activeRegion) return;
        const text = input;
        setMessages((prev)=>[
                ...prev,
                {
                    role: "user",
                    content: text
                }
            ]);
        setInput("");
        setLoading(true);
        try {
            const res = await fetch("/api/ai-assistant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: `[${activeRegion} область Беларуси] ${text}`
                })
            });
            const data = await res.json();
            const content = data.response?.message ?? (typeof data.response === "string" ? data.response : "Ошибка 😔");
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content
                    }
                ]);
        } catch  {
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content: "Ошибка соединения 😔"
                    }
                ]);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full flex overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: activeRegion ? "0 0 58%" : "1",
                    transition: "flex 0.4s cubic-bezier(0.4,0,0.2,1)",
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: mapContainerRef,
                        className: "w-full h-full"
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none",
                        style: {
                            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this),
                    is3D && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: resetView,
                        className: "absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-black/60 transition",
                        children: "← Беларусь"
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            activeRegion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: "0 0 42%",
                    background: "#f5f0e8",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    animation: "panelSlide 0.4s cubic-bezier(0.4,0,0.2,1) both"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
            @keyframes panelSlide {
              from { opacity:0; transform:translateX(20px); }
              to   { opacity:1; transform:translateX(0); }
            }
          `
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 363,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-8 py-5",
                        style: {
                            background: "#2d4a2d"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].className} text-white text-sm font-semibold tracking-widest uppercase`,
                                children: [
                                    activeRegion,
                                    " область"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 371,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closePanel,
                                className: "text-white/60 hover:text-white transition",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 375,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 374,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 370,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto px-8 py-6",
                        children: [
                            loading && messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    0.75,
                                    1,
                                    0.83,
                                    0.67,
                                    1,
                                    0.8
                                ].map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-4 bg-gray-200 rounded animate-pulse",
                                        style: {
                                            width: `${w * 100}%`
                                        }
                                    }, i, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 383,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 381,
                                columnNumber: 15
                            }, this),
                            messages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `mb-4 ${msg.role === "user" ? "flex justify-end" : ""}`,
                                    children: msg.role === "assistant" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].className} text-2xl font-bold text-gray-900 mb-4`,
                                                children: activeRegion
                                            }, void 0, false, {
                                                fileName: "[project]/components/MapWithAI3D.tsx",
                                                lineNumber: 392,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-700 text-sm leading-relaxed whitespace-pre-wrap",
                                                children: msg.content
                                            }, void 0, false, {
                                                fileName: "[project]/components/MapWithAI3D.tsx",
                                                lineNumber: 395,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 391,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%]",
                                        children: msg.content
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 400,
                                        columnNumber: 19
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 389,
                                    columnNumber: 15
                                }, this)),
                            loading && messages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1.5 py-2",
                                children: [
                                    0,
                                    150,
                                    300
                                ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
                                        style: {
                                            animationDelay: `${d}ms`
                                        }
                                    }, d, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 410,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 408,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: chatEndRef
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 414,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-4 border-t border-gray-200 bg-white/50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: input,
                                    onChange: (e)=>setInput(e.target.value),
                                    onKeyDown: (e)=>e.key === "Enter" && sendMessage(),
                                    placeholder: "Спроси про регион...",
                                    disabled: loading,
                                    className: "flex-1 text-sm px-4 py-2.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-400 transition disabled:opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 419,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: sendMessage,
                                    disabled: loading || !input.trim(),
                                    className: "w-9 h-9 rounded-full flex items-center justify-center text-white transition disabled:opacity-40",
                                    style: {
                                        background: "#2d4a2d"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 434,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 428,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MapWithAI3D.tsx",
                            lineNumber: 418,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 417,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 355,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MapWithAI3D.tsx",
        lineNumber: 331,
        columnNumber: 5
    }, this);
}
_s(MapWithAI3D, "JAsjtd13Uq5hgKfFn6EJbb2oOi8=");
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
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>X)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
];
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("x", __iconNode);
;
 //# sourceMappingURL=x.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "X": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Send)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
            key: "1ffxy3"
        }
    ],
    [
        "path",
        {
            d: "m21.854 2.147-10.94 10.939",
            key: "12cjpa"
        }
    ]
];
const Send = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("send", __iconNode);
;
 //# sourceMappingURL=send.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Send": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__bc10adb2._.js.map