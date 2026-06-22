import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function geocodeAddress(address: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&limit=1`,
      {
        headers: {
          "User-Agent": "TravelPlannerApp/1.0",
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (data?.length > 0) {
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };
    }

    return null;
  } catch (error) {
    console.error("Ошибка геокодирования:", error);

    return null;
  }
}

type RouteContext = {
  params: Promise<{
    tripId: string;
  }>;
};

// POST
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { tripId } = await context.params;

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Не авторизован" },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const locationTitle =
      formData.get("locationTitle")?.toString();

    const address =
      formData.get("address")?.toString() ||
      locationTitle;

    if (!locationTitle || !address) {
      return NextResponse.json(
        { error: "Все поля обязательны" },
        { status: 400 }
      );
    }

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
    });

    if (!trip) {
      return NextResponse.json(
        { error: "Путешествие не найдено" },
        { status: 404 }
      );
    }

    if (trip.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Нет доступа" },
        { status: 403 }
      );
    }

    const coordinates =
      await geocodeAddress(address);

    const count =
      await prisma.location.count({
        where: {
          tripId,
        },
      });

    const location =
      await prisma.location.create({
        data: {
          locationTitle,
          lat:
            coordinates?.lat ??
            55.7558,

          lng:
            coordinates?.lng ??
            37.6173,

          tripId,

          order: count,
        },
      });

    return NextResponse.json(
      location,
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}

// GET
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { tripId } =
      await context.params;

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Не авторизован" },
        { status: 401 }
      );
    }

    const locations =
      await prisma.location.findMany({
        where: {
          tripId,
        },

        orderBy: {
          order: "asc",
        },
      });

    return NextResponse.json(
      locations
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}