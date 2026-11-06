import { notFound } from "next/navigation";
import Link from "next/link";
import { getAdminUserById } from "@/lib/admin-users";
import UserRoleForm from "@/components/admin/UserRoleForm";

export default async function AdminUserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getAdminUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/users"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          ← بازگشت به کاربران
        </Link>

        <h1 className="mt-4 text-2xl font-bold">
          جزئیات کاربر
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          مشاهده اطلاعات و مدیریت دسترسی کاربر
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="نام کاربر" value={user.name} />

        <InfoCard title="ایمیل" value={user.email} />

        <InfoCard
          title="نقش"
          value={user.role === "ADMIN" ? "مدیر سیستم" : "کاربر عادی"}
        />

        <InfoCard
          title="تعداد سفارش‌ها"
          value={user._count.orders.toString()}
        />

        <InfoCard
          title="تعداد آدرس‌ها"
          value={user._count.addresses.toString()}
        />

        <InfoCard
          title="تاریخ عضویت"
          value={new Date(user.createAt).toLocaleDateString("fa-IR")}
        />
      </div>

      <UserRoleForm
        userId={user.id}
        currentRole={user.role}
      />
    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-3 font-semibold">{value}</p>
    </div>
  );
}
