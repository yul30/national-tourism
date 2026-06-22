"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Minimize2, Maximize2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600", "700"],
});

interface Trip {
  id: string;
  title: string;
}

interface Message {
  id: string;
  type: "text" | "found" | "not_found";
  text: string;
  trips?: Trip[];
  sender: "user" | "ai";
  timestamp: Date;
}

const QUICK_PROMPTS = [
  "🏰 Лучшие замки",
  "🌿 Природа и озёра",
  "🚗 На выходные из Минска",
  "👨‍👩‍👧 Отдых с детьми",
  "📸 Самые красивые места",
  "🏕️ Активный отдых",
];

export default function AIAssistant({ trips = [] }: { trips?: Trip[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: "1",
    type: "text",
    text: "Привет! Я помогу найти подходящий тур по Беларуси 🇧🇾\n\nВыбери интересующую тему или напиши свой запрос.",
    sender: "ai",
    timestamp: new Date(),
  }]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus();
  }, [isOpen, isMinimized]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setShowPrompts(false);

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: "text",
      text,
      sender: "user",
      timestamp: new Date(),
    }]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const parsed = data.response;

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: parsed?.type ?? "text",
        text: parsed?.message ?? (typeof parsed === "string" ? parsed : "Ошибка ответа"),
        trips: parsed?.trips ?? [],
        sender: "ai",
        timestamp: new Date(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: "text",
        text: "Что-то пошло не так 😔 Попробуй ещё раз.",
        sender: "ai",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative bg-gray-900 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-gray-700 transition">
          <Sparkles className="w-6 h-6 group-hover:scale-110 transition" />
          <span className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full border-2 border-gray-900 animate-pulse" />
        </div>
        <div className="absolute bottom-1 right-16 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-lg">
          AI-гид по Беларуси
        </div>
      </button>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col transition-all duration-300",
      isMinimized ? "w-72 h-14" : "w-[380px] h-[580px]"
    )}>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-gray-900 text-white rounded-t-2xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className={`${playfair.className} text-sm font-semibold leading-tight`}>
              AI-гид по Беларуси
            </p>
            {!isMinimized && <p className="text-xs text-white/50">Онлайн</p>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/15 rounded-lg transition">
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/15 rounded-lg transition">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex flex-col", msg.sender === "user" ? "items-end" : "items-start")}>
                <span className="text-[10px] text-gray-400 mb-1 px-1">
                  {msg.sender === "ai" ? "AI-гид" : "Вы"}
                </span>
                <div className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                  msg.sender === "user"
                    ? "bg-gray-900 text-white rounded-br-sm"
                    : "bg-gray-50 text-gray-800 rounded-bl-sm border border-gray-100"
                )}>
                  {msg.text}

                  {/* Найденные туры */}
                  {msg.type === "found" && msg.trips && msg.trips.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.trips.map(trip => (
                        <Link
                          key={trip.id}
                          href={`/trips/${trip.id}`}
                          className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition group"
                        >
                          <span className="text-xs font-medium">{trip.title}</span>
                          <span className="text-xs opacity-60 group-hover:opacity-100">→</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Тур не найден — кнопка создать */}
                  {msg.type === "not_found" && (
                    <div className="mt-3">
                      <Link
                        href="/trips/new"
                        className="flex items-center justify-between bg-gray-900 text-white rounded-xl px-3 py-2 hover:bg-gray-700 transition"
                      >
                        <span className="text-xs font-medium">✏️ Создать свой маршрут</span>
                        <span className="text-xs opacity-60">→</span>
                      </Link>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-300 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-gray-400 mb-1 px-1">AI-гид</span>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1.5">
                    {[0, 150, 300].map((d) => (
                      <div key={d} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {showPrompts && (
            <div className="px-4 pb-2">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Быстрые вопросы</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-full px-3 py-1.5 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(inputMessage)}
                placeholder="Спроси про маршрут..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-gray-500 focus:bg-white transition disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(inputMessage)}
                disabled={isLoading || !inputMessage.trim()}
                className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition disabled:opacity-40 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}