// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use server"

// import { requireAdmin } from "@/app/data/admin/require-admin";
// import arcjet, { fixedWindow } from "@/lib/arcjet";
// import { prisma } from "@/lib/db";
// import { ApiResponse } from "@/lib/types";
// import { request } from "@arcjet/next";
// import { revalidatePath } from "next/cache";

// const aj = arcjet // Configuración de protección contra bots y ataques de fuerza bruta
//   .withRule(
//     fixedWindow({
//       mode: "LIVE",
//       window: "1m",
//       max: 5
//     })
//   )

// export const DeleteCourse = async(courseId: string):Promise<ApiResponse> => {
  
//   const session = await requireAdmin();

//   try {

//     const req = await request();                  // Reconstruye el objeto de la petición (ip del cliente, headers, cookies) 
//     const decision = await aj.protect(req, {      // Se pasa a arcjet la petición que recibe la action para que pase por la protección contra bots y ataques de fuerza bruta.
//       fingerprint: session?.user.id
//     });

//     if (decision.isDenied()) {
//       if (decision.reason.isRateLimit()) {
//         return {
//           status: "error",
//           message: "You have been blocked due to rate limiting"
//         }
//       } else {
//         return {
//           status: "error",
//           message: "Automated request blocked. If this is a mistake, please contact support"
//         }
//       }
//     }

//     await prisma.course.delete({
//       where: {
//         id: courseId
//       }
//     })

//     revalidatePath("/admin/courses");

//     return {
//       status: "success",
//       message: "Course deleted successfully",
//     }

//   } catch (error) {
//     return {
//       status: "error",
//       message: "Failed to delete course",
//     }
//   }

// }


"use server"

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5
  })
)

export const DeleteCourse = async (courseId: string): Promise<ApiResponse> => {

  const session = await requireAdmin();

  try {

    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have been blocked due to rate limiting"
        }
      } else {
        return {
          status: "error",
          message: "Automated request blocked. If this is a mistake, please contact support"
        }
      }
    }

    // 1️⃣ Delete comments related to course
    await prisma.comment.deleteMany({
      where: {
        courseId: courseId
      }
    });

    // 2️⃣ Delete lessons
    await prisma.lesson.deleteMany({
      where: {
        Chapter: {
          courseId: courseId
        }
      }
    });

    // 3️⃣ Delete chapters
    await prisma.chapter.deleteMany({
      where: {
        courseId: courseId
      }
    });

    // 4️⃣ Delete course
    await prisma.course.delete({
      where: {
        id: courseId
      }
    });

    revalidatePath("/admin/courses");

    return {
      status: "success",
      message: "Course deleted successfully",
    }

  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: "Failed to delete course",
    }
  }

}