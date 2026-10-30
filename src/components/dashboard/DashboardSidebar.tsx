"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "داشبورد",
    href: "/dashboard",
    icon: "🏠",
  },
  {
    title: "اطلاعات حساب",
    href: "/dashboard/profile",
    icon: "👤",
  },
  {
    title: "سفارش‌های من",
    href: "/dashboard/orders",
    icon: "📦",
  },
  {
    title: "آدرس‌های من",
    href: "/dashboard/addresses",
    icon: "📍",
  },
  {
    title: "علاقه‌مندی‌ها",
    href: "/favorites",
    icon: "❤️",
  },
  {
    title: "سبد خرید",
    href: "/cart",
    icon: "🛒",
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-5 border-b border-gray-100 px-3 pb-4">
        <Link href="/" className="text-xl font-black tracking-wide">
          <span className="text-orange-500">NOVA</span>
          <span className="text-slate-900"> Commerce</span>
        </Link>

        <p className="mt-2 text-xs text-gray-500">
          پنل مدیریت حساب کاربری
        </p>
      </div>

      <nav aria-label="منوی داشبورد" className="space-y-1">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-lg">{item.icon}</span>

              <span>{item.title}</span>

              {isActive && (
                <span className="mr-auto h-2 w-2 rounded-full bg-orange-500" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">
          نیاز به خرید داری؟
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          محصولات جدید فروشگاه رو مشاهده کن.
        </p>

        <Link
          href="/products"
          className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          مشاهده محصولات ←
        </Link>
      </div>
    </aside>
  );
}
