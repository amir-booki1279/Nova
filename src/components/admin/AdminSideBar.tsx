import Link from "next/link";

const menuItems = [
  {
    title: "داشبورد",
    href: "/admin",
  },
  {
    title: "محصولات",
    href: "/admin/products",
  },
  {
    title: "دسته‌بندی‌ها",
    href: "/admin/categories",
  },
  {
    title: "سفارش‌ها",
    href: "/admin/orders",
  },
  {
    title: "کاربران",
    href: "/admin/users",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="min-h-screen w-64 shrink-0 border-l border-gray-200 bg-white p-5">
      <Link href="/admin" className="mb-8 block text-2xl font-extrabold">
        <span className="text-orange-500">نوا</span>{" "}
        <span className="text-slate-900">ادمین</span>
      </Link>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
