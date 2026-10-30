import prisma from "@/lib/prisma";


const categories = [
  {
    name: "کالای دیجیتال",
    slug: "digital",
    description: "جدیدترین محصولات دیجیتال و لوازم جانبی",
  },
  {
    name: "پوشاک",
    slug: "clothing",
    description: "انواع پوشاک برای استایل روزمره و رسمی",
  },
  {
    name: "لوازم خانه",
    slug: "home",
    description: "محصولات کاربردی برای خانه و زندگی",
  },
  {
    name: "ورزش و سفر",
    slug: "sports-travel",
    description: "تجهیزات ورزشی و لوازم موردنیاز سفر",
  },
];

const products = [
  {
    name: "هدفون نویز کنسلینگ",
    slug: "wireless-noise-cancelling-headphones",
    description:
      "هدفون بی‌سیم با قابلیت حذف نویز، مناسب گوش دادن به موسیقی و استفاده روزمره.",
    price: 4500000,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 124,
    image: "/images/1.jpg",
    stock: 12,
    categorySlug: "digital",
  },
  {
    name: "ساعت هوشمند نسل جدید",
    slug: "next-gen-smartwatch",
    description:
      "ساعت هوشمند برای بررسی فعالیت‌های روزانه و دسترسی سریع به اعلان‌ها.",
    price: 6200000,
    discountPercentage: 10,
    rating: 4.6,
    reviewCount: 86,
    image: "/images/2.jpg",
    stock: 7,
    categorySlug: "digital",
  },
  {
    name: "کیبورد مکانیکال گیمینگ",
    slug: "mechanical-gaming-keyboard",
    description:
      "کیبورد مکانیکال مناسب بازی و تایپ، با پاسخ‌گویی سریع و طراحی کاربردی.",
    price: 3800000,
    discountPercentage: 0,
    rating: 4.9,
    reviewCount: 203,
    image: "/images/3.jpg",
    stock: 0,
    categorySlug: "home",
  },
  {
    name: "ماوس بی‌سیم ارگونومیک",
    slug: "ergonomic-wireless-mouse",
    description:
      "ماوس بی‌سیم با طراحی ارگونومیک برای استفاده راحت در خانه یا محل کار.",
    price: 1900000,
    discountPercentage: 20,
    rating: 4.5,
    reviewCount: 67,
    image: "/images/4.jpg",
    stock: 15,
    categorySlug: "home",
  },
];

async function main() {
  // Upsert makes this seed safe to run again without creating duplicate rows.
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
      },
      create: category,
    });
  }

  for (const product of products) {
    const { categorySlug, ...productData } = product;

    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
      select: { id: true },
    });

    if (!category) {
      throw new Error(`Category not found for product: ${product.slug}`);
    }

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        ...productData,
        categoryId: category.id,
      },
      create: {
        ...productData,
        categoryId: category.id,
      },
    });
  }

  console.log("Seed completed: categories and products are ready.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
