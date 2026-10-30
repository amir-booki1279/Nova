import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { updateProfileSchema } from "@/lib/validation";

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "برای انجام این عملیات باید وارد حساب شوید" },
        { status: 401 },
      );
    }

    const body: unknown = await request.json();

    const result = updateProfileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "اطلاعات واردشده معتبر نیست",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: result.data.name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      message: "اطلاعات حساب با موفقیت به‌روزرسانی شد",
      user: updatedUser,
    });
  } catch (error: unknown) {
    console.error("Update profile error:", error);

    return NextResponse.json(
      { message: "خطایی هنگام به‌روزرسانی اطلاعات رخ داد" },
      { status: 500 },
    );
  }
}
