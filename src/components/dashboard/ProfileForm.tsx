"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/lib/validation";

type ProfileFormProps = {
  name: string;
  email: string;
};

export default function ProfileForm({
  name,
  email,
}: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name,
    },
  });

  async function onSubmit(values: UpdateProfileInput) {
    try {
      setIsLoading(true);

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "به‌روزرسانی ناموفق بود");
        return;
      }

      toast.success(data.message);

      router.refresh();
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          نام و نام خانوادگی
        </label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />

        {errors.name && (
          <p className="mt-2 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          ایمیل
        </label>

        <input
          id="email"
          type="email"
          value={email}
          disabled
          className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
        />

        <p className="mt-2 text-xs text-gray-500">
          تغییر ایمیل را در بخش تنظیمات حساب پیاده‌سازی خواهیم کرد.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !isDirty}
        className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </form>
  );
}
