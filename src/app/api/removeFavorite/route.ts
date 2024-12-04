import { PrismaClient } from '@prisma/client';
import { NextResponse,NextRequest } from 'next/server';
const prisma = new PrismaClient();

export async function DELETE(req:NextRequest, res:NextResponse) {


    const { userId, propertyId } =   await req.json();

    try {
      const favorite = await prisma.favorite.deleteMany({
        where: {
          userId: userId,
          propertyId: propertyId,
        },
      });
     return   NextResponse.json(favorite);
    } catch (error) {
       return  NextResponse.json({ "error" :error });
    }
  
}
