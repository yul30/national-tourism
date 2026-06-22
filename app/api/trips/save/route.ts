import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Только сохраняет — не удаляет
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const userId = session.user.id;
    const { tripId } = await request.json();

    if (!tripId || typeof tripId !== "string") {
      return NextResponse.json({ error: "Неверный ID тура" }, { status: 400 });
    }

    // Проверяем существование тура
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      select: { id: true },
    });

    if (!trip) {
      return NextResponse.json({ error: "Тур не найден" }, { status: 404 });
    }

    // Проверяем не сохранён ли уже
    const existing = await prisma.savedTrip.findUnique({
      where: { userId_tripId: { userId, tripId } },
    });

    if (existing) {
      // Уже сохранён — просто возвращаем saved: true
      return NextResponse.json({ saved: true });
    }

    // Сохраняем
    await prisma.savedTrip.create({
      data: { userId, tripId },
    });

    return NextResponse.json({ saved: true });

  } catch (error) {
    console.error("Ошибка при сохранении тура:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// Получить все сохраненные туры пользователя
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const savedTrips = await prisma.savedTrip.findMany({
      where: { userId: session.user.id },
      include: {
        trip: {
          include: {
            user: { select: { name: true, email: true } },
            locations: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(savedTrips.map((st) => st.trip));

  } catch (error) {
    console.error("Ошибка при получении сохраненных туров:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}