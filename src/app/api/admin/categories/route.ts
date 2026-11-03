import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { categorySchema } from "@/lib/validation";

export async function POST(request: Request) {
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
      where: { slug: data.slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "این شناسه قبلاً ثبت شده است." },
        { status: 409 },
      );
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
      },
    });

    return NextResponse.json(
      {
        message: "دسته‌بندی با موفقیت ایجاد شد.",
        category,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create category error:", error);

    return NextResponse.json(
      { message: "هنگام ایجاد دسته‌بندی خطایی رخ داد." },
      { status: 500 },
    );
  }
}
