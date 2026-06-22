import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Playfair_Display } from 'next/font/google';
import TripCardClient from "@/components/ui/trip-card-client";
import FiltersClient from "@/components/ui/filters-client";
import ShowMoreButtonClient from "@/components/ui/show-more-button-client";
import AIAssistant from "@/components/AIAssistant";

const playfair = Playfair_Display({ 
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const regionCenters = [
  { name: 'Минская', lat: 53.9045, lng: 27.5618 },
  { name: 'Брестская', lat: 52.0976, lng: 23.7341 },
  { name: 'Гродненская', lat: 53.6694, lng: 23.8131 },
  { name: 'Витебская', lat: 55.1848, lng: 30.2016 },
  { name: 'Гомельская', lat: 52.4412, lng: 30.9878 },
  { name: 'Могилёвская', lat: 53.9168, lng: 30.3449 },
];

const regionKeywords: Record<string, string[]> = {
  'Минская': ['минск', 'минская', 'заславль', 'молодечно', 'борисов', 'солигорск', 'слуцк'],
  'Брестская': ['брест', 'брестская', 'пинск', 'барановичи', 'кобрин', 'берёза', 'каменец', 'беловежская пуща', 'лясковичи', 'столин', 'ольманские', 'давид'],
  'Гродненская': ['гродно', 'гродненская', 'лида', 'слоним', 'волковыск', 'новогрудок', 'мир', 'несвиж'],
  'Витебская': ['витебск', 'витебская', 'орша', 'полоцк', 'новополоцк', 'браслав', 'лепель'],
  'Гомельская': ['гомель', 'гомельская', 'мозырь', 'речица', 'светлогорск', 'рогачёв', 'добруш', 'припятский', 'припять', 'мозырские', 'бобровая', 'туров', 'петриков', 'житковичи', 'калинковичи'],
  'Могилёвская': ['могилёв', 'могилев', 'могилёвская', 'бобруйск', 'горки', 'кричев', 'осиповичи'],
};

function getRegionFromTitle(title: string): string | null {
  const titleLower = title.toLowerCase();
  for (const [region, keywords] of Object.entries(regionKeywords)) {
    if (keywords.some(keyword => titleLower.includes(keyword))) return region;
  }
  return null;
}

function getRegionFromCoords(lat: number, lng: number): string | null {
  let closestRegion = null;
  let minDistance = Infinity;
  for (const center of regionCenters) {
    const distance = Math.sqrt(
      Math.pow(lat - center.lat, 2) + Math.pow(lng - center.lng, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestRegion = center.name;
    }
  }
  // Убираем жёсткий порог — всегда возвращаем ближайший регион
  return closestRegion;
}

function getTripRegion(trip: any): string | null {
  // Сначала ищем по названию поездки
  const fromTitle = getRegionFromTitle(trip.title);
  if (fromTitle) return fromTitle;

  // Потом перебираем все локации по названию
  if (trip.locations && trip.locations.length > 0) {
    for (const loc of trip.locations) {
      const fromLocTitle = getRegionFromTitle(loc.locationTitle);
      if (fromLocTitle) return fromLocTitle;
    }

    // Если по названиям не нашли — берём координаты первой локации
    const first = trip.locations[0];
    if (first.lat && first.lng) {
      return getRegionFromCoords(first.lat, first.lng);
    }
  }

  return null;
}

function getDurationInDays(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

function getTripType(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('замок') || t.includes('усадьб')) return 'castles';
  if (t.includes('парк') || t.includes('пущ')) return 'nature';
  if (t.includes('истори') || t.includes('музей')) return 'history';
  if (t.includes('гор') || t.includes('озер') || t.includes('актив')) return 'active';
  if (t.includes('культур') || t.includes('экскурс')) return 'culture';
  return 'other';
}

export default async function CommunityTripsPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    regions?: string; 
    types?: string; 
    durationFrom?: string; 
    durationTo?: string;
    search?: string;
  }>;
}) {
  const session = await auth();
  const currentUserId = session?.user?.id;
  const params = await searchParams;

  const communityTrips = await prisma.trip.findMany({
    where: { isPublic: true },
    include: {
      user: { select: { id: true, name: true, email: true } },
      locations: true,
      _count: { select: { savedBy: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const tripsWithRegion = communityTrips.map(trip => ({
    ...trip,
    region: getTripRegion(trip),
  }));

  let filteredTrips = tripsWithRegion;

  if (params.regions || params.types || params.durationFrom || params.durationTo || params.search) {
    filteredTrips = tripsWithRegion.filter(trip => {
      let matches = true;
      if (params.regions && matches) {
        const regions = params.regions.split(',');
        matches = !!trip.region && regions.includes(trip.region);
      }
      if (params.types && matches) {
        matches = params.types.split(',').includes(getTripType(trip.title));
      }
      if (params.durationFrom && matches) {
        matches = getDurationInDays(trip.startDate, trip.endDate) >= parseInt(params.durationFrom);
      }
      if (params.durationTo && matches) {
        matches = getDurationInDays(trip.startDate, trip.endDate) <= parseInt(params.durationTo);
      }
      if (params.search && matches) {
        const s = params.search.toLowerCase();
        matches = trip.title.toLowerCase().includes(s) ||
          (trip.description?.toLowerCase().includes(s) ?? false) ||
          trip.locations.some(loc => loc.locationTitle.toLowerCase().includes(s));
      }
      return matches;
    });
  }

  const regions = ['Минская', 'Брестская', 'Гродненская', 'Витебская', 'Гомельская', 'Могилёвская'];

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>

      {/* Hero с фото bel.jpg */}
      <div style={{
        position: 'relative',
        backgroundImage: 'url(/bel.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '5rem 0',
      }}>
        {/* Затемнение */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 35, 0.52)',
        }} />

        {/* Контент поверх */}
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
            ПУТЕШЕСТВИЯ<br />ПО БЕЛАРУСИ
          </h1>

          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(230, 238, 248, 0.9)',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}>
            Откройте для себя уникальные маршруты от опытных путешественников. 
            Замки, усадьбы, национальные парки и скрытые жемчужины нашей страны.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            <p style={{ fontSize: '1rem', color: 'rgba(210, 225, 240, 0.85)' }}>
              Всего туров: {filteredTrips.length}
            </p>
            {(params.regions || params.types || params.durationFrom || params.durationTo || params.search) && (
              <p style={{
                fontSize: '0.875rem',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                color: 'rgba(255,255,255,0.9)',
              }}>
                Фильтры применены
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>

          {/* Фильтры */}
          <FiltersClient playfair={playfair} regions={regions} />

          {/* Карточки */}
          <div>
            {filteredTrips.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', background: '#f9fafb', borderRadius: '2rem' }}>
                <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>По вашему запросу ничего не найдено</p>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginTop: '1rem' }}>Попробуйте изменить параметры фильтрации</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {filteredTrips.map((trip) => (
                  <TripCardClient
                    key={trip.id}
                    trip={trip}
                    playfair={playfair}
                    isOwner={trip.user?.id === currentUserId}
                    session={session}
                  />
                ))}
              </div>
            )}
            {filteredTrips.length > 12 && <ShowMoreButtonClient />}
          </div>
        </div>
      </div>
          <AIAssistant trips={filteredTrips.map(t => ({ id: t.id, title: t.title }))} />
    </div>
  );
}