"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Castle, TreePine, Landmark, Compass, Mountain, History, Calendar, MapPin, User, Heart, X } from "lucide-react";
import SaveButton from "./save-button";

interface TripCardClientProps {
  trip: any;
  playfair: any;
  isOwner?: boolean;
  session?: any; // Добавляем сессию
}

export default function TripCardClient({ trip, playfair, isOwner = false, session }: TripCardClientProps) {
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const formatDate = (date: Date | string) => {
    try {
      return new Date(date).toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return "Дата не указана";
    }
  };

  // Определяем иконку на основе названия
  const getIcon = () => {
    const titleLower = trip.title.toLowerCase();
    if (titleLower.includes('замок') || titleLower.includes('усадьб')) return Castle;
    if (titleLower.includes('парк') || titleLower.includes('пущ')) return TreePine;
    if (titleLower.includes('истори') || titleLower.includes('музей')) return History;
    if (titleLower.includes('гор') || titleLower.includes('озер')) return Mountain;
    if (titleLower.includes('достопримечательность')) return Landmark;
    return Compass;
  };

  const Icon = getIcon();

  // Получаем имя пользователя (если есть, иначе email или "Пользователь")
  const getUserDisplayName = () => {
    if (trip.user?.name) return trip.user.name;
    if (trip.user?.email) return trip.user.email.split('@')[0];
    return 'Путешественник';
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session) {
      setShowAuthModal(true);
    }
    // Если есть сессия, SaveButton сам обработает сохранение
  };

  return (
    <>
      {/* Модальное окно для неавторизованных */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scale-in relative">
            {/* Кнопка закрытия */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Иконка */}
            <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-indigo-600" />
            </div>

            {/* Заголовок */}
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
              Хотите сохранить этот тур?
            </h2>

            {/* Описание */}
            <p className="text-center text-gray-600 mb-8">
              Чтобы сохранять понравившиеся маршруты и создавать свои, 
              пожалуйста, войдите в аккаунт или зарегистрируйтесь.
            </p>

            {/* Кнопки */}
            <div className="space-y-3">
              <Link
                href="/auth/signin"
                className="block w-full bg-gray-900 text-white text-center py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition"
                onClick={() => setShowAuthModal(false)}
              >
                Войти
              </Link>
              <button
                onClick={() => setShowAuthModal(false)}
                className="block w-full bg-gray-100 text-gray-700 text-center py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Закрыть
              </button>
            </div>

            {/* Дополнительный текст */}
            <p className="text-xs text-center text-gray-400 mt-6">
              Это займет всего минуту
            </p>
          </div>
        </div>
      )}

      <div className="relative">
        <Link href={`/trips/${trip.id}`} style={{ textDecoration: 'none' }}>
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 cursor-pointer hover:-translate-y-1">
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative">
              {trip.imageUrl ? (
                <img 
                  src={trip.imageUrl} 
                  alt={trip.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.svg";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                  <Icon className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-2">
                <MapPin className="w-3 h-3" />
                <span>{trip.locations?.length || 0} мест</span>
                <User className="w-3 h-3 ml-2" />
                <span>{getUserDisplayName()}</span>
              </div>
              
              <h3 className={`${playfair.className} text-xl font-bold text-gray-900 mb-2 line-clamp-1`}>
                {trip.title}
              </h3>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {trip.description || 'Нет описания'}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
                </span>
              </div>

              <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold text-gray-800 uppercase tracking-wider transition">
                ПОДРОБНЕЕ
              </button>
            </div>
          </div>
        </Link>
        
        {/* Кнопка сохранения для не-владельцев */}
        {!isOwner && (
          <div 
            className="absolute top-3 right-3 z-10 cursor-pointer"
            onClick={handleSaveClick}
          >
            {session ? (
              <SaveButton tripId={trip.id} initialSaved={false} />
            ) : (
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition group">
                <Heart className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition" />
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}