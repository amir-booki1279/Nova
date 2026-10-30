import LoginForm from "@/components/auth/loginForm";
import Link from "next/link";

// {
    
//     "email": "amir.booki123@gmail.com",
//     "password": "12345677777"
// }   
export default function LoginPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">ورود به NOVA </h1>

          <p className="mt-2 text-sm text-gray-500">
            برای ورود، اطلاعات حساب کاربری خود را وارد کنید.
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-gray-600">
          هنوز حساب کاربری ندارید؟{" "}
          <Link
            href="/register"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </main>
  );
}
