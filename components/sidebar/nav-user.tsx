"use client"

import {
  IconDashboard,
  IconDotsVertical,
  IconLogout,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { Home, Tv2 } from "lucide-react"
import Link from "next/link"
import { useSignout } from "@/hooks/use-signout"



export function NavUser() {

  const { isMobile } = useSidebar();
  const { data: session, isPending } = authClient.useSession();
  const handleSignOut = useSignout()

  if (isPending) return null;
  // chatgt code 
  // const name = session?.user?.name || ""
  // const email = session?.user?.email || ""

  // const initials = name.includes(" ")
  //   ? name
  //     .split(" ")
  //     .map(w => w[0])
  //     .slice(0, 2)
  //     .join("")
  //     .toUpperCase()
  //   : (name + email)
  //     .slice(0, 2)
  //     .toUpperCase()

  const name = session?.user?.name || ""
  const email = session?.user?.email || ""

  // For AvatarFallback only
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

// chatgtcode

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session?.user.image ?? `https://avatar.vercel.sh/rauchg/${session?.user.email}`}
                  alt={session?.user.name}
                />
                {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>

              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {/* <span className="truncate font-medium">
                  {session?.user.name && session?.user.name.length > 0
                    ? session?.user.name
                    : initials
                  }
                </span>

                <span className="text-muted-foreground truncate text-xs">
                  {session?.user.email}
                </span> */}
                <span className="truncate font-medium">
                  {session?.user.name && session?.user.name.length > 0
                    ? session?.user.name   // Full name
                    : session?.user.email.split("@")[0]  // fallback: email username
                  }
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {session?.user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">

                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user.image ?? `https://avatar.vercel.sh/rauchg/${session?.user.email}`}
                    alt={session?.user.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {/* </Avatar> */}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session?.user.name && session?.user.name.length > 0
                      ? session?.user.name
                      : session?.user.email.split("@")[0]
                    }
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {session?.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/">
                  <Home />
                  Homepage
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <IconDashboard />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/courses">
                  <Tv2 />
                  Courses
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}