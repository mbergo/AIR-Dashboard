"use client"

import { SidebarSeparator } from "@/components/ui/sidebar"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileText,
  HelpCircle,
  MessageSquare,
  Mic,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  Moon,
  User,
  BarChart3,
  LineChart,
  PieChart,
  GaugeIcon,
  X,
  BlocksIcon as BarrierBlock,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Import chart components
import {
  Gauge,
  ApiUsageChart,
  ModelUsageChart,
  EndpointDistributionChart,
  TokenUsageAreaChart,
  DailySuccessRateChart,
  ResponseTimeComparisonChart,
} from "./components/dashboard-charts"

// Initial mock data
const initialApiLogs = [
  {
    id: 1,
    type: "success",
    endpoint: "/v1/chat/completions",
    model: "gpt-4o",
    tokens: 245,
    latency: "124ms",
    timestamp: new Date().getTime() - 5000,
  },
  {
    id: 2,
    type: "success",
    endpoint: "/v1/audio/transcriptions",
    model: "whisper-1",
    tokens: 1024,
    latency: "890ms",
    timestamp: new Date().getTime() - 15000,
  },
  {
    id: 3,
    type: "error",
    endpoint: "/v1/embeddings",
    model: "text-embedding-3-large",
    error: "Rate limit exceeded",
    timestamp: new Date().getTime() - 30000,
  },
  {
    id: 4,
    type: "success",
    endpoint: "/v1/chat/completions",
    model: "gpt-4o",
    tokens: 512,
    latency: "245ms",
    timestamp: new Date().getTime() - 60000,
  },
  {
    id: 5,
    type: "success",
    endpoint: "/v1/audio/speech",
    model: "tts-1",
    tokens: 128,
    latency: "320ms",
    timestamp: new Date().getTime() - 120000,
  },
]

// Mock data for transcripts
const initialTranscripts = [
  { id: 1, phoneNumber: "+1 (555) 123-4567", date: "2023-04-15", time: "14:30", duration: "3m 24s" },
  { id: 2, phoneNumber: "+1 (555) 987-6543", date: "2023-04-15", time: "10:15", duration: "5m 12s" },
  { id: 3, phoneNumber: "+1 (555) 456-7890", date: "2023-04-14", time: "16:45", duration: "1m 45s" },
  { id: 4, phoneNumber: "+1 (555) 234-5678", date: "2023-04-13", time: "09:20", duration: "4m 30s" },
]

// Mock data for audit logs
const initialAuditLogs = [
  {
    id: 1,
    type: "CFG",
    event: "API Key Created",
    description: "Voice provider changed to Eleven Labs",
    time: "5/10/2025 3:12:01 PM",
  },
  {
    id: 2,
    type: "API",
    event: "API Key Created",
    description: "New API key created for OpenAI provider",
    time: "4/15/2023 2:30:00 PM",
  },
  {
    id: 3,
    type: "CFG",
    event: "Configuration Updated",
    description: "Voice provider changed to Eleven Labs",
    time: "4/15/2023 1:15:00 PM",
  },
  {
    id: 4,
    type: "ERR",
    event: "API Error",
    description: "Rate limit exceeded for OpenAI API",
    time: "4/14/2023 4:45:00 PM",
  },
  {
    id: 5,
    type: "SYS",
    event: "System Initialized",
    description: "Voice Stream API system initialized",
    time: "4/14/2023 9:20:00 AM",
  },
]

// Initial KPI data
const initialKpiData = {
  totalApiCalls: 721,
  successRate: 98.5,
  avgResponseTime: 367,
  activeUsers: 239,
  callsPerHour: 42,
  tokenUsage: 1250000,
}

// Initial chart data
const initialChartData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - 29 + i)
  return {
    date: date.toISOString().split("T")[0],
    calls: Math.floor(Math.random() * 100) + 400,
    tokens: Math.floor(Math.random() * 50000) + 100000,
    errors: Math.floor(Math.random() * 10),
  }
})

// Initial model usage data
const initialModelUsage = [
  { name: "gpt-4o", value: 45 },
  { name: "gpt-3.5-turbo", value: 30 },
  { name: "whisper-1", value: 15 },
  { name: "text-embedding-3", value: 10 },
]

// Initial endpoint distribution data
const initialEndpointDistribution = [
  { name: "Chat Completions", value: 55 },
  { name: "Transcriptions", value: 20 },
  { name: "Embeddings", value: 15 },
  { name: "Text-to-Speech", value: 10 },
]

// Initial response time data
const initialResponseTimeData = [
  { name: "gpt-4o", value: 367 },
  { name: "gpt-3.5-turbo", value: 245 },
  { name: "whisper-1", value: 890 },
  { name: "text-embedding-3", value: 120 },
]

// Initial daily success/error rate data
const initialDailySuccessData = Array.from({ length: 14 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - 13 + i)
  const total = Math.floor(Math.random() * 100) + 400
  const errors = Math.floor(Math.random() * 20)
  return {
    date: date.toISOString().split("T")[0],
    success: total - errors,
    errors: errors,
  }
})

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [isDemoActive, setIsDemoActive] = useState(false)
  const [apiLogs, setApiLogs] = useState(initialApiLogs)
  const [transcripts, setTranscripts] = useState(initialTranscripts)
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs)
  const [kpiData, setKpiData] = useState(initialKpiData)
  const [chartData, setChartData] = useState(initialChartData)
  const [modelUsage, setModelUsage] = useState(initialModelUsage)
  const [endpointDistribution, setEndpointDistribution] = useState(initialEndpointDistribution)
  const [activeCalls, setActiveCalls] = useState(9)
  const [showDemoAlert, setShowDemoAlert] = useState(false)
  const [responseTimeData, setResponseTimeData] = useState(initialResponseTimeData)
  const [dailySuccessData, setDailySuccessData] = useState(initialDailySuccessData)
  const [selectedChartView, setSelectedChartView] = useState("line")

  const demoIntervalRef = useRef(null)
  const apiLogIntervalRef = useRef(null)

  // Colors for charts
  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#10b981"]
  const isDark = theme === "dark"

  // Format timestamp
  const formatTime = (timestamp) => {
    const now = new Date().getTime()
    const diff = now - timestamp

    if (diff < 60000) {
      return `${Math.floor(diff / 1000)}s ago`
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`
    } else {
      return new Date(timestamp).toLocaleTimeString()
    }
  }

  // Generate random API log
  const generateRandomApiLog = () => {
    const isSuccess = Math.random() > 0.1
    return {
      id: Date.now(),
      type: isSuccess ? "success" : "error",
      endpoint: ["/v1/chat/completions", "/v1/audio/transcriptions", "/v1/embeddings", "/v1/audio/speech"][
        Math.floor(Math.random() * 4)
      ],
      model: ["gpt-4o", "gpt-3.5-turbo", "whisper-1", "text-embedding-3-large", "tts-1"][Math.floor(Math.random() * 5)],
      tokens: Math.floor(Math.random() * 1000) + 100,
      latency: `${Math.floor(Math.random() * 900) + 100}ms`,
      error: isSuccess ? undefined : "Rate limit exceeded",
      timestamp: new Date().getTime(),
    }
  }

  // Update KPI data with random changes
  const updateKpiData = () => {
    setKpiData((prev) => ({
      totalApiCalls: prev.totalApiCalls + Math.floor(Math.random() * 10) + 1,
      successRate: Math.min(100, Math.max(90, prev.successRate + (Math.random() * 2 - 1))).toFixed(1),
      avgResponseTime: Math.max(100, Math.min(800, prev.avgResponseTime + (Math.random() * 40 - 20))).toFixed(0),
      activeUsers: Math.max(100, Math.min(500, prev.activeUsers + Math.floor(Math.random() * 10 - 5))),
      callsPerHour: Math.max(10, Math.min(100, prev.callsPerHour + Math.floor(Math.random() * 10 - 5))),
      tokenUsage: prev.tokenUsage + Math.floor(Math.random() * 10000),
    }))
  }

  // Update chart data with new values
  const updateChartData = () => {
    setChartData((prev) => {
      const newData = [...prev]
      const lastDay = newData[newData.length - 1]

      // Update the last day with some random changes
      newData[newData.length - 1] = {
        ...lastDay,
        calls: Math.max(300, Math.min(800, lastDay.calls + Math.floor(Math.random() * 40 - 20))),
        tokens: Math.max(50000, Math.min(200000, lastDay.tokens + Math.floor(Math.random() * 5000 - 2500))),
        errors: Math.max(0, Math.min(20, lastDay.errors + Math.floor(Math.random() * 4 - 2))),
      }

      return newData
    })
  }

  // Update model usage data
  const updateModelUsage = () => {
    setModelUsage((prev) => {
      return prev.map((item) => ({
        ...item,
        value: Math.max(5, Math.min(60, item.value + Math.floor(Math.random() * 6 - 3))),
      }))
    })
  }

  // Update endpoint distribution
  const updateEndpointDistribution = () => {
    setEndpointDistribution((prev) => {
      return prev.map((item) => ({
        ...item,
        value: Math.max(5, Math.min(60, item.value + Math.floor(Math.random() * 6 - 3))),
      }))
    })
  }

  // Update active calls
  const updateActiveCalls = () => {
    setActiveCalls((prev) => Math.max(0, Math.min(20, prev + Math.floor(Math.random() * 5 - 2))))
  }

  // Update response time data
  const updateResponseTimeData = () => {
    setResponseTimeData((prev) => {
      return prev.map((item) => ({
        ...item,
        value: Math.max(100, Math.min(1000, item.value + Math.floor(Math.random() * 50 - 25))),
      }))
    })
  }

  // Update daily success data
  const updateDailySuccessData = () => {
    setDailySuccessData((prev) => {
      const newData = [...prev]
      const lastDay = newData[newData.length - 1]

      const total = Math.max(300, Math.min(600, lastDay.success + lastDay.errors + Math.floor(Math.random() * 40 - 20)))
      const errors = Math.max(0, Math.min(30, Math.floor(Math.random() * 20)))

      newData[newData.length - 1] = {
        ...lastDay,
        success: total - errors,
        errors: errors,
      }

      return newData
    })
  }

  // Generate a new transcript
  const generateNewTranscript = () => {
    const phoneNumbers = ["+1 (555) 123-4567", "+1 (555) 987-6543", "+1 (555) 456-7890", "+1 (555) 234-5678"]
    const now = new Date()
    const date = now.toISOString().split("T")[0]
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`
    const duration = `${Math.floor(Math.random() * 10) + 1}m ${Math.floor(Math.random() * 60)}s`

    return {
      id: Date.now(),
      phoneNumber: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
      date,
      time,
      duration,
    }
  }

  // Generate a new audit log
  const generateNewAuditLog = () => {
    const types = ["CFG", "API", "SYS", "ERR"]
    const events = ["API Key Created", "Configuration Updated", "System Event", "API Error"]
    const descriptions = [
      "Voice provider changed",
      "New API key created",
      "System configuration updated",
      "Rate limit exceeded",
    ]

    const type = types[Math.floor(Math.random() * types.length)]
    const event = events[Math.floor(Math.random() * events.length)]
    const description = descriptions[Math.floor(Math.random() * descriptions.length)]
    const now = new Date()

    return {
      id: Date.now(),
      type,
      event,
      description,
      time: now.toLocaleString(),
    }
  }

  // Toggle demo mode
  const toggleDemoMode = () => {
    const newDemoState = !isDemoActive
    setIsDemoActive(newDemoState)

    if (newDemoState) {
      setShowDemoAlert(true)
      setTimeout(() => setShowDemoAlert(false), 5000)

      // Start demo mode with frequent updates
      demoIntervalRef.current = setInterval(() => {
        updateKpiData()
        updateChartData()
        updateModelUsage()
        updateEndpointDistribution()
        updateActiveCalls()
        updateResponseTimeData()
        updateDailySuccessData()

        // Occasionally add a new transcript
        if (Math.random() > 0.7) {
          setTranscripts((prev) => [generateNewTranscript(), ...prev.slice(0, 9)])
        }

        // Occasionally add a new audit log
        if (Math.random() > 0.8) {
          setAuditLogs((prev) => [generateNewAuditLog(), ...prev.slice(0, 9)])
        }
      }, 2000)
    } else {
      // Stop demo mode
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current)
        demoIntervalRef.current = null
      }
    }
  }

  // Simulate streaming API logs
  useEffect(() => {
    apiLogIntervalRef.current = setInterval(
      () => {
        const newLog = generateRandomApiLog()
        setApiLogs((prev) => [newLog, ...prev.slice(0, 19)])
      },
      isDemoActive ? 2000 : 5000,
    )

    return () => {
      if (apiLogIntervalRef.current) {
        clearInterval(apiLogIntervalRef.current)
      }
    }
  }, [isDemoActive])

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current)
      }
      if (apiLogIntervalRef.current) {
        clearInterval(apiLogIntervalRef.current)
      }
    }
  }, [])

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-muted/30">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-2">
              <Mic className="h-6 w-6 text-primary" />
              <div className="font-semibold">
                Platform - <span className="text-primary">AIREADY</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/" passHref legacyBehavior>
                      <SidebarMenuButton asChild isActive>
                        <a className="w-full">
                          <Activity />
                          <span>Overview</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/transcripts" passHref legacyBehavior>
                      <SidebarMenuButton asChild>
                        <a className="w-full">
                          <MessageSquare />
                          <span>Transcripts</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/api-logs" passHref legacyBehavior>
                      <SidebarMenuButton asChild>
                        <a className="w-full">
                          <FileText />
                          <span>API Logs</span>
                        </a>
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
                    <Link href="/analytics/usage-trends" passHref legacyBehavior>
                      <SidebarMenuButton asChild>
                        <a className="w-full">
                          <LineChart />
                          <span>Usage Trends</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/analytics/performance" passHref legacyBehavior>
                      <SidebarMenuButton asChild>
                        <a className="w-full">
                          <BarChart3 />
                          <span>Performance</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/analytics/distribution" passHref legacyBehavior>
                      <SidebarMenuButton asChild>
                        <a className="w-full">
                          <PieChart />
                          <span>Distribution</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/analytics/metrics" passHref legacyBehavior>
                      <SidebarMenuButton asChild>
                        <a className="w-full">
                          <GaugeIcon />
                          <span>Metrics</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/analytics/guardrails" passHref legacyBehavior>
                      <SidebarMenuButton asChild>
                        <a className="w-full">
                          <BarrierBlock />
                          <span>Guardrails</span>
                        </a>
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
                    <Link href="/settings" passHref legacyBehavior>
                      <SidebarMenuButton asChild>
                        <a className="w-full">
                          <Settings />
                          <span>Settings</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/team" passHref legacyBehavior>
                      <SidebarMenuButton asChild>
                        <a className="w-full">
                          <User />
                          <span>Team</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/help" passHref legacyBehavior>
                      <SidebarMenuButton asChild>
                        <a className="w-full">
                          <HelpCircle />
                          <span>Help</span>
                        </a>
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
                <div className="flex items-center gap-2">
                  <Switch id="demo-mode" checked={isDemoActive} onCheckedChange={toggleDemoMode} />
                  <Label htmlFor="demo-mode" className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span>Demo Mode</span>
                  </Label>
                </div>
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

          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {showDemoAlert && (
              <Alert className="mb-6 bg-primary/10 border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <AlertTitle>Demo Mode Activated</AlertTitle>
                <AlertDescription>
                  All data is now being simulated in real-time. The dashboard will update automatically with random
                  data.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Monitor your OpenAI API usage and call transcriptions</p>
              </div>

              {/* Stats Cards with Trend Indicators */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpiData.totalApiCalls.toLocaleString()}</div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        12%
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-2">from last week</span>
                    </div>
                    <Progress className="mt-3" value={75} />
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <Check className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpiData.successRate}%</div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        0.5%
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-2">from last week</span>
                    </div>
                    <Progress className="mt-3" value={Number.parseFloat(kpiData.successRate)} />
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpiData.avgResponseTime} ms</div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        15ms
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-2">from last week</span>
                    </div>
                    <Progress className="mt-3" value={(kpiData.avgResponseTime / 1000) * 100} />
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpiData.activeUsers}</div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        18
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-2">from last week</span>
                    </div>
                    <Progress className="mt-3" value={(kpiData.activeUsers / 500) * 100} />
                  </CardContent>
                </Card>
              </div>

              {/* Chart View Selector */}
              <div className="flex justify-end mb-2">
                <div className="inline-flex items-center rounded-md border bg-background p-1 text-muted-foreground">
                  <Button
                    variant={selectedChartView === "line" ? "secondary" : "ghost"}
                    size="sm"
                    className="px-3"
                    onClick={() => setSelectedChartView("line")}
                  >
                    <LineChart className="mr-1 h-4 w-4" />
                    Line
                  </Button>
                  <Button
                    variant={selectedChartView === "area" ? "secondary" : "ghost"}
                    size="sm"
                    className="px-3"
                    onClick={() => setSelectedChartView("area")}
                  >
                    <Activity className="mr-1 h-4 w-4" />
                    Area
                  </Button>
                  <Button
                    variant={selectedChartView === "bar" ? "secondary" : "ghost"}
                    size="sm"
                    className="px-3"
                    onClick={() => setSelectedChartView("bar")}
                  >
                    <BarChart3 className="mr-1 h-4 w-4" />
                    Bar
                  </Button>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid gap-6 md:grid-cols-6">
                {/* API Usage Chart */}
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>API Usage Over Time</CardTitle>
                    <CardDescription>Daily API calls for the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ApiUsageChart data={chartData} isDark={isDark} />
                    </div>
                  </CardContent>
                </Card>

                {/* Live Call Monitor with Gauge */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Live Call Monitor</CardTitle>
                    <CardDescription>Real-time data updates every 5 seconds</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center">
                    <Gauge value={activeCalls} min={0} max={20} label="Active Calls" />
                    <div className="mt-4 w-full">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Calls per hour</span>
                        <span className="font-medium">{kpiData.callsPerHour}</span>
                      </div>
                      <Progress value={(kpiData.callsPerHour / 100) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Charts Row */}
              <div className="grid gap-6 md:grid-cols-12">
                {/* Token Usage Gauge */}
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Token Usage</CardTitle>
                    <CardDescription>Monthly consumption</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Gauge
                      value={Math.floor(kpiData.tokenUsage / 10000)}
                      min={0}
                      max={200}
                      label="Tokens (K)"
                      size={160}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <div className="text-sm text-muted-foreground">
                      {kpiData.tokenUsage.toLocaleString()} tokens used this month
                    </div>
                  </CardFooter>
                </Card>

                {/* Model Usage Distribution */}
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Model Usage</CardTitle>
                    <CardDescription>Distribution by model type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ModelUsageChart data={modelUsage} colors={COLORS} />
                    </div>
                  </CardContent>
                </Card>

                {/* Endpoint Distribution */}
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Endpoint Distribution</CardTitle>
                    <CardDescription>API calls by endpoint</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <EndpointDistributionChart data={endpointDistribution} colors={COLORS} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Second Row of Charts */}
              <div className="grid gap-6 md:grid-cols-12">
                {/* Token Usage Area Chart */}
                <Card className="md:col-span-6">
                  <CardHeader>
                    <CardTitle>Token Usage Trend</CardTitle>
                    <CardDescription>Daily token consumption</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <TokenUsageAreaChart data={chartData} isDark={isDark} />
                    </div>
                  </CardContent>
                </Card>

                {/* Success/Error Rate Chart */}
                <Card className="md:col-span-6">
                  <CardHeader>
                    <CardTitle>Success/Error Rate</CardTitle>
                    <CardDescription>Daily success and error counts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <DailySuccessRateChart data={dailySuccessData} isDark={isDark} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Response Time Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Response Time by Model</CardTitle>
                  <CardDescription>Average response time comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponseTimeComparisonChart data={responseTimeData} colors={COLORS} />
                  </div>
                </CardContent>
              </Card>

              {/* Prominent CTA Button - Centered and Prominent */}
              <div className="flex justify-center my-6">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Live Demo
                </Button>
              </div>

              {/* Real-time API Logs - New Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Real-time API Logs</CardTitle>
                    <CardDescription>Live streaming of API calls as they happen</CardDescription>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-hidden">
                    <div className="overflow-auto max-h-[300px]">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Status
                            </th>
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Endpoint
                            </th>
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Model
                            </th>
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Tokens
                            </th>
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                              Latency
                            </th>
                            <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {apiLogs.map((log, index) => (
                            <tr
                              key={log.id}
                              className={`border-b transition-colors ${index === 0 ? "animate-highlight" : ""}`}
                            >
                              <td className="p-4 align-middle">
                                {log.type === "success" ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <Check className="h-3 w-3 mr-1" />
                                    Success
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                    <X className="h-3 w-3 mr-1" />
                                    Error
                                  </Badge>
                                )}
                              </td>
                              <td className="p-4 align-middle font-mono text-xs">{log.endpoint}</td>
                              <td className="p-4 align-middle">{log.model}</td>
                              <td className="p-4 align-middle">{log.type === "success" ? log.tokens : "-"}</td>
                              <td className="p-4 align-middle">{log.type === "success" ? log.latency : log.error}</td>
                              <td className="p-4 align-middle text-muted-foreground">{formatTime(log.timestamp)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for Transcripts and Audit Logs */}
              <Tabs defaultValue="transcripts">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="transcripts">Call Transcripts</TabsTrigger>
                  <TabsTrigger value="audit">Audit Logs</TabsTrigger>
                </TabsList>

                <TabsContent value="transcripts">
                  <Card>
                    <CardHeader>
                      <CardTitle>Call Transcripts</CardTitle>
                      <CardDescription>Recent call transcriptions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Phone Number
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Date
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Time
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Duration
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {transcripts.map((transcript) => (
                              <tr key={transcript.id} className="border-b">
                                <td className="p-4 align-middle">{transcript.phoneNumber}</td>
                                <td className="p-4 align-middle">{transcript.date}</td>
                                <td className="p-4 align-middle">{transcript.time}</td>
                                <td className="p-4 align-middle">{transcript.duration}</td>
                                <td className="p-4 align-middle">
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">View All Transcripts</Button>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Make New Call
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="audit">
                  <Card>
                    <CardHeader>
                      <CardTitle>Audit Logs</CardTitle>
                      <CardDescription>System and configuration changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Type
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Event
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Description
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Time
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {auditLogs.map((log) => (
                              <tr key={log.id} className="border-b">
                                <td className="p-4 align-middle">
                                  <Badge
                                    variant="outline"
                                    className={
                                      log.type === "CFG"
                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                        : log.type === "API"
                                          ? "bg-purple-50 text-purple-700 border-purple-200"
                                          : log.type === "ERR"
                                            ? "bg-red-50 text-red-700 border-red-200"
                                            : "bg-gray-50 text-gray-700 border-gray-200"
                                    }
                                  >
                                    {log.type}
                                  </Badge>
                                </td>
                                <td className="p-4 align-middle">{log.event}</td>
                                <td className="p-4 align-middle">{log.description}</td>
                                <td className="p-4 align-middle text-muted-foreground">{log.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-xs text-muted-foreground">Real-time logs update every 15 seconds</p>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
