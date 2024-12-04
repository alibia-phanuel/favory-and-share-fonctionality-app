import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserById } from "@/lib/actions/user";
import prisma from "@/lib/prisma";
import PropertyCard from "@/app/components/PropertyCard";
import { Card } from "@nextui-org/react";
const page = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  // Vérifiez si l'utilisateur est valide
  const dbUser = await getUserById(user ? user.id : "");
  if (!dbUser || !dbUser.id) {
    throw new Error("Something went wrong with authentication");
  }

  // Récupérer tous les favoris de l'utilisateur
  const favorites = await prisma.favorite.findMany({
    where: { userId: dbUser.id },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          price: true,
          images: {
            select: { url: true },
          },
          location: {
            select: {
              city: true,
              state: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex items-center flex-col">
      <div className="min-w-[970px] my-5 p-4 bg-slate-200 rounded-lg">
        <div className="p-4">Tous vos Favoris ({favorites.length})</div>
        <div className="p-4 border-t-2 border-[#006FEE]  w-full flex">
          {favorites.length > 0 ? (
            <div className="flex w-full gap-4">
              {favorites.map((favorite) => (
                <PropertyCard
                  property={favorite.property}
                  key={favorite.property.id}
                  user={dbUser}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Aucun favori trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
