"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OrderStatus } from "@/generated/prisma/enums";

const statusOptions: {
  value: OrderStatus;
  label: string;
}[] = [
  { value: "PENDING", label: "در انتظار بررسی" },
  { value: "PROCESSING", label: "در حال پردازش" },
  { value: "SHIPPED", label: "ارسال شده" },
  { value: "DELIVERED", label: "تحویل داده شده" },
  { value: "CANCELLED", label: "لغو شده" },
];

interface OrderStatusFormProps {
  orderId: string;
  currentStatus: OrderStatus;
}

export default function OrderStatusForm({
  orderId,
  currentStatus,
}: OrderStatusFormProps) {
  const router = useRouter();

  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (status === currentStatus) {
      toast.error("وضعیت جدیدی انتخاب نکرده‌اید.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "خطا در تغییر وضعیت");
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
  };

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="mb-4 font-semibold">مدیریت وضعیت سفارش</h3>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
          disabled={loading}
          className="h-11 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading || status === currentStatus}
          className="h-11 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "در حال ثبت..." : "ثبت تغییرات"}
        </button>
      </div>
    </div>
  );
}
