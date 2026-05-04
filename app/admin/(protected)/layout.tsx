import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#030a14] flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
