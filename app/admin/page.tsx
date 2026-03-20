/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
// import { SectionCards } from "@/components/sidebar/section-cards";
// import Link from "next/link";
// import { buttonVariants } from "@/components/ui/button";
// import { EmptyState } from "@/components/general/EmptyState";
// import { AdminCourseCard, AdminCourseCardSkeleton } from "./courses/_components/AdminCourseCard";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { Suspense } from "react";
// import { adminGetRecentCourses } from "../data/admin/admin-get-recent-courses";
// import { adminGetEnrollmentStats } from "../data/admin/admin-get-enrollment-stats";


// export default async function AdminIndexPage() {

//   const enrollmentData = await adminGetEnrollmentStats();

//   return (
//     <>
//       <SectionCards />

//       <ChartAreaInteractive data={enrollmentData} />    

//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold">
//             Recent Courses
//           </h2>
//           <Link
//             className={buttonVariants({
//               variant: "outline",
//             })}
//             href="/admin/courses"
//           >
//             View All Courses
//           </Link>
//         </div>

//         <Suspense fallback={<RenderRecentCoursesSkeletonLayout />}>
//           <RenderRecentCourses />
//         </Suspense>
//       </div>
//     </>
//   )
// }


// const RenderRecentCourses = async() => {
  
//   const data = await adminGetRecentCourses();
//   if(data.length === 0) {
//     return (
//       <EmptyState 
//         buttonText="Create a new Course"
//         description="You haven't created any courses yet. Create some to see them here."
//         title="You dont have any Courses yet!"
//         href="/admin/courses/create"
//       />
//     )
//   }

//   return (
//     <div className="relative px-12">
//       <Carousel
//         opts={{
//           align: "start",
//           loop: true,
//         }}
//         className="w-full"
//       >
//         <CarouselContent>
//           {data.map((course) => (
//             <CarouselItem key={course.id} className="md:basis-1/2">
//               <AdminCourseCard data={course} />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   )
// }

// const RenderRecentCoursesSkeletonLayout = async() => {
//   return (
//     <div className="relative px-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {Array.from({ length: 2 }).map((_, index) => (
//           <AdminCourseCardSkeleton key={index} />  
//         ))}
//       </div>
//     </div>
// )}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookie } from "better-auth/cookies";

import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/general/EmptyState";
import { AdminCourseCard, AdminCourseCardSkeleton } from "./courses/_components/AdminCourseCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Suspense } from "react";
import { adminGetRecentCourses } from "../data/admin/admin-get-recent-courses";
import { adminGetEnrollmentStats } from "../data/admin/admin-get-enrollment-stats";

export default async function AdminPage() {
  // -------------------------
  // Server-side session check
  // -------------------------
  const cookieStore = await cookies(); // ⚠️ Must await
  const requestCookies: Record<string, string> = {};
  cookieStore.getAll().forEach(c => (requestCookies[c.name] = c.value));

  const session = getSessionCookie({ cookies: requestCookies } as any);

  if (!session) {
    redirect("/login"); // Not logged in → redirect
  }

  // -------------------------
  // Fetch enrollment stats
  // -------------------------
  const enrollmentData = await adminGetEnrollmentStats();

  return (
    <>
      <SectionCards />

      <ChartAreaInteractive data={enrollmentData} />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/admin/courses"
          >
            View All Courses
          </Link>
        </div>

        {/* Recent Courses Carousel */}
        <Suspense fallback={<RenderRecentCoursesSkeletonLayout />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
}

// -------------------------
// Fetch and render recent courses
// -------------------------
const RenderRecentCourses = async () => {
  const data = await adminGetRecentCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        buttonText="Create a new Course"
        description="You haven't created any courses yet. Create some to see them here."
        title="You don't have any Courses yet!"
        href="/admin/courses/create"
      />
    );
  }

  return (
    <div className="relative px-4 md:px-12">
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {data.map(course => (
            <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
              <AdminCourseCard data={course} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

// -------------------------
// Synchronous fallback for Suspense
// -------------------------
const RenderRecentCoursesSkeletonLayout = () => {
  return (
    <div className="relative px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <AdminCourseCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};