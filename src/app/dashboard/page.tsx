
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/auth/LogoutButton";

const dashboardLinks = [
  {
    title: "اطلاعات حساب",
    description: "مشاهده و ویرایش اطلاعات شخصی",
    href: "/dashboard/profile",
    icon: "👤",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "سفارش‌های من",
    description: "پیگیری سفارش‌ها و وضعیت خریدها",
    href: "/dashboard/orders",
    icon: "📦",
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "آدرس‌های من",
    description: "مدیریت آدرس‌های ارسال سفارش",
    href: "/dashboard/addresses",
    icon: "📍",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "علاقه‌مندی‌ها",
    description: "محصولات موردعلاقه شما",
    href: "/favorites",
    icon: "❤️",
    color: "bg-pink-50 text-pink-600",
  },
  {
    title: "سبد خرید",
    description: "مشاهده محصولات انتخاب‌شده",
    href: "/cart",
    icon: "🛒",
    color: "bg-purple-50 text-purple-600",
  },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-orange-600">
            خانه
          </Link>

          <span>/</span>

          <span className="font-medium text-gray-900">
            داشبورد کاربری
          </span>
        </div>

        {/* Welcome */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-slate-900 p-6 text-white sm:p-10">
          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-orange-300">
                پنل کاربری NOVA
              </span>

              <h1 className="text-2xl font-bold sm:text-3xl">
                سلام، {user.name} 👋
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
                به پنل کاربری خودت خوش اومدی. از اینجا می‌تونی
                سفارش‌ها، آدرس‌ها و اطلاعات حسابت رو مدیریت کنی.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                مشاهده محصولات
              </Link>

              <LogoutButton />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -left-12 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
          />
        </section>

        {/* Account Summary */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">نام کاربر</p>

            <p className="mt-3 font-bold text-gray-900">
              {user.name}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">ایمیل حساب</p>

            <p className="mt-3 break-all font-bold text-gray-900">
              {user.email}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">نوع حساب</p>

            <p className="mt-3 font-bold text-gray-900">
              {user.role === "ADMIN" ? "مدیر فروشگاه" : "کاربر فروشگاه"}
            </p>
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              دسترسی سریع
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              از بخش موردنظرت برای مدیریت حساب استفاده کن.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${item.color}`}
                  >
                    {item.icon}
                  </div>

                  <span className="text-xl text-gray-300 transition group-hover:-translate-x-1 group-hover:text-orange-500">
                    ←
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 transition group-hover:text-orange-600">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          مدیریت آسان خریدها با{" "}
          <span className="font-bold text-orange-600">
            NOVA Commerce
          </span>
        </div>
      </div>
    </main>
  );
}
