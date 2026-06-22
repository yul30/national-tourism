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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/playfair_display_8b57638.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const REGION_CENTERS = {
    Минская: [
        53.9045,
        27.5618
    ],
    Брестская: [
        52.0976,
        23.7341
    ],
    Гродненская: [
        53.6694,
        23.8131
    ],
    Витебская: [
        55.1848,
        30.2016
    ],
    Гомельская: [
        52.4412,
        30.9878
    ],
    Могилевская: [
        53.9168,
        30.3449
    ]
};
function MapWithAI3D({ locations }) {
    _s();
    const mapContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [is3D, setIs3D] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [bubbleRegion, setBubbleRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bubbleMessages, setBubbleMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bubbleInput, setBubbleInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [bubbleLoading, setBubbleLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapWithAI3D.useEffect": ()=>{
            chatEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["MapWithAI3D.useEffect"], [
        bubbleMessages,
        bubbleLoading
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapWithAI3D.useEffect": ()=>{
            if (!mapContainerRef.current) return;
            if (initedRef.current) return;
            initedRef.current = true;
            __turbopack_context__.r("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i).then({
                "MapWithAI3D.useEffect": (L)=>{
                    if (mapContainerRef.current?._leaflet_id) return;
                    delete L.Icon.Default.prototype._getIconUrl;
                    const map = L.map(mapContainerRef.current, {
                        zoomControl: false
                    }).setView([
                        53.9,
                        27.5
                    ], 7);
                    mapRef.current = map;
                    // Спутниковые тайлы Esri — бесплатно, без API
                    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
                        attribution: "© Esri"
                    }).addTo(map);
                    // Кастомный зум
                    L.control.zoom({
                        position: "bottomright"
                    }).addTo(map);
                    // Маркеры посещённых мест
                    locations.forEach({
                        "MapWithAI3D.useEffect": (loc)=>{
                            if (loc.lat && loc.lng) {
                                const icon = L.divIcon({
                                    className: "",
                                    html: `<div style="
              width:10px;height:10px;border-radius:50%;
              background:#fff;border:2px solid rgba(255,255,255,0.8);
              box-shadow:0 0 6px rgba(0,0,0,0.5);
            "></div>`,
                                    iconSize: [
                                        10,
                                        10
                                    ],
                                    iconAnchor: [
                                        5,
                                        5
                                    ]
                                });
                                L.marker([
                                    loc.lat,
                                    loc.lng
                                ], {
                                    icon
                                }).addTo(map).bindPopup(`<b style="font-family:serif">${loc.locationTitle}</b>`);
                            }
                        }
                    }["MapWithAI3D.useEffect"]);
                    if (!document.getElementById("ai-bubble-style-3d")) {
                        const style = document.createElement("style");
                        style.id = "ai-bubble-style-3d";
                        style.textContent = `
          @keyframes bubbleIn3D {
            0%   { opacity:0; transform:scale(.88) translateY(8px); }
            100% { opacity:1; transform:scale(1)   translateY(0);   }
          }
          @keyframes regionPulse {
            0%,100% { fill-opacity:0.05; }
            50%     { fill-opacity:0.15; }
          }
        `;
                        document.head.appendChild(style);
                    }
                    // Кликабельные зоны регионов
                    Object.entries(REGION_CENTERS).forEach({
                        "MapWithAI3D.useEffect": ([region, center])=>{
                            const circle = L.circle(center, {
                                radius: 80000,
                                color: "#ffffff",
                                weight: 1,
                                fillColor: "#ffffff",
                                fillOpacity: 0,
                                opacity: 0
                            }).addTo(map);
                            // Кастомный маркер региона
                            const regionIcon = L.divIcon({
                                className: "",
                                html: `<div style="
            background:rgba(255,255,255,0.15);
            backdrop-filter:blur(4px);
            border:1px solid rgba(255,255,255,0.4);
            color:#fff;
            font-size:11px;
            font-family:serif;
            letter-spacing:0.05em;
            padding:4px 10px;
            border-radius:20px;
            white-space:nowrap;
            cursor:pointer;
            text-shadow:0 1px 3px rgba(0,0,0,0.5);
            box-shadow:0 2px 8px rgba(0,0,0,0.3);
          ">${region}</div>`,
                                iconSize: [
                                    120,
                                    28
                                ],
                                iconAnchor: [
                                    60,
                                    14
                                ]
                            });
                            const regionMarker = L.marker(center, {
                                icon: regionIcon
                            }).addTo(map);
                            circle.on("mouseover", {
                                "MapWithAI3D.useEffect": ()=>circle.setStyle({
                                        fillOpacity: 0.1,
                                        opacity: 0.3
                                    })
                            }["MapWithAI3D.useEffect"]);
                            circle.on("mouseout", {
                                "MapWithAI3D.useEffect": ()=>circle.setStyle({
                                        fillOpacity: 0,
                                        opacity: 0
                                    })
                            }["MapWithAI3D.useEffect"]);
                            const handleClick = {
                                "MapWithAI3D.useEffect.handleClick": (e)=>{
                                    L.DomEvent.stopPropagation(e);
                                    map.flyTo(center, 8, {
                                        duration: 1.2
                                    });
                                    openBubble(region);
                                }
                            }["MapWithAI3D.useEffect.handleClick"];
                            circle.on("click", handleClick);
                            regionMarker.on("click", handleClick);
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
    const openBubble = (region)=>{
        setBubbleRegion(region);
        setBubbleMessages([]);
        setBubbleInput("");
        fetchInitialAI(region);
    };
    const fetchInitialAI = async (region)=>{
        setBubbleLoading(true);
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
            setBubbleMessages([
                {
                    role: "assistant",
                    content
                }
            ]);
        } catch  {
            setBubbleMessages([
                {
                    role: "assistant",
                    content: "Не удалось загрузить 😔 Спроси сам!"
                }
            ]);
        } finally{
            setBubbleLoading(false);
        }
    };
    const sendMessage = async ()=>{
        if (!bubbleInput.trim() || bubbleLoading || !bubbleRegion) return;
        const text = bubbleInput;
        setBubbleMessages((prev)=>[
                ...prev,
                {
                    role: "user",
                    content: text
                }
            ]);
        setBubbleInput("");
        setBubbleLoading(true);
        try {
            const res = await fetch("/api/ai-assistant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: `[${bubbleRegion} область Беларуси] ${text}`
                })
            });
            const data = await res.json();
            const content = data.response?.message ?? (typeof data.response === "string" ? data.response : "Ошибка соединения 😔");
            setBubbleMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content
                    }
                ]);
        } catch  {
            setBubbleMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content: "Ошибка соединения 😔"
                    }
                ]);
        } finally{
            setBubbleLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full",
        style: {
            perspective: is3D ? "1200px" : "none"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIs3D(!is3D),
                className: "absolute top-3 right-3 z-[1000] flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-black/60 transition",
                children: is3D ? "2D" : "3D"
            }, void 0, false, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transform: is3D ? "rotateX(35deg) scale(1.35) translateY(-8%)" : "none",
                    transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
                    transformOrigin: "50% 60%"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: mapContainerRef,
                    className: "w-full h-full"
                }, void 0, false, {
                    fileName: "[project]/components/MapWithAI3D.tsx",
                    lineNumber: 250,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            is3D && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 right-0 pointer-events-none",
                style: {
                    height: "30%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)"
                }
            }, void 0, false, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 255,
                columnNumber: 9
            }, this),
            is3D && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 pointer-events-none",
                style: {
                    height: "15%",
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)"
                }
            }, void 0, false, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 266,
                columnNumber: 9
            }, this),
            bubbleRegion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-[1000] bottom-6 left-6 w-[360px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden",
                style: {
                    maxHeight: 440,
                    animation: "bubbleIn3D .25s ease both"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "w-4 h-4 text-gray-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 283,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_8b57638$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].className} text-sm font-semibold text-gray-900`,
                                        children: [
                                            bubbleRegion,
                                            " область"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 284,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setBubbleRegion(null),
                                className: "text-gray-400 hover:text-gray-700 transition p-0.5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 288,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 281,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto px-4 py-3 space-y-3",
                        style: {
                            minHeight: 140
                        },
                        children: [
                            bubbleLoading && bubbleMessages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 pt-1",
                                children: [
                                    3 / 4,
                                    1,
                                    5 / 6,
                                    2 / 3,
                                    1,
                                    4 / 5
                                ].map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `h-3 bg-gray-100 rounded-full animate-pulse`,
                                        style: {
                                            width: `${w * 100}%`
                                        }
                                    }, i, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 297,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 295,
                                columnNumber: 15
                            }, this),
                            bubbleMessages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `max-w-[92%] rounded-xl px-3 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-gray-900 text-white rounded-br-sm" : "bg-gray-50 text-gray-800 rounded-bl-sm border border-gray-100"}`,
                                        children: msg.content
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 304,
                                        columnNumber: 17
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 303,
                                    columnNumber: 15
                                }, this)),
                            bubbleLoading && bubbleMessages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-100 rounded-xl px-3 py-2.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1.5",
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
                                                lineNumber: 319,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 317,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 316,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 315,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: chatEndRef
                            }, void 0, false, {
                                fileName: "[project]/components/MapWithAI3D.tsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 293,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-3 border-t border-gray-100 flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: bubbleInput,
                                    onChange: (e)=>setBubbleInput(e.target.value),
                                    onKeyDown: (e)=>e.key === "Enter" && sendMessage(),
                                    placeholder: "Спроси про регион...",
                                    disabled: bubbleLoading,
                                    className: "flex-1 text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-gray-500 focus:bg-white transition disabled:opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 330,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: sendMessage,
                                    disabled: bubbleLoading || !bubbleInput.trim(),
                                    className: "w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition disabled:opacity-40",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapWithAI3D.tsx",
                                        lineNumber: 344,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/MapWithAI3D.tsx",
                                    lineNumber: 339,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MapWithAI3D.tsx",
                            lineNumber: 329,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MapWithAI3D.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapWithAI3D.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MapWithAI3D.tsx",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
_s(MapWithAI3D, "RmTso0lJ7WeNJgrd3tunrs1Ujwc=");
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
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__df545dd7._.js.map