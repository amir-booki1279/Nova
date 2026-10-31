import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSideBar";
import AdminMobileSidebar from "@/components/admin/AdminMobileSideBar";


type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  await requireAdmin();

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
          <div className="hidden md:block">
        <AdminSidebar />

          </div>
        <div className="min-w-0 flex-1">
          <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white
          px-4 md:px-8">
           <div className="flex items-center gap-3">
            <AdminMobileSidebar/>
             <h2 className="font-semibold text-slate-800">
              مدیریت فروشگاه
            </h2>
           </div>

            <span className="hidden text-sm text-slate-500 sm:block">
              فروشگاه نوا 
            </span>
          </header>

          <main className="p-6 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
