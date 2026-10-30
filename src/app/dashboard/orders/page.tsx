import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

const statusLabels = {
  PENDING: "در انتظار تأیید",
  PROCESSING: "در حال آماده‌سازی",
  SHIPPED: "ارسال‌شده",
  DELIVERED: "تحویل‌شده",
  CANCELLED: "لغوشده",
};

const paymentLabels = {
  UNPAID: "پرداخت‌نشده",
  PAID: "پرداخت‌شده",
  FAILED: "پرداخت ناموفق",
  REFUNDED: "مبلغ بازگردانده‌شده",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export default async function OrdersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              image: true,
              slug: true,
            },
          },
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <main className="min-w-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          سفارش‌های من
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          وضعیت و جزئیات سفارش‌های ثبت‌شده خودت رو مشاهده کن.
        </p>
      </div>

      {orders.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <div className="mb-4 text-5xl">📦</div>

          <h2 className="text-lg font-bold text-gray-900">
            هنوز سفارشی ثبت نکردی
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-gray-500">
            وقتی خریدت رو تکمیل کنی، سفارش‌ها و وضعیت اون‌ها در این بخش نمایش داده می‌شن.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            مشاهده محصولات
          </Link>
        </section>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <article
              key={order.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    شماره سفارش
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {order.orderNumber}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "long",
                    }).format(order.createAt)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700">
                    {statusLabels[order.status]}
                  </span>

                  <span
                    className={`rounded-full px-3 py-2 text-xs font-medium ${
                      order.paymentStatus === "PAID"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {paymentLabels[order.paymentStatus]}
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-5">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-medium text-gray-800 transition hover:text-orange-600"
                      >
                        {item.product.name}
                      </Link>

                      <p className="mt-1 text-sm text-gray-500">
                        تعداد: {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-gray-900">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-gray-100 bg-gray-50 px-5 py-4">
                <span className="text-sm text-gray-600">
                  مبلغ کل سفارش
                </span>

                <span className="font-bold text-gray-900">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
