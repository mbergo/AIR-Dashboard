"use client"

import { SidebarSeparator } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Activity,
  Bell,
  Calendar,
  FileText,
  HelpCircle,
  MessageSquare,
  Mic,
  Search,
  Settings,
  User,
  BarChart3,
  LineChart,
  PieChart,
  GaugeIcon,
  ChevronDown,
  Sun,
  Moon,
  BlocksIcon as BarrierBlock,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout({ children }) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const isActive = (path) => {
    if (path === "/" && pathname === "/") {
      return true
    }
    // For non-root paths, check if the current path starts with the given path
    return path !== "/" && pathname.startsWith(path)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-muted/30">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-2">
              <Mic className="h-6 w-6 text-primary" />
              <div className="font-semibold">Voice Stream</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/" className="w-full">
                      <SidebarMenuButton isActive={isActive("/")}>
                        <Activity />
                        <span>Overview</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/transcripts" className="w-full">
                      <SidebarMenuButton isActive={isActive("/transcripts")}>
                        <MessageSquare />
                        <span>Transcripts</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/api-logs" className="w-full">
                      <SidebarMenuButton isActive={isActive("/api-logs")}>
                        <FileText />
                        <span>API Logs</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Analytics</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/analytics/usage-trends" className="w-full">
                      <SidebarMenuButton isActive={isActive("/analytics/usage-trends")}>
                        <LineChart />
                        <span>Usage Trends</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/analytics/performance" className="w-full">
                      <SidebarMenuButton isActive={isActive("/analytics/performance")}>
                        <BarChart3 />
                        <span>Performance</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/analytics/distribution" className="w-full">
                      <SidebarMenuButton isActive={isActive("/analytics/distribution")}>
                        <PieChart />
                        <span>Distribution</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/analytics/metrics" className="w-full">
                      <SidebarMenuButton isActive={isActive("/analytics/metrics")}>
                        <GaugeIcon />
                        <span>Metrics</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/analytics/guardrails" className="w-full">
                      <SidebarMenuButton isActive={isActive("/analytics/guardrails")}>
                        <BarrierBlock />
                        <span>Guardrails</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/settings" className="w-full">
                      <SidebarMenuButton isActive={isActive("/settings")}>
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/team" className="w-full">
                      <SidebarMenuButton isActive={isActive("/team")}>
                        <User />
                        <span>Team</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/help" className="w-full">
                      <SidebarMenuButton isActive={isActive("/help")}>
                        <HelpCircle />
                        <span>Help</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Marcus Bergo" />
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Marcus Bergo</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <SidebarTrigger />
            <div className="w-full flex items-center justify-between">
              <div className="hidden md:flex">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="w-[200px] lg:w-[300px] pl-8" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      >
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Toggle theme</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Notifications</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Calendar</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
