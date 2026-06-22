"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// Бесплатное геокодирование через OpenStreetMap
async function geocodeAddress(address: string) {
  try {
    console.log("🔍 Геокодирование адреса:", address);
    
    // Добавляем задержку для соблюдения правил Nominatim
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'User-Agent': 'TravelPlannerApp/1.0' // Обязательный заголовок для Nominatim
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      console.log("✅ Координаты найдены:", data[0].lat, data[0].lon);
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }

    // Если адрес не найден, пробуем найти по названию
    console.log("⚠️ Адрес не найдет, пробуем найти по названию...");
    const nameResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'User-Agent': 'TravelPlannerApp/1.0'
        }
      }
    );

    const nameData = await nameResponse.json();
    
    if (nameData && nameData.length > 0) {
      return {
        lat: parseFloat(nameData[0].lat),
        lng: parseFloat(nameData[0].lon)
      };
    }

    // Если ничего не найдено, возвращаем null
    console.log("❌ Место не найдено:", address);
    return null;
    
  } catch (error) {
    console.error("❌ Ошибка геокодирования:", error);
    return null;
  }
}

// Функция для получения координат популярных мест (запасной вариант)
function getDefaultCoordinates(address: string) {
  const addressLower = address.toLowerCase();
  
  // Популярные города
  if (addressLower.includes("москва") || addressLower.includes("moscow")) {
    return { lat: 55.7558, lng: 37.6173 };
  } else if (addressLower.includes("санкт-петербург") || addressLower.includes("st petersburg")) {
    return { lat: 59.9343, lng: 30.3351 };
  } else if (addressLower.includes("лондон") || addressLower.includes("london")) {
    return { lat: 51.5074, lng: -0.1278 };
  } else if (addressLower.includes("нью-йорк") || addressLower.includes("new york")) {
    return { lat: 40.7128, lng: -74.0060 };
  } else if (addressLower.includes("париж") || addressLower.includes("paris")) {
    return { lat: 48.8566, lng: 2.3522 };
  } else if (addressLower.includes("токио") || addressLower.includes("tokyo")) {
    return { lat: 35.6762, lng: 139.6503 };
  } else if (addressLower.includes("рим") || addressLower.includes("rome")) {
    return { lat: 41.9028, lng: 12.4964 };
  } else if (addressLower.includes("берлин") || addressLower.includes("berlin")) {
    return { lat: 52.5200, lng: 13.4050 };
  }
  
  return null;
}

export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Не авторизован");
  }

  const address = formData.get("address")?.toString();
  const locationTitle = formData.get("locationTitle")?.toString() || address;
  
  if (!address) {
    throw new Error("Введите адрес или название места");
  }

  console.log("📝 Добавление локации:", { tripId, address, locationTitle });

  // Пробуем получить координаты
  let coordinates = await geocodeAddress(address);
  
  // Если не нашли, пробуем заглушки
  if (!coordinates) {
    coordinates = getDefaultCoordinates(address);
  }

  // Если всё еще нет координат, используем центр Москвы
  if (!coordinates) {
    console.log("⚠️ Используем координаты по умолчанию");
    coordinates = { lat: 55.7558, lng: 37.6173 };
  }

  // Получаем текущее количество локаций для order
  const count = await prisma.location.count({
    where: { tripId },
  });

  // Создаем локацию
  const location = await prisma.location.create({
    data: {
      locationTitle: locationTitle || address,
      lat: coordinates.lat,
      lng: coordinates.lng,
      tripId,
      order: count,
    },
  });

  console.log("✅ Локация создана:", location.id);

  redirect(`/trips/${tripId}`);
}