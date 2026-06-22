import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/trips/[tripId] - получить конкретное путешествие
export async function GET(
  request: NextRequest,
  { params }: { params: { tripId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    console.log("🔍 Запрос путешествия ID:", params.tripId);

    const trip = await prisma.trip.findUnique({
      where: { id: params.tripId },
      include: {
        locations: {
          orderBy: { order: "asc" }
        }
      },
    });

    if (!trip) {
      return NextResponse.json({ error: "Путешествие не найдено" }, { status: 404 });
    }

    if (trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }

    return NextResponse.json(trip);

  } catch (error) {
    console.error("❌ Ошибка:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// PUT /api/trips/[tripId] - обновить путешествие
export async function PUT(
  request: NextRequest,
  { params }: { params: { tripId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, startDate, endDate, imageUrl } = body;

    const existingTrip = await prisma.trip.findUnique({
      where: { id: params.tripId }
    });

    if (!existingTrip) {
      return NextResponse.json({ error: "Путешествие не найдено" }, { status: 404 });
    }

    if (existingTrip.userId !== session.user.id) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }

    const updatedTrip = await prisma.trip.update({
      where: { id: params.tripId },
      data: {
        title: title || existingTrip.title,
        description: description !== undefined ? description : existingTrip.description,
        startDate: startDate ? new Date(startDate) : existingTrip.startDate,
        endDate: endDate ? new Date(endDate) : existingTrip.endDate,
        imageUrl: imageUrl !== undefined ? imageUrl : existingTrip.imageUrl,
      },
      include: {
        locations: {
          orderBy: { order: "asc" }
        }
      },
    });

    return NextResponse.json(updatedTrip);

  } catch (error) {
    console.error("❌ Ошибка:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// DELETE /api/trips/[tripId] - удалить путешествие
export async function DELETE(
  request: NextRequest,
  { params }: { params: { tripId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const trip = await prisma.trip.findUnique({
      where: { id: params.tripId }
    });

    if (!trip) {
      return NextResponse.json({ error: "Путешествие не найдено" }, { status: 404 });
    }

    if (trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }

    await prisma.trip.delete({
      where: { id: params.tripId }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ Ошибка:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}