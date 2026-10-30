

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";
import { createSession } from "@/lib/session";


export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    console.log(loginSchema);
    

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "اطلاعات واردشده معتبر نیست",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 },
      );
    }

    const token = await createSession({
        userId : user.id,
        role : user.role
    });


    const respone= NextResponse.json({
      message: "ورود موفقیت‌آمیز بود",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    respone.cookies.set("nova-session",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==="production",
        sameSite:"lax",
        path:"/",
        maxAge : 60 * 60 * 24 * 7
    });
    return respone;

  } catch (error: unknown) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "خطایی در ورود رخ داد" },
      { status: 500 },
    );
  }
}
