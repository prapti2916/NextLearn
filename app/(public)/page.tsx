// "use client"

// import { Badge } from "@/components/ui/badge"
// import { buttonVariants } from "@/components/ui/button"
// import Link from "next/link"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// interface FeatureProps {
//   title: string
//   description: string
//   icon: string
// }

// const features: FeatureProps[] = [
//   {
//     title: "Comprehensive Courses",
//     description:
//       "Access a wide range of carefully curated courses designed by industry experts.",
//     icon: "📚",
//   },
//   {
//     title: "Interactive Learning",
//     description:
//       "Engage with interactive content, quizzes, and assessments to enhance your learning experience.",
//     icon: "🎮",
//   },
//   {
//     title: "Progress Tracking",
//     description:
//       "Monitor your progress and achievements with detailed analytics and personalized dashboards.",
//     icon: "📊",
//   },
// ]

// export default function Home() {
//   return (
//     <main className="w-full">

//       {/* ================= HERO SECTION ================= */}
//       <section className="relative py-20 text-center">
//         <div className="flex flex-col items-center justify-center space-y-8 px-6">
//           <Badge variant="outline">The Future of Online Education</Badge>

//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
//             Elevate your Learning Experience
//           </h1>

//           <p className="max-w-[700px] text-muted-foreground md:text-xl">
//             Discover a new way to learn with our modern, interactive learning
//             management system. Access high-quality courses anytime, anywhere.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 mt-8">
//             <Link href="/courses" className={buttonVariants({ size: "lg" })}>
//               Explore Courses
//             </Link>

//             <Link
//               href="/login"
//               className={buttonVariants({ size: "lg", variant: "outline" })}
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ================= FEATURES SECTION ================= */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 px-6 items-stretch">

//         {/* 3 Feature Cards */}
//         {features.map((feature, index) => (
//           <Card
//             key={index}
//             className="h-full flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
//           >
//             <CardHeader className="flex flex-col gap-3">
//               <div className="text-4xl">{feature.icon}</div>
//               <CardTitle>{feature.title}</CardTitle>
//             </CardHeader>

//             <CardContent className="mt-auto">
//               <p className="text-muted-foreground">{feature.description}</p>
//             </CardContent>
//           </Card>
//         ))}

//         {/* ================= CODE EDITOR CARD ================= */}
//         <Link href="/code-editor" className="h-full">
//           <Card className="h-full flex flex-col border-2 border-primary/40 hover:border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-gradient-to-br from-background to-muted">
            
//             <CardHeader className="flex flex-col gap-3">
//               <div className="text-4xl">💻</div>
//               <CardTitle>Live Code Editor</CardTitle>
//             </CardHeader>

//             <CardContent className="mt-auto">
//               <p className="text-muted-foreground">
//                 Practice HTML, CSS and JavaScript in real-time like CodePen.
//               </p>
//             </CardContent>

//           </Card>
//         </Link>

//       </section>

//     </main>
//   )
// }


"use client"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface FeatureProps {
  title: string
  description: string
  icon: string
}

const features: FeatureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses designed by industry experts.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assessments to enhance your learning experience.",
    icon: "🎮",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress and achievements with detailed analytics and personalized dashboards.",
    icon: "📊",
  },
]

export default function Home() {
  return (
    <main className="w-full">
      {/* HERO */}
      <section className="relative py-20 text-center">
        <div className="flex flex-col items-center justify-center space-y-8 px-6">
          <Badge variant="outline">The Future of Online Education</Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>

          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover a new way to learn with our modern, interactive learning
            management system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/courses" className={buttonVariants({ size: "lg" })}>
              Explore Courses
            </Link>

            <Link
              href="/login"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 px-6">

        {features.map((feature, index) => (
          <Card key={index} className="h-full flex flex-col hover:shadow-xl transition">
            <CardHeader>
              <div className="text-4xl">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>

            <CardContent className="mt-auto">
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}

        {/* Code Editor */}
        <Link href="/code-editor">
          <Card className="h-full border-2 border-primary/40 hover:shadow-xl transition">
            <CardHeader>
              <div className="text-4xl">💻</div>
              <CardTitle>Live Code Editor</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">
                Practice HTML, CSS and JavaScript in real-time.
              </p>
            </CardContent>
          </Card>
        </Link>

      </section>
    </main>
  )
}