import {  NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'; // Assurez-vous que Prisma est initialisé correctement
type Params = {
    team: string;
  };
export  async function GET(req:NextRequest, res: NextResponse,context: { params: Params }) {

    const url = req.url;  // Récupère l'URL de la requête
  const id = url.split('/').pop() 
    try {
      const count = await prisma.favorite.count({
        where: { propertyId: parseInt(id as string, 10) },
      });
      return  NextResponse.json({message:"nombre de favoris bien" ,data:count});
    } catch (error) {
      console.error("Error fetching property favorites:", error);
      return NextResponse.json({ error: "Something went wrong" });
    }
  } 

