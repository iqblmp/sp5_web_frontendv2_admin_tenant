import * as React from "react"
import Link from "next/link"
import {
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  MonitorSmartphone,
  PlusCircle,
  Search,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { NavItem } from "@/types/nav"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex w-full gap-6 md:gap-10">
      <header className="sticky top-0 flex h-16 items-center gap-4 w-full px-4 md:px-6">
        {" "}
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/payments"
            className="flex text-background items-center gap-2 text-lg font-semibold md:text-base"
          >
            <MonitorSmartphone className="h-6 w-6" />
            <span className="sr-only">Smart Platform</span>
          </Link>
          <Link
            href="/"
            className="text-background transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href="#"
                className="text-background transition-colors hover:text-foreground "
              >
                Library
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Test Library</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/test">Test Description</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href="/report">Report Description</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/battery"
            className="text-background transition-colors hover:text-foreground"
          >
            Battery
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href="#"
                className="text-background transition-colors hover:text-foreground "
              >
                Database
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Database</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/individual">Individual</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/group">Group</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/project"
            className="text-background transition-colors hover:text-foreground"
          >
            Project
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href="/credits"
                className="text-background transition-colors hover:text-foreground "
              >
                Credit
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Credit</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>SMART Credits</DropdownMenuItem>
              <DropdownMenuItem>Proctoring Credits</DropdownMenuItem>
              <DropdownMenuItem>SMART Interview</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href="#"
                className="text-background transition-colors hover:text-foreground "
              >
                Interview
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>SMART Interview</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Link href="/introduction">Introduction</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href="/online_test_interview">Online Test Interview</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href="#"
                className="text-background transition-colors hover:text-foreground "
              >
                Settings
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Link href="/user_profile">User Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href="/company_profile">Company Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href="/welcome_page">Welcome Page</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href="/email_invitation">Email Invitation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href="/embedded_video_url">Embedded Video URL</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href="/biodata_registration">Biodata Registration</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <MonitorSmartphone className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="/" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="/battery"
                className="text-background hover:text-foreground"
              >
                Battery
              </Link>

              <Link
                href="/database"
                className="text-background hover:text-foreground"
              >
                Database
              </Link>
              <Link href="#" className="text-background hover:text-foreground">
                Project
              </Link>
              <Link href="#" className="text-background hover:text-foreground">
                Credit History
              </Link>
              <Link href="#" className="text-background hover:text-foreground">
                Smart Interview
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {/* <form className="ml-auto flex-1  sm:flex-initial">
            <div className="relative ">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-white" />
              <Input
                type="search"
                placeholder="Search candidate..."
                className="pl-8 sm:w-[300px] md:w-[200px] bg-transparent focus-visible:ring-0  placeholder:text-white lg:w-[300px]"
              />
            </div>
          </form> */}

          <img src="/asi-logo-white.png" className="pl-5" width={250} />
          <nav className="flex items-center -mr-[2px]">
            <ThemeToggle />
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="min-w-10 rounded-full"
              >
                <Users className="h-5 w-5 " />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Dev.user.01</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem disabled>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Layout Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Invite users</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>More...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
}
