import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { OrderStatus } from "@/generated/prisma/enums";


const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری شوید." },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "شما دسترسی لازم را ندارید." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const newStatus = body.status as OrderStatus;

    if (!Object.values(OrderStatus).includes(newStatus)) {
      return NextResponse.json(
        { message: "وضعیت سفارش معتبر نیست." },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return NextResponse.json(
        { message: "سفارش پیدا نشد." },
        { status: 404 }
      );
    }

    const allowedStatuses = allowedTransitions[order.status];

    if (!allowedStatuses.includes(newStatus)) {
      return NextResponse.json(
        { message: "تغییر وضعیت سفارش مجاز نیست." },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: newStatus,
      },
    });

    return NextResponse.json({
      message: "وضعیت سفارش با موفقیت تغییر کرد.",
      order: updatedOrder,
    });
  } catch {
    return NextResponse.json(
      { message: "خطای داخلی سرور." },
      { status: 500 }
    );
  }
}
