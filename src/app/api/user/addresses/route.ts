import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { addressSchema } from "@/lib/validation";


export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "برای ثبت آدرس ابتدا وارد حساب شوید" },
        { status: 401 },
      );
    }

    const body: unknown = await request.json();
    const result = addressSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "اطلاعات آدرس معتبر نیست",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { isDefault, ...addressData } = result.data;

    const address = await prisma.$transaction(async (tx) => {
      if (isDefault) {
        await tx.address.updateMany({
          where: { userId: user.id, isDefault: true },
          data: { isDefault: false },
        });
      }

      return tx.address.create({
        data: {
          ...addressData,
          userId: user.id,
          isDefault,
        },
      });
    });

    return NextResponse.json(
      {
        message: "آدرس با موفقیت ثبت شد",
        address,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Create address error:", error);

    return NextResponse.json(
      { message: "خطایی هنگام ثبت آدرس رخ داد" },
      { status: 500 },
    );
  }
}
