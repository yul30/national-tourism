"use client";

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  locations: Array<{
    locationTitle: string;
    lat: number;
    lng: number;
  }>;
  height?: string;
}

export default function Map({ locations, height = "400px" }: MapProps) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [L, setL] = useState<any>(null);

  // Загружаем Leaflet только на клиенте
  useEffect(() => {
    const loadLeaflet = async () => {
      const Leaflet = await import('leaflet');
      setL(Leaflet.default);
    };
    loadLeaflet();
  }, []);

  useEffect(() => {
    if (!L || !mapContainerRef.current || mapRef.current) return;

    // Исправляем иконки маркеров (делаем это внутри useEffect)
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Центр карты
    const center: [number, number] = locations.length > 0 && locations[0].lat && locations[0].lng
      ? [locations[0].lat, locations[0].lng]
      : [55.7558, 37.6173];

    // Создаем карту
    mapRef.current = L.map(mapContainerRef.current).setView(center, 5);

    // Добавляем тайлы
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapRef.current);

    // Добавляем маркеры
    locations.forEach(location => {
      if (location.lat && location.lng) {
        const marker = L.marker([location.lat, location.lng]).addTo(mapRef.current!);
        marker.bindPopup(location.locationTitle);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [L, locations]);

  if (locations.length === 0) {
    return (
      <div 
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-gray-500">Нет мест для отображения на карте</p>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainerRef} 
      style={{ height, width: '100%' }}
      className="rounded-lg overflow-hidden"
    />
  );
}