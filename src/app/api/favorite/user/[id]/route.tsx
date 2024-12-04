import { Prisma } from "@prisma/client";

import prisma from '@/lib/prisma';
import { NextResponse ,NextRequest} from "next/server";
export  async function GET(req: NextRequest, res: NextResponse) {
  const url = req.url;  // Récupère l'URL de la requête
  const id = url.split('/').pop() 
    try {
      const count = await prisma.favorite.count({
        where: { userId: id as string },
      });

      return  NextResponse.json({message:"nombre de favoris d'un utilisateur", data:count});
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      return NextResponse.json({ error: "Something went wrong" });
    }
  } 
