import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import AddressForm from "@/components/dashboard/AddressForm";

export default async function NewAddressPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-w-0">
      <div className="mb-6">
        <Link
          href="/dashboard/addresses"
          className="text-sm text-orange-600 hover:text-orange-700"
        >
          ← بازگشت به آدرس‌ها
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          افزودن آدرس جدید
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          اطلاعات آدرس و گیرنده سفارش رو وارد کن.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
        <AddressForm />
      </section>
    </main>
  );
}
