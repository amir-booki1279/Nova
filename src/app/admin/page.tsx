
import StatCard from "@/components/admin/StatCard";
import { getAdminState } from "@/lib/admin";


export default async function AdminPage() {
  const stats = await getAdminState();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          داشبورد مدیریت
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          نمای کلی وضعیت فروشگاه نوا 
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="محصولات فعال"
          value={stats.productCount.toLocaleString("fa-IR")}
          description="تعداد محصولات فعال فروشگاه"
        />

        <StatCard
          title="کاربران"
          value={stats.usersCount.toLocaleString("fa-IR")}
          description="تعداد کاربران ثبت‌شده"
        />

        <StatCard
          title="سفارش‌ها"
          value={stats.ordersCount.toLocaleString("fa-IR")}
          description="تعداد کل سفارش‌های ثبت‌شده"
        />
      </div>
    </div>
  );
}

