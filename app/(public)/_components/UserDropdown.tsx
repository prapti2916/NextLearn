// /* eslint-disable @typescript-eslint/no-unused-vars */

// import {
//   BookOpen,
//   ChevronDownIcon,
//   Home,
//   LayoutDashboardIcon,
//   LogOutIcon,
// } from "lucide-react"

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import Link from "next/link"

// import { useRouter } from "next/navigation"

// import { useSignout } from "@/hooks/use-signout"

// interface iAppProps {
//   name: string;
//   email: string;
//   image: string;
// }


// export function UserDropdown({ name, email, image }: iAppProps) {

//   const router = useRouter()
//   const handleSignOut = useSignout()
  

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
//           <Avatar>
//             <AvatarImage src={image} alt="Profile image" />
//             <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
//           </Avatar>
//           <ChevronDownIcon
//             size={16}
//             className="opacity-60"
//             aria-hidden="true"
//           />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent 
//         className="min-w-48"
//         align="end"
//       >
//         <DropdownMenuLabel className="flex min-w-0 flex-col">
//           <span className="text-foreground truncate text-sm font-medium">
//             {name}
//           </span>
//           <span className="text-muted-foreground truncate text-xs font-normal">
//             {email}
//           </span>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <DropdownMenuItem asChild>
//             <Link href="/">
//               <Home size={16} className="opacity-60" aria-hidden="true" />
//               <span>Home</span>
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem asChild>
//             <Link href="/courses">
//               <BookOpen size={16} className="opacity-60" aria-hidden="true" />
//               <span>Courses</span>
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem asChild>
//             <Link href="/admin">
//               <LayoutDashboardIcon size={16} className="opacity-60" aria-hidden="true" />
//               <span>Dashboard</span>
//             </Link>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
        
//         <DropdownMenuSeparator />

//         <DropdownMenuItem onClick={handleSignOut}>
//           <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
//           <span>Logout</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }



"use client"

import {
  BookOpen,
  ChevronDownIcon,
  Home,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useSignout } from "@/hooks/use-signout"

interface iAppProps {
  name: string
  email: string
  image?: string | null
}

export function UserDropdown({ name, email, image }: iAppProps) {

  const handleSignOut = useSignout()

  const initials = name.includes(" ")
  ? name
      .split(" ")
      .map(w => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  : (name + email)
      .slice(0, 2)
      .toUpperCase()


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent flex items-center gap-1">
          <Avatar className="h-8 w-8">
            {image && <AvatarImage src={image} alt="Profile image" />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon size={16} className="opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-48" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium">
            {name}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              <Home size={16} className="opacity-60" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/courses">
              <BookOpen size={16} className="opacity-60" />
              <span>Courses</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/admin">
              <LayoutDashboardIcon size={16} className="opacity-60" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon size={16} className="opacity-60" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
