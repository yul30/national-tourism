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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
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
// Встроенный GeoJSON — без fetch, без ошибок
const BELARUS_GEOJSON = {
    type: "Feature",
    properties: {},
    geometry: {
        type: "Polygon",
        coordinates: [
            [
                [
                    23.68,
                    53.94
                ],
                [
                    23.93,
                    54.13
                ],
                [
                    24.36,
                    54.27
                ],
                [
                    25.00,
                    54.57
                ],
                [
                    25.63,
                    54.78
                ],
                [
                    26.18,
                    55.00
                ],
                [
                    26.64,
                    55.28
                ],
                [
                    27.10,
                    55.79
                ],
                [
                    27.56,
                    55.93
                ],
                [
                    28.15,
                    56.14
                ],
                [
                    28.70,
                    56.13
                ],
                [
                    29.37,
                    55.93
                ],
                [
                    30.00,
                    55.64
                ],
                [
                    30.97,
                    55.56
                ],
                [
                    31.77,
                    54.96
                ],
                [
                    31.76,
                    54.07
                ],
                [
                    31.37,
                    53.97
                ],
                [
                    31.12,
                    53.10
                ],
                [
                    30.56,
                    52.55
                ],
                [
                    30.20,
                    52.04
                ],
                [
                    29.25,
                    51.37
                ],
                [
                    28.65,
                    51.54
                ],
                [
                    27.74,
                    51.48
                ],
                [
                    27.14,
                    51.75
                ],
                [
                    26.38,
                    51.87
                ],
                [
                    25.32,
                    51.91
                ],
                [
                    24.37,
                    51.88
                ],
                [
                    23.60,
                    52.09
                ],
                [
                    23.20,
                    52.49
                ],
                [
                    23.48,
                    52.69
                ],
                [
                    23.63,
                    53.01
                ],
                [
                    23.68,
                    53.94
                ]
            ]
        ]
    }
};
function MapWithAI3D({ locations }) {
    _s();
    const mapContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
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
    // Resize карты при открытии/закрытии панели
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapWithAI3D.useEffect": ()=>{
            const t = setTimeout({
                "MapWithAI3D.useEffect.t": ()=>{
                    mapRef.current?.resize?.();
                }
            }["MapWithAI3D.useEffect.t"], 450);
            return ({
                "MapWithAI3D.useEffect": ()=>clearTimeout(t)
            })["MapWithAI3D.useEffect"];
        }
    }["MapWithAI3D.useEffect"], [
        activeRegion
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapWithAI3D.useEffect": ()=>{
            if (!mapContainerRef.current || initedRef.current) return;
            initedRef.current = true;
            __turbopack_context__.r("[project]/node_modules/maplibre-gl/dist/maplibre-gl.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i).then({
                "MapWithAI3D.useEffect": (maplibre)=>{
                    if (!mapContainerRef.current) return;
                    if (!document.getElementById("maplibre-css")) {
                        const link = document.createElement("link");
                        link.id = "maplibre-css";
                        link.rel = "stylesheet";
                        link.href = "https://cdn.jsdelivr.net/npm/maplibre-gl@3.6.2/dist/maplibre-gl.css";
                        document.head.appendChild(link);
                    }
                    const map = new maplibre.Map({
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
                            if (!mapRef.current) return;
                            // Граница Беларуси — из встроенного GeoJSON
                            try {
                                map.addSource("belarus-border", {
                                    type: "geojson",
                                    data: BELARUS_GEOJSON
                                });
                                // Свечение
                                map.addLayer({
                                    id: "belarus-border-glow",
                                    type: "line",
                                    source: "belarus-border",
                                    paint: {
                                        "line-color": "rgba(59,130,246,0.15)",
                                        "line-width": 12,
                                        "line-blur": 8
                                    }
                                });
                                // Средняя линия
                                map.addLayer({
                                    id: "belarus-border-mid",
                                    type: "line",
                                    source: "belarus-border",
                                    paint: {
                                        "line-color": "rgba(59,130,246,0.4)",
                                        "line-width": 3,
                                        "line-blur": 2
                                    }
                                });
                                // Чёткая линия
                                map.addLayer({
                                    id: "belarus-border-sharp",
                                    type: "line",
                                    source: "belarus-border",
                                    paint: {
                                        "line-color": "rgba(59,130,246,0.9)",
                                        "line-width": 1.5
                                    }
                                });
                            } catch (e) {
                                console.error("Border error:", e);
                            }
                            // Маркеры посещённых мест
                            locations.forEach({
                                "MapWithAI3D.useEffect": (loc)=>{
                                    if (!loc.lat || !loc.lng) return;
                                    const el = document.createElement("div");
                                    el.style.cssText = `
            width:8px;height:8px;border-radius:50%;
            background:white;border:1.5px solid #3b82f6;
            box-shadow:0 0 10px rgba(59,130,246,0.5);
          `;
                                    const marker = new maplibre.Marker({
                                        element: el
                                    }).setLngLat([
                                        loc.lng,
                                        loc.lat
                                    ]).addTo(map);
                                    markersRef.current.push(marker);
                                }
                            }["MapWithAI3D.useEffect"]);
                            // Пины регионов
                            Object.entries(REGIONS).forEach({
                                "MapWithAI3D.useEffect": ([region, { center }])=>{
                                    const el = document.createElement("div");
                                    el.style.cssText = "display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:transform 0.2s;";
                                    el.innerHTML = `
            <div style="
              width:14px;height:14px;border-radius:50%;
              background:white;border:2px solid #3b82f6;
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 2px 8px rgba(59,130,246,0.3);
              transition:transform 0.2s;
            ">
              <div style="width:4px;height:4px;background:#3b82f6;border-radius:50%;"></div>
            </div>
            <div style="
              margin-top:4px;
              color:#1a1a1a;
              font-size:10px;
              font-family:serif;
              letter-spacing:0.06em;
              text-shadow:0 1px 3px rgba(255,255,255,0.9),0 0 6px rgba(255,255,255,0.8);
              white-space:nowrap;
              pointer-events:none;
              font-weight:600;
            ">${region}</div>
          `;
                                    el.addEventListener("mouseenter", {
                                        "MapWithAI3D.useEffect": ()=>{
                                            el.style.transform = "translateY(-4px)";
                                        }
                                    }["MapWithAI3D.useEffect"]);
                                    el.addEventListener("mouseleave", {
                                        "MapWithAI3D.useEffect": ()=>{
                                            el.style.transform = "translateY(0)";
                                        }
                                    }["MapWithAI3D.useEffect"]);
                                    el.addEventListener("click", {
                                        "MapWithAI3D.useEffect": ()=>{
                                            map.flyTo({
                                                center: [
                                                    center[1],
                                                    center[0]
                                                ],
                                                zoom: 10,
                                                pitch: 45,
                                                duration: 1500
                                            });
                                            setIs3D(true);
                                            openPanel(region);
                                        }
                                    }["MapWithAI3D.useEffect"]);
                                    const marker = new maplibre.Marker({
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
                }
            }["MapWithAI3D.useEffect"]);
            return ({
                "MapWithAI3D.useEffect": ()=>{
                    markersRef.current.forEach({
                        "MapWithAI3D.useEffect": (m)=>m.remove()
                    }["MapWithAI3D.useEffect"]);
                    markersRef.current = [];
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
        setMessages([]);
    };
    const openPanel = (region)=>{
        setActiveRegion(region);
        setMessages([]);
        setInput("");
        fetchAI(region);
    };
    const fetchAI = async (region)=>{
        setLoading(true);
        setMessages([]);
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
        className: "flex w-full h-full overflow-hidden rounded-xl border border-gray-200 shadow-inner bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .maplibregl-ctrl-attrib { font-size: 9px !important; }
      `
            }, void 0, false, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 308,
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: resetView,
                        className: "absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white transition shadow-lg",
                        title: "Сбросить вид",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/components/MapWithAI3D.tsx",
                            lineNumber: 322,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            activeRegion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full md:w-[40%] h-full bg-white border-l border-gray-200 flex flex-col shadow-2xl",
                style: {
                    animation: "slideIn 0.4s cubic-bezier(0.4,0,0.2,1) both"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
            @keyframes slideIn {
              from { opacity:0; transform:translateX(20px); }
              to   { opacity:1; transform:translateX(0); }
            }
          `
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 330,
                        columnNumber: 11
                    }, this),
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
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].className} text-2xl font-black text-gray-900 leading-none`,
                                        children: [
                                            activeRegion,
                                            " область"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 339,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setActiveRegion(null);
                                    setMessages([]);
                                },
                                className: "p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-black",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 351,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-8 space-y-6",
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
                                        className: "h-4 bg-gray-100 rounded animate-pulse",
                                        style: {
                                            width: `${w * 100}%`
                                        }
                                    }, i, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 360,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 358,
                                columnNumber: 15
                            }, this),
                            messages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                                    children: msg.role === "assistant" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full border-b border-gray-100 pb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].className} text-xl font-bold text-gray-900 mb-3`,
                                                children: activeRegion
                                            }, void 0, false, {
                                                fileName: "[project]/components/MapWithAI3D.tsx",
                                                lineNumber: 369,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-700 text-sm leading-relaxed whitespace-pre-wrap",
                                                children: msg.content
                                            }, void 0, false, {
                                                fileName: "[project]/components/MapWithAI3D.tsx",
                                                lineNumber: 372,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 368,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 text-white text-sm px-4 py-3 rounded-sm max-w-[85%]",
                                        children: msg.content
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 377,
                                        columnNumber: 19
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 366,
                                    columnNumber: 15
                                }, this)),
                            loading && messages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1.5 items-center text-gray-400 text-sm italic",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce",
                                        style: {
                                            animationDelay: "0ms"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 386,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce",
                                        style: {
                                            animationDelay: "150ms"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 387,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce",
                                        style: {
                                            animationDelay: "300ms"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 388,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 385,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: chatEndRef
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 391,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 bg-white border-t border-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 items-center border-b border-black pb-2 focus-within:border-gray-400 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: input,
                                    onChange: (e)=>setInput(e.target.value),
                                    onKeyDown: (e)=>e.key === "Enter" && sendMessage(),
                                    placeholder: "ВАШ ВОПРОС...",
                                    disabled: loading,
                                    className: "flex-1 bg-transparent py-2 text-xs focus:outline-none text-gray-900 placeholder:text-gray-300 uppercase tracking-widest font-bold disabled:opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: sendMessage,
                                    disabled: loading || !input.trim(),
                                    className: "text-black hover:text-gray-500 transition disabled:opacity-30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 411,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 406,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MapWithAI3D.tsx",
                            lineNumber: 396,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 328,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MapWithAI3D.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_s(MapWithAI3D, "kcLR7oNxTjzDdyRqd8GHulrN1mo=");
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
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)": ((__turbopack_context__) => {
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
    "default": (()=>ArrowLeft)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
];
const ArrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("arrow-left", __iconNode);
;
 //# sourceMappingURL=arrow-left.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ArrowLeft": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__3eda7761._.js.map