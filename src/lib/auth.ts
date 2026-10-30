import "server-only";

import { cookies } from "next/headers";

import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nova-session")?.value;

  if (!token) {
    console.log("cookie");
    
    return null;
  }

  const session = await verifySession(token);

  if (!session) {
    console.log("session");

    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
    console.log("user");

  return user;
}
