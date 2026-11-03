import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { categorySchema } from "@/lib/validation";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  try {
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

    const { id } = await params;

    const body: unknown = await request.json();
    const result = categorySchema.safeParse(body);

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

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد." },
        { status: 404 },
      );
    }

    const duplicateSlug = await prisma.category.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        { message: "این شناسه قبلاً استفاده شده است." },
        { status: 409 },
      );
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
      },
    });

    return NextResponse.json({
      message: "دسته‌بندی با موفقیت ویرایش شد.",
      category,
    });
  } catch (error) {
    console.error("Update category error:", error);

    return NextResponse.json(
      { message: "هنگام ویرایش دسته‌بندی خطایی رخ داد." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext,
) {
  try {
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

    const { id } = await params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "دسته‌بندی موردنظر پیدا نشد." },
        { status: 404 },
      );
    }

    if (category._count.products > 0) {
      return NextResponse.json(
        {
          message: `این دسته‌بندی دارای ${category._count.products} محصول است و قابل حذف نیست.`,
        },
        { status: 409 },
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "دسته‌بندی با موفقیت حذف شد.",
    });
  } catch (error) {
    console.error("Delete category error:", error);

    return NextResponse.json(
      { message: "هنگام حذف دسته‌بندی خطایی رخ داد." },
      { status: 500 },
    );
  }
}

