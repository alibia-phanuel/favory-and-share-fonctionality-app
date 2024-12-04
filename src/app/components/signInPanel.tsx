import { Button } from "@nextui-org/react";
import React from "react";
import UserProfilePanel from "./UserProfilePanel";
import prisma from "@/lib/prisma";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
const signInPanel = async () => {
  const { isAuthenticated, getUser } = await getKindeServerSession();
  if (await isAuthenticated()) {
    const user = await getUser();
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return <>{dbUser!! && <UserProfilePanel user={dbUser} />}</>;
  }

  return (
    <div className="flex gap-3">
      <Button color="primary">
        <LoginLink>Se connecter</LoginLink>
      </Button>
      <Button>
        <RegisterLink>Créer un compte</RegisterLink>
      </Button>
    </div>
  );
};

export default signInPanel;
