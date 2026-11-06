import "server-only";
import prisma from "@/lib/prisma";

export async function getAdminUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createAt: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });
}

export async function getAdminUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createAt: true,
      updateAt: true,
      _count: {
        select: {
          orders: true,
          addresses: true,
        },
      },
    },
  });
}
