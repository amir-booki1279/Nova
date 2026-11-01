"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createProductSchema,
  type CreateProductInput,
} from "@/lib/validation";

type CategoryOption = {
  id: string;
  name: string;
};

type ProductFormProps = {
  categories: CategoryOption[];
};

export default function ProductForm({ categories }: ProductFormProps) {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      stock: 0,
      image: "",
      categoryId: "",
    },
  });

  async function onSubmit(values: CreateProductInput) {
    setIsSubmitting(true);
    setServerErrors({});

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const messages: Record<string, string> = {};

          for (const [field, fieldErrors] of Object.entries(
            result.errors as Record<string, string[] | undefined>,
          )) {
            if (fieldErrors?.[0]) {
              messages[field] = fieldErrors[0];
            }
          }

          setServerErrors(messages);
        }

        toast.error(result.message ?? "ثبت محصول ناموفق بود.");
        return;
      }

      toast.success(result.message ?? "محصول با موفقیت ثبت شد.");
      router.push("/admin/products");
      router.refresh();
    } catch {
      toast.error("ارتباط با سرور برقرار نشد.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">نام محصول</label>
          <input
            {...register("name")}
            className={inputClass}
            placeholder="مثلاً گوشی موبایل"
          />
          <p className="mt-1 text-xs text-red-500">
            {errors.name?.message ?? serverErrors.name}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">شناسه محصول (Slug)</label>
          <input
            {...register("slug")}
            dir="ltr"
            className={inputClass}
            placeholder="mobile-phone"
          />
          <p className="mt-1 text-xs text-red-500">
            {errors.slug?.message ?? serverErrors.slug}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">قیمت (تومان)</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-red-500">
            {errors.price?.message ?? serverErrors.price}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">درصد تخفیف</label>
          <input
            type="number"
            {...register("discountPercentage", { valueAsNumber: true })}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-red-500">
            {errors.discountPercentage?.message ??
              serverErrors.discountPercentage}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">موجودی</label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-red-500">
            {errors.stock?.message ?? serverErrors.stock}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">دسته‌بندی</label>
          <select {...register("categoryId")} className={inputClass}>
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-red-500">
            {errors.categoryId?.message ?? serverErrors.categoryId}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">آدرس تصویر</label>
          <input
            {...register("image")}
            dir="ltr"
            className={inputClass}
            placeholder="/images/products/mobile.webp"
          />
          <p className="mt-1 text-xs text-red-500">
            {errors.image?.message ?? serverErrors.image}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">توضیحات</label>
          <textarea
            {...register("description")}
            rows={5}
            className={inputClass}
            placeholder="توضیحات محصول..."
          />
          <p className="mt-1 text-xs text-red-500">
            {errors.description?.message ?? serverErrors.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت محصول"}
        </button>
      </div>
    </form>
  );
}
