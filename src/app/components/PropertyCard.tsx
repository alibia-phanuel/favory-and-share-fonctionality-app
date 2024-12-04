"use client";
import { Card, Image } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";

import { User as PrismaUser } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
interface Props {
  property: Prisma.PropertyGetPayload<{
    select: {
      id: true;
      name: true;
      price: true;
      images: {
        select: {
          url: true;
        };
      };
      location: {
        select: {
          city: true;
          state: true;
        };
      };
    };
  }>;
  user: PrismaUser | null;
}

const PropertyCard = ({ property, user }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const addFavorite = async () => {
    try {
      const response = await fetch("/api/addFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          propertyId: property.id,
        }),
      });
      if (response.ok) {
        setIsFavorite(true);
      } else {
        console.error("Erreur lors de l'ajout aux favoris");
      }
    } catch (error) {
      console.error("Erreur réseau : ", error);
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await fetch("/api/removeFavorite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          propertyId: property.id,
        }),
      });
      if (response.ok) {
        setIsFavorite(false);
      } else {
        console.error("Erreur lors de la suppression des favoris");
      }
    } catch (error) {
      console.error("Erreur réseau : ", error);
    }
  };
  // Chargez l'état initial des favoris depuis le backend
  useEffect(() => {
    if (user) {
      const fetchIsFavorite = async () => {
        const response = await fetch("/api/isFavorite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, propertyId: property.id }),
        });
        const data = await response.json();
        setIsFavorite(data.isFavorite);
      };

      fetchIsFavorite();
    }
  }, [user, property.id]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour ajouter aux favoris.");
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite();
      } else {
        await addFavorite();
      }
      setIsFavorite((prev) => !prev);
      // Recharger la page pour synchroniser l'état global
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };
  return (
    <Card className="flex  hover:scale-105" shadow="md">
      {property?.images[0]?.url ? (
        <Image
          radius="none"
          src={
            property?.images[0]?.url
            // property.id === 1
            //   ? property.images[0].url
            //   : `/images/${Math.floor(Math.random() * 9 + 1)}.jpg`
          }
          className="object-fill w-96 h-48"
          alt="image"
        />
      ) : (
        <Image
          radius="none"
          src="/imageNotFound.png"
          className="object-fill w-96 h-48"
          alt="image"
        />
      )}
      <div className="flex flex-col mt-auto">
        <div className="p-4">
          <p className="text-primary-600 text-xl font-bold">{property?.name}</p>
          <p className="text-slate-600">{property?.location?.city}</p>
          <p className="text-slate-600">{property?.location?.state}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-slate-400 p-4 flex justify-between">
          <div>
            <p className="text-primary-600 text-xl font-bold">
              {property?.price.toLocaleString()}
              <span> €</span>
            </p>

            <Link
              className="hover:text-primary-500 transition-colors"
              href={`/property/${property.id}`}
            >
              Voir détails
            </Link>
          </div>
          {/* /*button //  */}
          {/* Bouton favoris */}
          {user ? (
            <button
              onClick={toggleFavorite}
              className="items-center flex justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              {isFavorite ? (
                <AiFillHeart className="text-red-500" />
              ) : (
                <AiOutlineHeart />
              )}
            </button>
          ) : (
            <p className="text-small hidden"></p>
          )}
          {/* ///button */}
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
