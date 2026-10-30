import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-w-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          اطلاعات حساب کاربری
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          اطلاعات شخصی خودت رو مشاهده و ویرایش کن.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6 border-b border-gray-100 pb-5">
          <h2 className="text-lg font-bold">
            مشخصات شخصی
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات جدید بعد از ذخیره در حساب کاربری ثبت می‌شن.
          </p>
        </div>

        <ProfileForm
          name={user.name}
          email={user.email}
        />
      </section>
    </main>
  );
}
