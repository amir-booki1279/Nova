"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeleteAddressButtonProps = {
  addressId: string;
};

export default function DeleteAddressButton({
  addressId,
}: DeleteAddressButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "آیا از حذف این آدرس مطمئن هستید؟",
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const response = await fetch(
        `/api/user/addresses/${addressId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "حذف آدرس ناموفق بود.");
      }

      toast.success("آدرس با موفقیت حذف شد.");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "خطایی در حذف آدرس رخ داد.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "در حال حذف..." : "حذف آدرس"}
    </button>
  );
}
