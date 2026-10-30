import { NextResponse } from "next/server";

export async function POST() {
  
    const response= NextResponse.json({
      message: "با موفقیت از حساب کاربری خارج شدید",
     
    });

    response.cookies.set("nova-session",'',{
        httpOnly:true,
        secure:process.env.NODE_ENV ==="production",
        sameSite:"lax",
        path:"/",
        maxAge : 0
    });
    return response;

 
}