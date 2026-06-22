"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-800">Travel Planner</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/community-trips" className="text-gray-600 hover:text-gray-900 transition">
            Сообщество
          </Link>
          
          {!isLoading && session ? (
            <>
              <Link href="/trips" className="text-gray-600 hover:text-gray-900 transition">
                Мои путешествия
              </Link>
              <Link href="/globe" className="text-gray-600 hover:text-gray-900 transition">
                Карта
              </Link>
              <div className="flex items-center gap-4">
               <span className="text-gray-600 hover:text-gray-900 transition">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
                >
                  Выйти
                </button>
              </div>
            </>
          ) : (
            !isLoading && (
              <Link
                href="/auth/signin"
                className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
              >
                Войти
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}