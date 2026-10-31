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

export async function getProductsByCategorySlug(slug:string) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      category :{slug}
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

export async function searchProducts(query: string) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  return prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        {
          name: {
            contains: normalizedQuery,
          },
        },
        {
          description: {
            contains: normalizedQuery,
          },
        },
        {
          category: {
            name: {
              contains: normalizedQuery,
            },
          },
        },
      ],
    },
    include: {
      category: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });
}



export type DbProduct = Prisma.ProductGetPayload<{include:{category:true}}>;