import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { createProductSchema } from "@/lib/validation";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  try {
    // 1. بررسی ورود کاربر و دسترسی ادمین
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

    // 2. دریافت شناسه محصول از URL
    const { id } = await params;

    // 3. اعتبارسنجی اطلاعات ارسالی
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

    // 4. بررسی وجود محصول
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "محصول موردنظر پیدا نشد." },
        { status: 404 },
      );
    }

    // 5. بررسی وجود دسته‌بندی
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

    // 6. بررسی تکراری نبودن slug
    const duplicateSlug = await prisma.product.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
      select: { id: true },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        { message: "این شناسه قبلاً برای محصول دیگری ثبت شده است." },
        { status: 409 },
      );
    }

    // 7. به‌روزرسانی محصول
    const product = await prisma.product.update({
      where: { id },
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

    return NextResponse.json({
      message: "محصول با موفقیت ویرایش شد.",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    return NextResponse.json(
      { message: "هنگام ویرایش محصول خطایی رخ داد." },
      { status: 500 },
    );
  }
}
