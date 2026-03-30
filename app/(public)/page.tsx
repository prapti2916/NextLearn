// "use client";

// import { Badge } from "@/components/ui/badge";
// import { buttonVariants } from "@/components/ui/button";
// import Link from "next/link";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// interface FeatureProps {
//   title: string;
//   description: string;
//   icon: string;
// }

// const features: FeatureProps[] = [
//   {
//     title: "Comprehensive Courses",
//     description:
//       "Access a wide range of carefully courses designed by indrustry experts.",
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
//   {
//     title: "Community Support",
//     description:
//       "Connect with fellow learners, instructors, and industry experts for peer-to-peer support and collaboration.",
//     icon: "👥",
//   },
// ];

// export default function Home() {
//   return (
//     <>
//       <section className="relative py-20">
//         <div className="flex flex-col items-center justify-center space-y-8">
//           <Badge variant="outline">The Future of Online Education</Badge>
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
//             Elevate your Learning Experience
//           </h1>
//           <p className="max-w-[700px] text-muted-foreground text-center md:text-xl">
//             Discover a new way to learn with our modern, interactive learning
//             management system. Access high-quality courses anytime, anywhere.
//           </p>

//           {/* ✅ Buttons section */}
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

//       {/* ✅ Features section */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
//         {features.map((feature, index) => (
//           <Card key={index} className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="text-4xl mb-4">{feature.icon}</div>
//               <CardTitle>{feature.title}</CardTitle>
//               <CardContent>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </CardContent>
//             </CardHeader>
//           </Card>
//         ))}
//       </section>
//     </>
//   );
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

      {/* ================= HERO SECTION ================= */}
      <section className="relative py-20 text-center">
        <div className="flex flex-col items-center justify-center space-y-8 px-6">
          <Badge variant="outline">The Future of Online Education</Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>

          <p className="max-w-175 text-muted-foreground md:text-xl">
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses anytime, anywhere.
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

      {/* ================= FEATURES SECTION ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 px-6 items-stretch">

        {/* 3 Feature Cards */}
        {features.map((feature, index) => (
          <Card
            key={index}
            className="h-full flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <CardHeader className="flex flex-col gap-3">
              <div className="text-4xl">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>

            <CardContent className="mt-auto">
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}

        {/* ================= CODE EDITOR CARD ================= */}
        <Link href="/code-editor" className="h-full">
          <Card className="h-full flex flex-col border-2 border-primary/40 hover:border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-linear-to-br from-background to-muted">
            
            <CardHeader className="flex flex-col gap-3">
              <div className="text-4xl">💻</div>
              <CardTitle>Live Code Editor</CardTitle>
            </CardHeader>

            <CardContent className="mt-auto">
              <p className="text-muted-foreground">
                Practice HTML, CSS and JavaScript in real-time like CodePen.
              </p>
            </CardContent>

          </Card>
        </Link>

      </section>

    </main>
  )
}
