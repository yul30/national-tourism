"use client";

export default function MarqueeLine() {
  const text = "БЕЛАРУСЬ • ПУТЕШЕСТВИЯ • ПРИРОДА • ЗАМКИ • ОЗЁРА • МАРШРУТЫ • СООБЩЕСТВО • ";

  return (
    <div className="w-full overflow-hidden bg-gray-900 py-4">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marquee 20s linear infinite;
          white-space: nowrap;
          display: inline-block;
        }
      `}</style>
      <div className="marquee-inner text-white text-sm tracking-[0.3em] font-medium">
        {text.repeat(6)}
      </div>
    </div>
  );
}