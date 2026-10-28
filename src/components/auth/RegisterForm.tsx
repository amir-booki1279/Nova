"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  registerSchema,
  type RegisterInput,
} from "@/lib/validation";

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterInput) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error("این ایمیل قبلاً ثبت شده است");
          return;
        }

        if (result.errors) {
          const messages = Object.values(
            result.errors as Record<string, string[] | undefined>,
          ).flat();

          toast.error(messages[0] ?? "اطلاعات واردشده معتبر نیست");
          return;
        }

        toast.error(result.message ?? "ثبت‌نام انجام نشد");
        return;
      }

      toast.success(result.message ?? "ثبت‌نام با موفقیت انجام شد");

      reset();
    } catch {
      toast.error("ارتباط با سرور برقرار نشد");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClassName =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-right outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          ساخت حساب کاربری
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          به فروشگاه NOVA خوش آمدی.
        </p>
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          نام
        </label>

        <input
          id="name"
          autoComplete="name"
          {...register("name")}
          className={inputClassName}
          placeholder="نام خود را وارد کنید"
          aria-invalid={Boolean(errors.name)}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          ایمیل
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className={inputClassName}
          placeholder="example@email.com"
          aria-invalid={Boolean(errors.email)}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          رمز عبور
        </label>

        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          className={inputClassName}
          placeholder="حداقل ۸ کاراکتر"
          aria-invalid={Boolean(errors.password)}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
      </button>
    </form>
  );
}
