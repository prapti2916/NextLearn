// import { Suspense } from "react";
// import { LessonSkeleton } from "./_components/LessonSkeleton";
// import { getLessonContent } from "@/app/data/course/get-lesson-content";
// import { CourseContent } from "./_components/CourseContent";
// import StickyNotes from "./_components/StickyNotes";

// interface iAppProps {
//   params: {
//     lessonId: string;
//   };
// }

// const LessonContentPage = async ({ params }: iAppProps) => {
//   const { lessonId } = params;

//   return (
//     <div className="flex flex-col gap-6 p-4">
//       {/* Lesson content with suspense */}
//       <Suspense fallback={<LessonSkeleton />}>
//         <LessonContentLoader lessonId={lessonId} />
//       </Suspense>

//       {/* Sticky Notes Section */}
//       <div className="mt-6">
//         <StickyNotes lessonId={lessonId} />
//       </div>
//     </div>
//   );
// };

// export default LessonContentPage;

// const LessonContentLoader = async ({ lessonId }: { lessonId: string }) => {
//   const data = await getLessonContent(lessonId);

//   return (
//     <div className="w-full">
//       <CourseContent data={data} />
//     </div>
//   );
// };


import { Suspense } from "react";
import { LessonSkeleton } from "./_components/LessonSkeleton";
import { getLessonContent } from "@/app/data/course/get-lesson-content";
import { CourseContent } from "./_components/CourseContent";
import StickyNotes from "./_components/StickyNotes";

interface iAppProps {
  params: Promise<{
    lessonId: string;
  }>;
}

const LessonContentPage = async ({ params }: iAppProps) => {

  // ✅ FIX: await params
  const { lessonId } = await params;

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Lesson content with suspense */}
      <Suspense fallback={<LessonSkeleton />}>
        <LessonContentLoader lessonId={lessonId} />
      </Suspense>

      {/* Sticky Notes Section */}
      <div className="mt-6">
        <StickyNotes lessonId={lessonId} />
      </div>
    </div>
  );
};

export default LessonContentPage;


// ✅ no export (safe)
const LessonContentLoader = async ({ lessonId }: { lessonId: string }) => {
  const data = await getLessonContent(lessonId);

  return (
    <div className="w-full">
      <CourseContent data={data} />
    </div>
  );
};
