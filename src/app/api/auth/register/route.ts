
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";


export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "اطلاعات واردشده معتبر نیست",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, password } = result.data;

    const normalizedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "این ایمیل قبلاً ثبت شده است" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "ثبت‌نام با موفقیت انجام شد",
        user,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "اطلاعات ورودی معتبر نیست" },
        { status: 400 },
      );
    }

    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "خطایی در ثبت‌نام رخ داد" },
      { status: 500 },
    );
  }
}
