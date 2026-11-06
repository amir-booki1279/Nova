"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserRoleFormProps {
  userId: string;
  currentRole: "USER" | "ADMIN";
}

export default function UserRoleForm({
  userId,
  currentRole,
}: UserRoleFormProps) {
  const router = useRouter();

  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (role === currentRole) {
      toast.error("نقش جدیدی انتخاب نکرده‌اید.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "خطا در تغییر نقش");
      }

      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "خطای غیرمنتظره"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="mb-4 font-semibold">مدیریت نقش کاربر</h3>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "USER" | "ADMIN")
          }
          disabled={loading}
          className="h-11 flex-1 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="USER">کاربر عادی</option>
          <option value="ADMIN">مدیر سیستم</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading || role === currentRole}
          className="h-11 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading ? "در حال ثبت..." : "ثبت تغییرات"}
        </button>
      </div>
    </div>
  );
}
