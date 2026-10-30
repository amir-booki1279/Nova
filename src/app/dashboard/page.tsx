import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold">
          داشبورد کاربری
        </h1>

        <p className="mb-2">
          سلام، {user.name} 👋
        </p>

        <p className="text-gray-600">
          ایمیل شما: {user.email}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          نقش کاربری: {user.role === "ADMIN" ? "مدیر" : "کاربر"}
        </p>
      </div>
    </main>
  );
}
