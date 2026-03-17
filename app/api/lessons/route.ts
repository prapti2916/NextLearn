import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  const lessons = await prisma.lesson.count();
  return NextResponse.json({ totalLessons: lessons });
}
