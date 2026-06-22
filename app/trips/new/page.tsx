"use client";

import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Globe, Lock, X, MapPin, ArrowRight } from "lucide-react";
import TripLocationForm from "@/components/ui/trip-location-form";
import { Location as PrismaLocation } from "@/app/generated/prisma/client";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

type NewLocation = Omit<PrismaLocation, "id" | "createdAt" | "tripId"> & {
  id?: string;
};

interface TripFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function NewTrip() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState<TripFormData>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [mainImage, setMainImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [locations, setLocations] = useState<NewLocation[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const showSuccessModal = () => {
    setShowSuccess(true);
    setTimeout(() => {
      router.push("/trips");
      router.refresh();
    }, 2000);
  };

  const showErrorModal = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!mainImage) {
      showErrorModal("Пожалуйста, загрузите главное изображение тура");
      return;
    }
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("startDate", formData.startDate);
    submitData.append("endDate", formData.endDate);
    submitData.append("mainImage", mainImage);
    submitData.append("additionalImages", JSON.stringify(additionalImages));
    submitData.append("locations", JSON.stringify(locations));
    submitData.append("isPublic", String(isPublic));

    startTransition(async () => {
      const result = await createTrip(submitData);
      if (result.success) {
        showSuccessModal();
        setFormData({ title: "", description: "", startDate: "", endDate: "" });
        setMainImage(null);
        setAdditionalImages([]);
        setLocations([]);
        setIsPublic(false);
        setCurrentStep(1);
      } else {
        showErrorModal(result.error || "Ошибка при создании тура");
      }
    });
  };

  return (
    <>
      {/* Модал успех */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className={`${playfair.className} text-3xl font-black text-gray-900 mb-3 uppercase`}>
                Готово!
              </h2>
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                Тур успешно создан
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Модал ошибка */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 border-2 border-gray-900 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className={`${playfair.className} text-3xl font-black text-gray-900 mb-3 uppercase`}>
                Ошибка
              </h2>
              <p className="text-gray-400 text-sm">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Страница с видео фоном */}
      <div className="relative min-h-screen">

        {/* Видео фон */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-10"
        >
          <source src="/registr.mp4" type="video/mp4" />
        </video>

        {/* Затемнение */}
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="max-w-2xl mx-auto px-6 py-12 pb-16">

          {/* Шаги */}
          <div className="flex gap-2 mb-8">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`flex-1 py-3 text-xs font-medium uppercase tracking-widest rounded-full transition ${
                currentStep === 1
                  ? "bg-white text-gray-900"
                  : "bg-white/20 text-white/70 hover:bg-white/30"
              }`}
            >
              01 — Основная информация
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`flex-1 py-3 text-xs font-medium uppercase tracking-widest rounded-full transition ${
                currentStep === 2
                  ? "bg-white text-gray-900"
                  : "bg-white/20 text-white/70 hover:bg-white/30"
              }`}
            >
              02 — Места {locations.length > 0 && `(${locations.length})`}
            </button>
          </div>

          {/* Форма */}
          <form
            className="space-y-8 bg-white rounded-3xl p-8 shadow-xl"
            onSubmit={handleSubmit}
          >

            {/* Шаг 1 */}
            {currentStep === 1 && (
              <div className="space-y-8">

                <div>
                  <label className="block text-xs text-gray-900 uppercase tracking-widest mb-2 font-semibold">
                    Название тура *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Например: Брестская крепость и окрестности"
                    className="w-full border-b border-gray-300 px-0 py-3 text-lg bg-transparent focus:outline-none focus:border-gray-900 transition placeholder:text-gray-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-900 uppercase tracking-widest mb-2 font-semibold">
                    Описание *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Опишите маршрут, достопримечательности и особенности тура..."
                    rows={4}
                    className="w-full border-b border-gray-300 px-0 py-3 bg-transparent focus:outline-none focus:border-gray-900 transition resize-none placeholder:text-gray-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs text-gray-900 uppercase tracking-widest mb-2 font-semibold">
                      Дата начала
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full border-b border-gray-300 px-0 py-3 bg-transparent focus:outline-none focus:border-gray-900 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-900 uppercase tracking-widest mb-2 font-semibold">
                      Дата окончания
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full border-b border-gray-300 px-0 py-3 bg-transparent focus:outline-none focus:border-gray-900 transition"
                    />
                  </div>
                </div>

                {/* Главное фото */}
                <div>
                  <label className="block text-xs text-gray-900 uppercase tracking-widest mb-3 font-semibold">
                    Главное изображение *
                  </label>
                  {mainImage ? (
                    <div className="relative group rounded-2xl overflow-hidden">
                      <img
                        src={mainImage}
                        alt="Main"
                        className="w-full h-64 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setMainImage(null)}
                        className="absolute top-3 right-3 bg-gray-900 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-gray-400 transition bg-gray-50 [&_button]:bg-gray-800 [&_button]:text-white [&_button]:rounded-full [&_button]:px-6 [&_button]:py-2 [&_button]:text-xs [&_button]:uppercase [&_button]:tracking-widest [&_button]:hover:bg-gray-700 [&_button]:transition">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res[0]?.url) setMainImage(res[0].url);
                        }}
                        onUploadError={() => showErrorModal("Ошибка при загрузке изображения")}
                      />
                    </div>
                  )}
                </div>

                {/* Доп фото */}
                <div>
                  <label className="block text-xs text-gray-900 uppercase tracking-widest mb-3 font-semibold">
                    Дополнительные фото (до 5 шт.)
                  </label>
                  {additionalImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {additionalImages.map((url, index) => (
                        <div key={index} className="relative group aspect-square rounded-xl overflow-hidden">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="absolute top-1 right-1 bg-gray-900 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {additionalImages.length < 5 && (
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-gray-400 transition bg-gray-50 [&_button]:bg-gray-800 [&_button]:text-white [&_button]:rounded-full [&_button]:px-6 [&_button]:py-2 [&_button]:text-xs [&_button]:uppercase [&_button]:tracking-widest [&_button]:hover:bg-gray-700 [&_button]:transition">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res[0]?.url)
                            setAdditionalImages((prev) => [...prev, res[0].url]);
                        }}
                        onUploadError={() => showErrorModal("Ошибка при загрузке изображения")}
                      />
                    </div>
                  )}
                </div>

                {/* Публичность */}
                <div className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {isPublic ? (
                      <Globe className="w-5 h-5 text-gray-700" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        {isPublic ? "Публичный тур" : "Приватный тур"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {isPublic
                          ? "Ваш тур увидят другие пользователи"
                          : "Только вы сможете видеть этот тур"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPublic(!isPublic)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPublic ? "bg-gray-900" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPublic ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!mainImage || !formData.title || !formData.description}
                  className="group flex w-full items-center justify-between bg-gray-900 text-white px-6 py-4 rounded-full hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className={`${playfair.className} text-base`}>
                    Далее — добавить места
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            )}

            {/* Шаг 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="border-l-2 border-gray-900 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-700" />
                    <p className="text-xs uppercase tracking-widest text-gray-900 font-semibold">
                      Добавьте места в маршрут
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    Вы можете добавить места сейчас или сделать это позже на странице тура.
                  </p>
                </div>

                <TripLocationForm
                  onLocationsChange={setLocations}
                  initialLocations={locations}
                />

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border border-gray-300 text-gray-600 py-4 rounded-full text-xs uppercase tracking-widest hover:border-gray-900 hover:text-gray-900 transition"
                  >
                    ← Назад
                  </button>
                  <button
                    type="submit"
                    disabled={isPending || !mainImage}
                    className={`${playfair.className} flex-1 bg-gray-900 text-white py-4 rounded-full text-base font-medium hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {isPending
                      ? "Создание..."
                      : `Создать тур${locations.length > 0 ? ` (${locations.length} мест)` : ""}`}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}