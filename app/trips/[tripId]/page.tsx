import { auth } from "@/auth";
import TripDetailClient from "@/components/trip-detail";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function TripDetail({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      locations: { orderBy: { order: "asc" } },
      images: {
        orderBy: { order: "asc" },
        select: { id: true, url: true },
      },
      user: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
  });

  if (!trip) {
    return <div>Тур не найден.</div>;
  }

  const isOwner = trip.userId === session.user?.id;
  const isPublic = trip.isPublic === true;

  if (!isOwner && !isPublic) {
    redirect("/community-trips");
  }

  // Проверяем сохранил ли текущий пользователь этот тур
  const currentUserId = session.user?.id ?? "";

  const savedTrip = isOwner || !currentUserId
    ? null
    : await prisma.savedTrip.findUnique({
        where: {
          userId_tripId: {
            userId: currentUserId,
            tripId,
          },
        },
      });

  const initialSaved = !!savedTrip;

  return (
    <TripDetailClient
      trip={trip}
      isOwner={isOwner}
      initialSaved={initialSaved}
    />
  );
}