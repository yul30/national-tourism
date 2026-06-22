import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/trips - получить все путешествия пользователя
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const trips = await prisma.trip.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        locations: true
      }
    });

    return NextResponse.json(trips);

  } catch (error) {
    console.error("❌ Ошибка:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// POST /api/trips - создать новое путешествие
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, startDate, endDate, imageUrl } = body;

    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }

    const trip = await prisma.trip.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        imageUrl,
        userId: session.user.id,
      },
    });

    return NextResponse.json(trip, { status: 201 });

  } catch (error) {
    console.error("❌ Ошибка:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}