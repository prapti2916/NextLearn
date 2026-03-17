/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"

export default function CustomersPage() {

  const [customers, setCustomers] = useState<any[]>([])

  useEffect(() => {

    fetch("/api/admin/customers")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data)
        setCustomers(data)
      })

  }, [])

  return (
    <div className="p-8 text-white">

      <h1 className="text-2xl font-bold mb-6">
        Customers
      </h1>

      <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#0f1c2e] text-white">
            <tr>
              <th className="py-2 px-3 text-left">No</th>
              <th className="py-2 px-3 text-left">Email</th>
              <th className="py-2 px-3 text-left">Course</th>
              <th className="py-2 px-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>

            {customers.map((c: any, index: number) => (
              <tr
                key={c.id}
                className="border-t border-gray-800 hover:bg-gray-900"
              >

                <td className="py-2 px-3 text-gray-400">
                  {index + 1}
                </td>

                <td className="py-2 px-3">
                  {c.email}
                </td>

                <td className="py-2 px-3 text-purple-400">
                  {c.course}
                </td>

                <td className="py-2 px-3 text-gray-400">
                  {new Date(c.date).toLocaleDateString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}