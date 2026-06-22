"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700'],
});

export default function CompleteProfileForm({ initialName = "" }: { initialName?: string }) {
  const router = useRouter();
  const { update } = useSession();
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Ошибка при сохранении");
      }

      await update({ name });
      router.push("/");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-white/60 text-xs tracking-widest uppercase mb-3">
          Ваше имя *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например: Иван Петров"
          className={`${playfair.className} w-full bg-white/5 backdrop-blur-sm border border-white/20 px-6 py-4 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/50 transition`}
          required
          minLength={2}
          maxLength={50}
        />
        <p className="text-white/30 text-xs mt-2 tracking-wider">
          Имя будет отображаться в хедере и на странице сообщества
        </p>
      </div>

      {error && (
        <div className="border border-red-400/40 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="group flex w-full items-center justify-between border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-4 text-white hover:bg-white/10 hover:border-white/40 transition disabled:opacity-50"
      >
        <span className={`${playfair.className} text-base`}>
          {isLoading ? "Сохранение..." : "Сохранить и продолжить"}
        </span>
        <span className="text-white/30 group-hover:text-white/60 transition">→</span>
      </button>
    </form>
  );
}