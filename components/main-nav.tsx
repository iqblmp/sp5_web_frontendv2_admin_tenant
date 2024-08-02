import * as React from "react"
import Link from "next/link"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  MonitorSmartphone,
  Plus,
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
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <MonitorSmartphone className="h-6 w-6" />
            <span className="sr-only">Smart Platform</span>
          </Link>
          <Link
            href="/"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground "
              >
                Library
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Test Library</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Test Description</DropdownMenuItem>
              <DropdownMenuItem>Report Description</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/test_battery"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Battery
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground "
              >
                Database
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Database</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>individual</DropdownMenuItem>
              <DropdownMenuItem>Group</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/payments"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Project
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground "
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
                className="text-muted-foreground transition-colors hover:text-foreground "
              >
                Interview
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>SMART Interview</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Introduction</DropdownMenuItem>
              <DropdownMenuItem>Online Test Interview</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground "
              >
                Settings
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>User Profile</DropdownMenuItem>
              <DropdownMenuItem>Company Profile</DropdownMenuItem>
              <DropdownMenuItem>Welcome Page</DropdownMenuItem>
              <DropdownMenuItem>Email Invitation</DropdownMenuItem>
              <DropdownMenuItem>Embedded Video URL</DropdownMenuItem>
              <DropdownMenuItem>Biodata Registration</DropdownMenuItem>
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
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Test
              </Link>

              <Link
                href="/database"
                className="text-muted-foreground hover:text-foreground"
              >
                Database
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Project
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Credit History
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Smart Interview
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1  sm:flex-initial">
            <div className="relative ">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search candidate..."
                className="pl-8 sm:w-[300px] md:w-[200px] bg-transparent lg:w-[300px]"
              />
            </div>
          </form>
          <nav className="flex items-center -mr-[2px]">
            <ThemeToggle />
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Users className="h-5 w-5" />
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
