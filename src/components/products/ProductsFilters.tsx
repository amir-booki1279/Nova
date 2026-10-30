"use client";

import { useMemo, useState } from "react";

import ProductCard from "@/components/products/ProductCard";

import { DbProduct } from "@/lib/db-products";

export default function ProductFilters({
  products,
}: {
  products: DbProduct[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه");
  const [sort, setSort] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const categories = [
    "همه",
    ...new Set(products.map((product) => product.category.name)),
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "همه" || product.category.name === category;

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      const matchesStock = !onlyAvailable || product.stock > 0;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesStock
      );
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [products, search, category, sort, minPrice, maxPrice, onlyAvailable]);

  function resetFilters() {
    setSearch("");
    setCategory("همه");
    setSort("default");
    setMinPrice("");
    setMaxPrice("");
    setOnlyAvailable(false);
  }

  return (
    <section>
      {/* جست‌وجو و مرتب‌سازی */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="جست‌وجوی محصول..."
          aria-label="جست‌وجوی محصول"
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="دسته‌بندی"
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          aria-label="مرتب‌سازی"
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
        >
          <option value="default">مرتب‌سازی پیش‌فرض</option>
          <option value="price-asc">ارزان‌ترین</option>
          <option value="price-desc">گران‌ترین</option>
          <option value="rating">بالاترین امتیاز</option>
        </select>
      </div>

      {/* فیلتر قیمت */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 font-bold text-slate-800">محدوده قیمت (تومان)</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="حداقل قیمت"
            aria-label="حداقل قیمت"
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
          />

          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="حداکثر قیمت"
            aria-label="حداکثر قیمت"
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(event) => setOnlyAvailable(event.target.checked)}
            className="h-4 w-4 accent-orange-500"
          />
          فقط کالاهای موجود
        </label>

        <button
          type="button"
          onClick={resetFilters}
          className="mt-5 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
        >
          پاک کردن فیلترها
        </button>
      </div>

      {/* نتایج */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-bold text-slate-800">محصولات فروشگاه</h2>

        <span className="text-sm text-slate-500">
          {filteredProducts.length.toLocaleString("fa-IR")} محصول
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
          <p className="font-bold text-slate-700">
            محصولی با این مشخصات پیدا نشد.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            فیلترها رو تغییر بده یا پاک کن.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}