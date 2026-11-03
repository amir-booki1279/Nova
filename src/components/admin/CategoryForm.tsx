"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  categorySchema,
  type CategoryInput,
} from "@/lib/validation";

type CategoryFormProps = {
  category?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  };
};

export default function CategoryForm({
  category,
}: CategoryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(category);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
    },
  });

  async function onSubmit(data: CategoryInput) {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        isEditing
          ? `/api/admin/categories/${category?.id}`
          : "/api/admin/categories",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            const message = (messages as string[] | undefined)?.[0];

            if (message) {
              setError(field as keyof CategoryInput, {
                type: "server",
                message,
              });
            }
          });
        }

        toast.error(result.message ?? "عملیات ناموفق بود.");
        return;
      }

      toast.success(result.message);
      router.push("/admin/categories");
      router.refresh();
    } catch {
      toast.error("ارتباط با سرور برقرار نشد.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          نام دسته‌بندی
        </label>

        <input
          {...register("name")}
          placeholder="مثلاً موبایل"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-500"
        />

        {errors.name && (
          <p className="mt-1 text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          شناسه دسته‌بندی (Slug)
        </label>

        <input
          {...register("slug")}
          dir="ltr"
          placeholder="mobile"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left outline-none transition focus:border-orange-500"
        />

        {errors.slug && (
          <p className="mt-1 text-xs text-red-500">
            {errors.slug.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          توضیحات
        </label>

        <textarea
          {...register("description")}
          rows={4}
          placeholder="توضیح کوتاهی درباره این دسته‌بندی..."
          className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-500"
        />

        {errors.description && (
          <p className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
        >
          {isSubmitting
            ? "در حال ذخیره..."
            : isEditing
              ? "ذخیره تغییرات"
              : "ثبت دسته‌بندی"}
        </button>
      </div>
    </form>
  );
}