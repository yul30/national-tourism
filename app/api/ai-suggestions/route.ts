import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const { lastLocation, alreadyAdded } = await request.json();

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
            content: `Ты помощник по планированию маршрутов по Беларуси.
Отвечай ТОЛЬКО валидным JSON массивом без markdown и пояснений:
[{"name":"Название","address":"Адрес","reason":"5-7 слов почему стоит посетить"}]`,
          },
          {
            role: "user",
            content: `Я добавил "${lastLocation}" в маршрут. Уже есть: ${alreadyAdded}. Предложи ровно 3 ближайших интересных места.`,
          },
        ],
        temperature: 0.3,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ suggestions: [] });
    }

    const data = await response.json();
    let raw = data.choices[0].message.content.trim();
    raw = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    try {
      const parsed = JSON.parse(raw);
      return NextResponse.json({ suggestions: Array.isArray(parsed) ? parsed : [] });
    } catch {
      return NextResponse.json({ suggestions: [] });
    }

  } catch (error) {
    console.error("❌ AI suggestions error:", error);
    return NextResponse.json({ suggestions: [] });
  }
}