import DeleteAddressButton from "@/components/dashboard/DeleteAddressButton";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function AddressesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const addresses = await prisma.address.findMany({
    where: {
      userId: user.id,
    },
    orderBy: [
      {
        isDefault: "desc",
      },
      {
        createAt: "desc",
      },
    ],
  });

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">آدرس‌های من</h1>

          <p className="mt-2 text-sm text-gray-500">
            آدرس‌های ارسال سفارش‌های خود را مدیریت کنید.
          </p>
        </div>
         <div className="flex gap-3">
           <Link href={'/dashboard/addresses/new'}
          className="rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold
          text-white transition hover:bg-orange-600">
                  افزودن آدرس +
          </Link>
        <Link
          href="/dashboard"
          className="rounded-xl border px-4 py-3 text-sm transition hover:bg-gray-50"
        >
          بازگشت به داشبورد
        </Link>
         </div>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold">
            هنوز آدرسی ثبت نکرده‌اید
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            در مرحله بعد می‌توانید آدرس جدیدی اضافه کنید.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <article
              key={address.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-bold">{address.title}</h2>

                {address.isDefault && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    آدرس پیش‌فرض
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600">
                گیرنده: {address.recipient}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                تلفن: {address.phone}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                استان {address.province}، شهر {address.city}
              </p>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                {address.address}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                کد پستی: {address.postalCode}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/dashboard/addresses/${address.id}/edit`}
              className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              ویرایش آدرس
            </Link>

            <DeleteAddressButton addressId={address.id} />
</div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
