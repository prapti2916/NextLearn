/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"

export default function LessonsPage() {

const [courses,setCourses] = useState<any[]>([])
const [openLesson,setOpenLesson] = useState<any>(null)

useEffect(()=>{

fetch("/api/admin/lessons")
.then(res=>res.json())
.then(data=>{
setCourses(data)
})

},[])



const getText = (desc: any) => {
  try {
    const parsed = typeof desc === "string" ? JSON.parse(desc) : desc

    const paragraphs = parsed?.content
      ?.filter((node: any) => node.type === "paragraph")
      ?.map((node: any) =>
        node?.content?.map((c: any) => c.text).join("")
      )

    return paragraphs?.join(" ") || "No description"
  } catch {
    return desc || "No description"
  }
}



return (

<div className="min-h-screen p-8 bg-white dark:bg-black text-black dark:text-white">

<h1 className="text-3xl font-bold mb-8">
Courses
</h1>


{/* GRID */}

<div className="grid md:grid-cols-2 gap-6">

{courses?.map((course:any)=>(

<div
key={course.id}
className="border border-gray-200 dark:border-neutral-800 rounded-xl p-6 bg-white dark:bg-neutral-900 shadow-sm"
>

<h2 className="text-xl font-semibold mb-4">
{course.title}
</h2>


{course.chapter?.map((chap:any)=>(

<div key={chap.id} className="mb-5">

<h3 className="font-medium mb-2 opacity-80">
{chap.title}
</h3>


<div className="space-y-2">

{chap.lessons?.map((lesson:any)=>{

const active = openLesson?.id===lesson.id

return(

<div key={lesson.id}>

<div
onClick={()=>setOpenLesson(active ? null : lesson)}
className={`cursor-pointer p-2 rounded text-sm

${active
? "bg-black text-white dark:bg-white dark:text-black"
: "bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700"}

`}
>

{lesson.title}

</div>


{/* DESCRIPTION */}

{active && (

<div className="mt-2 text-sm text-gray-700 dark:text-gray-300 p-3 border border-gray-200 dark:border-neutral-800 rounded">

{getText(lesson.description)}

</div>

)}

</div>

)

})}

</div>

</div>

))}

</div>

))}

</div>

</div>

)

}