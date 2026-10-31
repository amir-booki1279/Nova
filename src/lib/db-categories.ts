import "server-only";

import prisma from "@/lib/prisma";

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: {
      slug,
    },
  });
}

export async function getCategoriesWithProducts() {
  return prisma.category.findMany({
    include: {
      products: {
        where: {
          isActive: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}
