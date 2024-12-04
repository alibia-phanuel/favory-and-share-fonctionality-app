"use server";

import prisma from "../prisma";

export const saveSubscription = async ({
  paymentId,
  planId,
  userId,
  startDate,
  endDate,
}: {
  paymentId: string;
  planId: number;
  userId: string;
  startDate: Date;
  endDate: Date;
}) => {
  try {
    await prisma.subscriptions.create({
      data: {
        paymentID: paymentId,
        startDate: startDate,
        endDate: endDate,
        user: {
          connect: {
            id: userId,
          },
        },
        plan: {
          connect: {
            id: planId,
          },
        },
      },
    });

    return {
      message: "Abonnement enregistré avec succès",
    };
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
};
