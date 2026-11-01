import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { createProductSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "ابتدا وارد حساب کاربری شوید." },
      { status: 401 },
    );
  }

  if (user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "شما اجازه انجام این عملیات را ندارید." },
      { status: 403 },
    );
  }

  try {
    const body: unknown = await request.json();
    const result = createProductSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "اطلاعات واردشده معتبر نیست.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = result.data;

    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
      select: { id: true },
    });

    if (!category) {
      return NextResponse.json(
        { message: "دسته‌بندی انتخاب‌شده وجود ندارد." },
        { status: 400 },
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });

    if (existingProduct) {
      return NextResponse.json(
        { message: "این شناسه محصول قبلاً ثبت شده است." },
        { status: 409 },
      );
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        discountPercentage: data.discountPercentage,
        stock: data.stock,
        image: data.image,
        categoryId: data.categoryId,
      },
    });

    return NextResponse.json(
      {
        message: "محصول با موفقیت ثبت شد.",
        product,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      { message: "هنگام ثبت محصول خطایی رخ داد." },
      { status: 500 },
    );
  }
}
