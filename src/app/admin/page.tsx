import { requireAdmin } from "@/lib/auth"


async function AdminPage() {
    const user = await requireAdmin();
  return (
    <div>
      {user.name}
    </div>
  )
}

export default AdminPage
