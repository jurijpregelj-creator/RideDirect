import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Admin — Users" }

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700",
  seller: "bg-blue-100 text-blue-700",
  buyer: "bg-gray-100 text-gray-500",
}

export default async function AdminUsersPage() {
  const supabase = createClient()
  const { data: users } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, country, created_at")
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0D2A5E]">Users</h1>
        <p className="text-sm text-gray-400 mt-1">{users?.length ?? 0} registered users</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {!users?.length ? (
          <div className="py-16 text-center text-gray-400">No users found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">User</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Country</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Role</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user: any) => (
                <tr key={user.id} className="hover:bg-blue-50/40 cursor-pointer">
                  <td className="px-4 py-3">
                    <Link href={`/admin/users/${user.id}`} className="block">
                      <div className="font-medium text-[#0D2A5E] hover:text-[#1E88E5]">{user.full_name || "—"}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <Link href={`/admin/users/${user.id}`} className="block">{user.country || "—"}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/users/${user.id}`} className="block">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[user.role] || "bg-gray-100"}`}>
                        {user.role}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    <Link href={`/admin/users/${user.id}`} className="block">
                      {new Date(user.created_at).toLocaleDateString("en-GB")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
