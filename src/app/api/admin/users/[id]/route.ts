import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری شوید." },
        { status: 401 }
      );
    }

    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز است." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { role } = body;

    if (role !== "USER" && role !== "ADMIN") {
      return NextResponse.json(
        { message: "نقش انتخاب‌شده معتبر نیست." },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return NextResponse.json(
        { message: "کاربر پیدا نشد." },
        { status: 404 }
      );
    }

    // جلوگیری از تغییر نقش حساب خود ادمین
    if (currentUser.id === id) {
      return NextResponse.json(
        { message: "امکان تغییر نقش حساب خودتان وجود ندارد." },
        { status: 400 }
      );
    }

    // جلوگیری از حذف آخرین ادمین
    if (targetUser.role === "ADMIN" && role === "USER") {
      const adminCount = await prisma.user.count({
        where: { role: "ADMIN" },
      });

      if (adminCount <= 1) {
        return NextResponse.json(
          { message: "امکان حذف آخرین مدیر وجود ندارد." },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      message: "نقش کاربر با موفقیت تغییر کرد.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "خطای داخلی سرور." },
      { status: 500 }
    );
  }
}
