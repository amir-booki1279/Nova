import "server-only";

import { cookies } from "next/headers";

import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nova-session")?.value;

  if (!token) {    
    return null;
  }

  const session = await verifySession(token);

  if (!session) {
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
  return user;
}

export async  function requireUser(){
  const user = await getCurrentUser();

  if(!user){
    redirect('/login')
  }

  return user;
}

export async  function requireAdmin(){
  const user = await requireUser();

  if(user.role!=="ADMIN"){
    redirect('/')
  }
  return user;
}

