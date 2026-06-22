import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import ScrollProgress from "@/components/scroll-progress";
import MarqueeLine from "@/components/marquee-line";
import FadeIn from "@/components/fade-in";
import ParallaxCarousel from "@/components/parallax-carousel";
import AIAssistant from "@/components/AIAssistant";

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default async function HomePage() {
  const session = await auth();

  let tripsCount = 0;
  if (session?.user?.id) {
    const trips = await prisma.trip.findMany({
      where: { userId: session.user.id },
    });
    tripsCount = trips.length;
  }

  return (
    <div className="min-h-screen bg-white">

      <ScrollProgress />

      {/* Первый экран - две колонки */}
      <div className="flex h-[calc(100vh-65px)]">

        {/* Левая колонка */}
        <div className="w-[60%] flex items-center">
          <div className="w-full pl-12 pr-8 py-16">
            <FadeIn delay={0}>
              <h1 className={`${playfair.className} text-6xl font-black mb-16 leading-[1.1] text-gray-900`}>
                НАШ КЛУБ<br />
                ДЛЯ ТЕХ, КТО<br />
                ХОЧЕТ...
              </h1>
            </FadeIn>

            <div className="space-y-10 w-full">
              <FadeIn delay={100}>
                <Link
                  href="/trips"
                  className="group flex items-center justify-between border-b border-gray-200 pb-5 hover:border-gray-400 transition w-full"
                >
                  <div>
                    <p className={`${playfair.className} text-3xl font-medium text-gray-900 mb-1`}>
                      Ваши поездки
                    </p>
                    <p className="text-gray-400 text-xs tracking-widest uppercase">
                      ваши путешествия
                    </p>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <span className={`${playfair.className} text-5xl font-black text-gray-300`}>
                      {tripsCount}
                    </span>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:translate-x-2 group-hover:text-gray-600 transition" />
                  </div>
                </Link>
              </FadeIn>

              <FadeIn delay={200}>
                <Link
                  href="/community-trips"
                  className="group flex items-center justify-between border-b border-gray-200 pb-5 hover:border-gray-400 transition w-full"
                >
                  <div>
                    <p className={`${playfair.className} text-3xl font-medium text-gray-900 mb-1`}>
                      Поездки других
                    </p>
                    <p className="text-gray-400 text-xs tracking-widest uppercase">
                      путешествия сообщества
                    </p>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:translate-x-2 group-hover:text-gray-600 transition" />
                  </div>
                </Link>
              </FadeIn>

              <FadeIn delay={300}>
                <Link
                  href="/community-trips"
                  className="group flex items-center justify-between border-b border-gray-200 pb-5 hover:border-gray-400 transition w-full"
                >
                  <div>
                    <p className={`${playfair.className} text-3xl font-medium text-gray-900 mb-1`}>
                      Популярные маршруты
                    </p>
                    <p className="text-gray-400 text-xs tracking-widest uppercase">
                      лучшие туры сообщества
                    </p>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:translate-x-2 group-hover:text-gray-600 transition" />
                  </div>
                </Link>
              </FadeIn>
            </div>


            <div className="mt-16 text-xs text-gray-400 uppercase tracking-wider">
              <p>туристический клуб • Беларусь • 2026</p>
            </div>
          </div>
        </div>

        {/* Правая колонка с параллаксом */}
        <ParallaxCarousel />

      </div>

      {/* Бегущая строка */}
      <MarqueeLine />

      {/* Второй экран - преимущества */}
      <div className="min-h-screen bg-white py-32 relative overflow-hidden">
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
          @keyframes pulse-ring {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50%       { opacity: 0.7; transform: scale(1.03); }
          }
          .circle-1 { animation: spin-slow 25s linear infinite; }
          .circle-2 { animation: spin-reverse 18s linear infinite; }
          .circle-3 { animation: pulse-ring 4s ease-in-out infinite; }
        `}</style>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="circle-1 absolute w-[700px] h-[700px] rounded-full border-[2px] border-dashed border-gray-300 opacity-50"></div>
          <div className="circle-2 absolute w-[550px] h-[550px] rounded-full border-[2px] border-dotted border-gray-400 opacity-50"></div>
          <div className="circle-3 absolute w-[400px] h-[400px] rounded-full border-[2px] border-gray-500 opacity-40"></div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="relative flex items-center justify-center min-h-[600px]">
            <FadeIn>
              <h2 className={`${playfair.className} text-5xl font-bold text-center text-gray-900 z-20`}>
                ПОЧЕМУ МЫ?
              </h2>
            </FadeIn>

            <FadeIn delay={100} className="absolute left-8 top-8">
              <div className="w-96 bg-white/95 backdrop-blur-sm rounded-2xl p-6 flex items-start gap-4 shadow-lg hover:shadow-xl transition border border-gray-100">
                <span className="text-7xl font-black text-gray-300 leading-none">01</span>
                <div>
                  <h3 className={`${playfair.className} text-xl font-bold text-gray-900 mb-2`}>
                    Индивидуальные туры
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Составляем маршруты специально под ваши желания, бюджет и интересы.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200} className="absolute right-8 top-8">
              <div className="w-96 bg-white/95 backdrop-blur-sm rounded-2xl p-6 flex items-start gap-4 shadow-lg hover:shadow-xl transition border border-gray-100">
                <span className="text-7xl font-black text-gray-300 leading-none">02</span>
                <div>
                  <h3 className={`${playfair.className} text-xl font-bold text-gray-900 mb-2`}>
                    Опытные гиды
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Профессионалы со стажем 10+ лет, знающие все тайные места Беларуси.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300} className="absolute left-8 bottom-8">
              <div className="w-96 bg-white/95 backdrop-blur-sm rounded-2xl p-6 flex items-start gap-4 shadow-lg hover:shadow-xl transition border border-gray-100">
                <span className="text-7xl font-black text-gray-300 leading-none">03</span>
                <div>
                  <h3 className={`${playfair.className} text-xl font-bold text-gray-900 mb-2`}>
                    Все локации РБ
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Замки, усадьбы, национальные парки и секретные места.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={400} className="absolute right-8 bottom-8">
              <div className="w-96 bg-white/95 backdrop-blur-sm rounded-2xl p-6 flex items-start gap-4 shadow-lg hover:shadow-xl transition border border-gray-100">
                <span className="text-7xl font-black text-gray-300 leading-none">04</span>
                <div>
                  <h3 className={`${playfair.className} text-xl font-bold text-gray-900 mb-2`}>
                    Комфорт и сервис
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Уютный транспорт, вкусные обеды и забота 24/7.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
<AIAssistant trips={[]} />
    </div>
  );
}