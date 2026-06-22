import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Playfair_Display } from 'next/font/google';
import { MapPin, Plus, History, Clock, Compass, ArrowRight } from "lucide-react";
import Image from "next/image";
import TripTabs from "@/components/ui/trip-tabs";
import Carousel from "@/components/ui/carousel";

const playfair = Playfair_Display({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const formatDate = (date: Date | string) => {
  try {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch { return "Дата не указана"; }
};

const getDuration = (startDate: Date, endDate: Date) => {
  const diffTime = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

export default async function TripsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/signin");

  const { tab } = await searchParams;
  const activeTab = tab === "past" ? "past" : tab === "upcoming" ? "upcoming" : "all";
  const currentDate = new Date();

  const myTrips = await prisma.trip.findMany({
    where: {
      userId: session.user.id,
      ...(activeTab === "past"     && { endDate:  { lt: currentDate } }),
      ...(activeTab === "upcoming" && { startDate: { gt: currentDate } }),
    },
    include: { locations: true },
    orderBy: { startDate: activeTab === "past" ? "desc" : "asc" },
  });

  const savedTripsData = await prisma.savedTrip.findMany({
    where: { userId: session.user.id },
    include: {
      trip: {
        include: {
          user: { select: { name: true, email: true } },
          locations: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const filteredSavedTrips = savedTripsData
    .map(st => st.trip)
    .filter(trip => {
      if (activeTab === "past")     return new Date(trip.endDate)   < currentDate;
      if (activeTab === "upcoming") return new Date(trip.startDate) > currentDate;
      return true;
    });

  return (
    <div className="min-h-screen bg-white">

     {/* Шапка */}
{/* Шапка */}
<div style={{
  position: 'relative',
  overflow: 'hidden',
  padding: '5rem 0',
}}>
  {/* Видео */}
  <video
    autoPlay
    muted
    loop
    playsInline
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  >
    <source src="/les.mp4" type="video/mp4" />
  </video>

  {/* Затемнение */}
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'rgba(15, 23, 35, 0.52)',
  }} />

  {/* Текст */}
  <div style={{
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    position: 'relative',
    zIndex: 1,
  }}>
    <h1 className={playfair.className} style={{
      fontSize: 'clamp(2rem, 5vw, 4rem)',
      fontWeight: 900,
      color: '#f0f4f8',
      marginBottom: '1.5rem',
      textTransform: 'uppercase',
      lineHeight: 1.1,
      textShadow: '0 2px 12px rgba(0,0,0,0.4)',
    }}>
      МОИ<br />ПУТЕШЕСТВИЯ
    </h1>
    <p style={{
      fontSize: '1.125rem',
      color: 'rgba(230, 238, 248, 0.9)',
      maxWidth: '600px',
      lineHeight: 1.6,
    }}>
      Ваши маршруты, сохранённые туры и воспоминания о путешествиях по Беларуси.
    </p>
  </div>
</div>

      {/* Вкладки */}
      <div className="max-w-7xl mx-auto px-12 pt-8">
        <TripTabs activeTab={activeTab} />
      </div>

      {/* Контент */}
      <div className="max-w-7xl mx-auto px-12 pt-10 pb-16 space-y-20">

        {/* Мои маршруты */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <p className={`${playfair.className} text-2xl font-semibold text-gray-900`}>
              {activeTab === "all"      && "Мои маршруты"}
              {activeTab === "upcoming" && "Предстоящие"}
              {activeTab === "past"     && "Прошедшие"}
            </p>
            <Link
              href="/trips/new"
              className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition uppercase tracking-widest"
            >
              <Plus className="w-4 h-4" />
              Создать
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          {myTrips.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-200">
              {activeTab === "past"     && <History className="w-10 h-10 text-gray-200 mb-6" />}
              {activeTab === "upcoming" && <Clock   className="w-10 h-10 text-gray-200 mb-6" />}
              {activeTab === "all"      && <Compass className="w-10 h-10 text-gray-200 mb-6" />}
              <p className={`${playfair.className} text-2xl font-semibold text-gray-400 mb-2`}>
                {activeTab === "past"     && "Нет прошедших путешествий"}
                {activeTab === "upcoming" && "Нет предстоящих путешествий"}
                {activeTab === "all"      && "Нет маршрутов"}
              </p>
              <p className="text-sm text-gray-300 mb-8 uppercase tracking-wider">Самое время начать</p>
              <Link
                href="/trips/new"
                className="group flex items-center gap-2 border-b border-gray-300 pb-1 text-sm text-gray-600 hover:text-gray-900 hover:border-gray-900 transition uppercase tracking-widest"
              >
                Создать первый тур
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          ) : (
            <Carousel>
              {myTrips.map(trip => {
                const duration = getDuration(trip.startDate, trip.endDate);
                const isPast = new Date(trip.endDate) < new Date();
                return (
                  <Link
                    key={trip.id}
                    href={`/trips/${trip.id}`}
                    className="group flex-none w-72 flex flex-col bg-white border border-gray-100 hover:border-gray-300 hover:shadow-lg rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                  >
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      {trip.imageUrl ? (
                        <Image
                          src={trip.imageUrl}
                          alt={trip.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                      {isPast && (
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest">
                          Завершено
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 uppercase tracking-widest mb-2 px-4 pt-4">
                      <span>{duration} дн.</span>
                      <span>•</span>
                      <span>{trip.locations?.length || 0} мест</span>
                    </div>
                    <p className={`${playfair.className} text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-gray-500 transition px-4`}>
                      {trip.title}
                    </p>
                    <p className="text-xs text-gray-300 mt-auto px-4 pb-4 pt-2">
                      {formatDate(trip.startDate)}
                    </p>
                  </Link>
                );
              })}
            </Carousel>
          )}
        </section>

        {/* Сохранённые */}
        {filteredSavedTrips.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <p className={`${playfair.className} text-2xl font-semibold text-gray-900`}>
                Сохранённые
              </p>
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                {filteredSavedTrips.length} {filteredSavedTrips.length === 1 ? 'тур' : 'тура'}
              </span>
            </div>
            <Carousel>
              {filteredSavedTrips.map(trip => {
                const duration = getDuration(trip.startDate, trip.endDate);
                const isPast = new Date(trip.endDate) < new Date();
                return (
                  <Link
                    key={trip.id}
                    href={`/trips/${trip.id}`}
                    className="group flex-none w-72 flex flex-col bg-white border border-gray-100 hover:border-gray-300 hover:shadow-lg rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                  >
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      {trip.imageUrl ? (
                        <Image
                          src={trip.imageUrl}
                          alt={trip.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                      {isPast && (
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest">
                          Завершено
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1 px-4 pt-4">
                      {trip.user?.name || 'Путешественник'}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 uppercase tracking-widest mb-2 px-4">
                      <span>{duration} дн.</span>
                      <span>•</span>
                      <span>{trip.locations?.length || 0} мест</span>
                    </div>
                    <p className={`${playfair.className} text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-gray-500 transition px-4`}>
                      {trip.title}
                    </p>
                    <p className="text-xs text-gray-300 mt-auto px-4 pb-4 pt-2">
                      {formatDate(trip.startDate)}
                    </p>
                  </Link>
                );
              })}
            </Carousel>
          </section>
        )}
      </div>
    </div>
  );
}