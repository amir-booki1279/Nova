import "server-only";

import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function getProducts() {
  return prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
    },
    include: {
      category: true,
    },
  });
}


export type DbProduct = Prisma.ProductGetPayload<{include:{category:true}}>;