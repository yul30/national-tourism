"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Location as PrismaLocation } from "@/app/generated/prisma/client";

type NewLocation = Omit<PrismaLocation, 'id' | 'createdAt' | 'tripId'>;

export async function createTrip(formData: FormData) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const mainImage = formData.get("mainImage") as string;
    const additionalImagesJson = formData.get("additionalImages") as string;
    const locationsJson = formData.get("locations") as string;
    const isPublic = formData.get("isPublic") === "true";

    if (!title || !description) {
      throw new Error("Название и описание обязательны");
    }

    if (!mainImage) {
      throw new Error("Главное изображение обязательно");
    }

    const additionalImages = additionalImagesJson ? JSON.parse(additionalImagesJson) : [];
    const locations: NewLocation[] = locationsJson ? JSON.parse(locationsJson) : [];

    const tripData: any = {
      title,
      description,
      imageUrl: mainImage,
      userId: session.user.id,
      isPublic: isPublic,
    };

    if (startDate) {
      tripData.startDate = new Date(startDate);
    }
    
    if (endDate) {
      tripData.endDate = new Date(endDate);
    }

    const trip = await prisma.trip.create({
      data: tripData,
    });

    if (additionalImages.length > 0) {
      await prisma.tripImage.createMany({
        data: additionalImages.map((url: string, index: number) => ({
          url,
          tripId: trip.id,
          order: index,
        })),
      });
    }

    if (locations.length > 0) {
      await prisma.location.createMany({
        data: locations.map((loc: NewLocation, index: number) => ({
          locationTitle: loc.locationTitle,
          lat: loc.lat,
          lng: loc.lng,
          tripId: trip.id,
          order: index,
        })),
      });
    }

    console.log(`✅ Тур "${title}" создан. Публичный: ${isPublic ? "да" : "нет"}`);
    console.log(`📸 Загружено изображений: ${additionalImages.length + 1}`);
    console.log(`📍 Добавлено локаций: ${locations.length}`);

    revalidatePath("/trips");
    revalidatePath(`/trips/${trip.id}`);

    return { success: true, tripId: trip.id };
    
  } catch (error) {
    console.error("❌ Ошибка при создании путешествия:", error);
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Не удалось создать путешествие. Попробуйте позже."
    };
  }
}