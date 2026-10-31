type StatCardProps = {
  title: string;
  value: number | string;
  description: string;
};

export default function StatCard({
  title,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-4 wrap-break-word text-2xl font-extrabold text-slate-900 sm:text-3xl">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-500 sm:text-sm">
        {description}
      </p>
    </div>
  );
}
