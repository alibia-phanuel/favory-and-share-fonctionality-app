import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, propertyId } = await req.json();

    const isFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    return NextResponse.json({ isFavorite: Boolean(isFavorite) });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
