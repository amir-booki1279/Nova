"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const menuItems = [
  { title: "داشبورد", href: "/admin" },
  { title: "محصولات", href: "/admin/products" },
  { title: "دسته‌بندی‌ها", href: "/admin/categories" },
  { title: "سفارش‌ها", href: "/admin/orders" },
  { title: "کاربران", href: "/admin/users" },
];

export default function AdminMobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={isOpen}
        className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="بستن منو"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />

          <aside className="fixed inset-y-0 right-0 z-50 w-64 max-w-[85vw] border-l border-gray-200 bg-white p-5 shadow-xl">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="mb-8 block text-2xl font-extrabold"
            >
              <span className="text-orange-500">NOVA</span>{" "}
              <span className="text-slate-900">Admin</span>
            </Link>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}
    </div>
  );
}
