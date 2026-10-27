import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategorySection() {
  return (
    <section className="py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            خرید بر اساس دسته‌بندی
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            محصول موردنظرت رو سریع‌تر پیدا کن.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl transition group-hover:bg-orange-100">
              🛍️
            </div>

            <h3 className="font-bold text-slate-800 transition group-hover:text-orange-600">
              {category.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {category.description}
            </p>

            <span className="mt-4 inline-block text-sm font-medium text-orange-600">
              مشاهده محصولات ←
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}