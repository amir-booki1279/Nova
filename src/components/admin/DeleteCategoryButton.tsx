"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

type DeleteCategoryButtonProps = {
  categoryId: string;
  categoryName: string;
};

export default function DeleteCategoryButton({
  categoryId,
  categoryName,
}: DeleteCategoryButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `آیا از حذف دسته‌بندی «${categoryName}» مطمئنی؟`,
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const response = await fetch(
        `/api/admin/categories/${categoryId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "حذف دسته‌بندی ناموفق بود.");
        return;
      }

      toast.success(result.message);
      router.refresh();
    } catch {
      toast.error("ارتباط با سرور برقرار نشد.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      {isDeleting ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Trash2 size={16} />
      )}

      {isDeleting ? "در حال حذف..." : "حذف"}
    </button>
  );
}
