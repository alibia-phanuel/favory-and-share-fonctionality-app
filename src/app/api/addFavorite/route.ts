import {   NextResponse, type NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest,res:NextResponse) {
    // console.log("ok le text est bon " , req.json())
   
  try {
    const {userId ,propertyId}=  await req.json()
   
    const favorite = await prisma.favorite.create({
      data: {
        userId: userId,
        propertyId,
      },
    });
    return NextResponse.json(favorite);
  } catch (error) {
    return NextResponse.json(
      { error },
    );
  }
}
