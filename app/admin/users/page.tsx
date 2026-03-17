import { prisma } from "@/lib/db"

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: {
      Enrollment: true,
      courses: true,
    },
  })

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
        Users List
      </h1>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-white dark:bg-black">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Verified</th>
              <th className="p-3 text-left">Courses Enrolled</th>
              <th className="p-3 text-left">Created At</th>
            </tr>
          </thead>

          <tbody className="text-black dark:text-white">
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                <td className="p-3">{u.email}</td>

                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">
                  {u.role ?? "USER"}
                </td>

                <td className="p-3">
                  {u.emailVerified ? (
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 rounded">
                      Verified
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400 rounded">
                      Not Verified
                    </span>
                  )}
                </td>

                <td className="p-3 font-bold text-purple-600 dark:text-purple-400">
                  {u.Enrollment.length}
                </td>

                <td className="p-3 text-gray-600 dark:text-gray-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
