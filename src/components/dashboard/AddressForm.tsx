"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  addressSchema,
  type AddressInput,
} from "@/lib/validation";

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export default function AddressForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: "",
      recipient: "",
      phone: "",
      province: "",
      city: "",
      address: "",
      postalCode: "",
      isDefault: false,
    },
  });

  async function onSubmit(values: AddressInput) {
    try {
      setIsLoading(true);

      const response = await fetch("/api/user/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "ثبت آدرس ناموفق بود");
        return;
      }

      toast.success(data.message);
      router.push("/dashboard/addresses");
      router.refresh();
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            عنوان آدرس
          </label>
          <input
            id="title"
            placeholder="مثلاً خانه یا محل کار"
            {...register("title")}
            className={inputClass}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="recipient" className="mb-2 block text-sm font-medium">
            نام گیرنده
          </label>
          <input
            id="recipient"
            {...register("recipient")}
            className={inputClass}
          />
          {errors.recipient && (
            <p className="mt-1 text-sm text-red-500">
              {errors.recipient.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            شماره موبایل
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            placeholder="09123456789"
            {...register("phone")}
            className={inputClass}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="province" className="mb-2 block text-sm font-medium">
            استان
          </label>
          <input
            id="province"
            {...register("province")}
            className={inputClass}
          />
          {errors.province && (
            <p className="mt-1 text-sm text-red-500">
              {errors.province.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="mb-2 block text-sm font-medium">
            شهر
          </label>
          <input
            id="city"
            {...register("city")}
            className={inputClass}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="mb-2 block text-sm font-medium"
          >
            کد پستی
          </label>
          <input
            id="postalCode"
            inputMode="numeric"
            {...register("postalCode")}
            className={inputClass}
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="address" className="mb-2 block text-sm font-medium">
          نشانی کامل
        </label>
        <textarea
          id="address"
          rows={4}
          {...register("address")}
          className={inputClass}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-50 p-4">
        <input
          type="checkbox"
          {...register("isDefault")}
          className="h-4 w-4 accent-orange-500"
        />
        <span className="text-sm text-gray-700">
          این آدرس، آدرس پیش‌فرض من باشد.
        </span>
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
      >
        {isLoading ? "در حال ثبت..." : "ثبت آدرس"}
      </button>
    </form>
  );
}
