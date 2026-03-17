import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(){

  const courses = await prisma.course.findMany({
    select:{
      createdAt:true
    }
  })

  const monthlyData = new Array(12).fill(0)

  courses.forEach((course: { createdAt: string | number | Date })=>{
    const month = new Date(course.createdAt).getMonth()
    monthlyData[month]++
  })

  return NextResponse.json(monthlyData)
}