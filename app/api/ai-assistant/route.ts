import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const { message } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Сообщение обязательно" }, { status: 400 });
    }

    const trips = await prisma.trip.findMany({
      where: { isPublic: true },
      include: { locations: { take: 3 } },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const tripsContext = trips.map(t => ({
      id: t.id,
      title: t.title,
      description: t.description?.slice(0, 80) ?? "",
      locations: t.locations.map(l => l.locationTitle).join(", "),
    }));

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Ты AI-помощник по турам Беларуси. Туры: ${JSON.stringify(tripsContext)}
Отвечай ТОЛЬКО валидным JSON:
Если нашёл туры: {"type":"found","message":"текст","trips":[{"id":"...","title":"..."}]}
Если не нашёл: {"type":"not_found","message":"текст"}`,
          },
          { role: "user", content: message },
        ],
        temperature: 0.3,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("❌ Groq error:", err);
      return NextResponse.json({ error: "Ошибка AI" }, { status: 500 });
    }

    const data = await response.json();
    let raw = data.choices[0].message.content.trim();
    raw = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    try {
      const parsed = JSON.parse(raw);
      return NextResponse.json({ response: parsed });
    } catch {
      return NextResponse.json({
        response: { type: "text", message: raw }
      });
    }

  } catch (error) {
    console.error("❌ Ошибка:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}