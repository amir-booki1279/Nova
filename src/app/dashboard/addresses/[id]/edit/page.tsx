import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import AddressForm from "@/components/dashboard/AddressForm";

type EditAddressPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditAddressPage({
  params,
}: EditAddressPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const address = await prisma.address.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!address) {
    notFound();
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">
        ویرایش آدرس
      </h1>

      <p className="mt-2 mb-6 text-sm text-gray-500">
        اطلاعات آدرس خود را ویرایش کنید.
      </p>

      <AddressForm initialData={address} />
    </section>
  );
}
