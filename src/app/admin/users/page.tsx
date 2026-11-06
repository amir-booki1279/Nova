import Link from "next/link";
import { getAdminUsers } from "@/lib/admin-users";

const roleLabels = {
  USER: "کاربر",
  ADMIN: "مدیر",
};

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">مدیریت کاربران</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          مشاهده و مدیریت کاربران فروشگاه
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">
          تعداد کل کاربران
        </p>
        <p className="mt-2 text-2xl font-bold">
          {users.length.toLocaleString("fa-IR")}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-right">نام</th>
                <th className="p-4 text-right">ایمیل</th>
                <th className="p-4 text-right">نقش</th>
                <th className="p-4 text-right">تعداد سفارش‌ها</th>
                <th className="p-4 text-right">تاریخ عضویت</th>
                <th className="p-4 text-right">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td className="p-4" dir="ltr">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        user.role === "ADMIN"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {roleLabels[user.role]}
                    </span>
                  </td>

                  <td className="p-4">
                    {user._count.orders.toLocaleString("fa-IR")}
                  </td>

                  <td className="p-4">
                    {new Date(user.createAt).toLocaleDateString("fa-IR")}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-primary hover:underline"
                    >
                      مشاهده جزئیات
                    </Link>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-muted-foreground"
                  >
                    کاربری ثبت نشده است.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
