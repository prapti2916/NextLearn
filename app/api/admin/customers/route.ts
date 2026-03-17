/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma"

export async function GET() {

 const enrollments = await prisma.enrollment.findMany({
    where:{
      status:"Active"   // ✅ sirf active payment
    },
    include:{
      User:true,
      Course:true
    }
  })


  const customers = enrollments.map((e: { id: any; User: { name: any; email: any }; Course: { title: any }; createdAt: any })=>({
    id:e.id,
    name:e.User?.name || "No Name",
    email:e.User?.email,
    course:e.Course?.title,
    date:e.createdAt
  }))

  console.log("CUSTOMERS:",customers)

  return Response.json(customers)
}