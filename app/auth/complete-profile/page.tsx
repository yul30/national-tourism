import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CompleteProfileForm from "@/components/complete-profile-form";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default async function CompleteProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Видео фон */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/aist.mp4" type="video/mp4" />
      </video>

      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Контент */}
      <div className="relative z-10 min-h-screen flex">

        {/* Левая часть */}
        <div className="hidden lg:flex w-1/2 flex-col justify-center pl-20 pr-12">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-6">
            туристический клуб • Беларусь • 2026
          </p>
          <h1 className={`${playfair.className} text-7xl font-black text-white leading-[1.05] mb-8`}>
            ПОЧТИ<br />
            ГОТОВО...
          </h1>
          <p className="text-white/60 text-sm tracking-widest uppercase">
            Осталось выбрать имя
          </p>
        </div>

        {/* Правая часть — форма */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
          <div className="w-full max-w-md">

            <div className="border-b border-white/20 pb-8 mb-8">
              <h2 className={`${playfair.className} text-3xl font-bold text-white mb-1`}>
                Ваш профиль
              </h2>
              <p className="text-white/50 text-sm">
                Вы вошли как{" "}
                <span className="text-white/80">{session.user.email}</span>
              </p>
            </div>

            <CompleteProfileForm initialName={session.user.name || ""} />

            <p className="mt-8 text-white/30 text-xs text-center tracking-wider uppercase">
              туристический клуб • Беларусь • 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}