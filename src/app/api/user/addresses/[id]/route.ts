import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { addressSchema } from "@/lib/validation";

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

    const { id } = await params;
    const body: unknown = await request.json();
    const validation = addressSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "اطلاعات واردشده معتبر نیست.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const existingAddress = await prisma.address.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingAddress) {
      return NextResponse.json(
        { message: "آدرس موردنظر پیدا نشد." },
        { status: 404 },
      );
    }

    const { isDefault, ...addressData } = validation.data;

    const updatedAddress = await prisma.$transaction(async (tx) => {
      if (isDefault) {
        await tx.address.updateMany({
          where: {
            userId: user.id,
            isDefault: true,
            id: { not: id },
          },
          data: { isDefault: false },
        });
      }

      return tx.address.update({
        where: { id },
        data: {
          ...addressData,
          isDefault,
        },
      });
    });

    return NextResponse.json({
      message: "آدرس با موفقیت ویرایش شد.",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Update address error:", error);

    return NextResponse.json(
      { message: "خطا در ویرایش آدرس." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
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

    const { id } = await params;

    const address = await prisma.address.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!address) {
      return NextResponse.json(
        { message: "آدرس موردنظر پیدا نشد." },
        { status: 404 },
      );
    }

    await prisma.address.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "آدرس با موفقیت حذف شد.",
    });
  } catch (error) {
    console.error("Delete address error:", error);

    return NextResponse.json(
      { message: "خطا در حذف آدرس." },
      { status: 500 },
    );
  }
}
