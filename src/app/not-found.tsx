


import Link from "next/link";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-slate-50 px-4"
    >
      <div className="max-w-md text-center">
        <p className="text-7xl font-black text-orange-500">404</p>

        <h1 className="mt-6 text-2xl font-black text-slate-900">
          محصول موردنظر پیدا نشد!
        </h1>

        <p className="mt-4 leading-8 text-slate-500">
          ممکن است محصول حذف شده باشد یا آدرس واردشده اشتباه باشد.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    </main>
  );
}