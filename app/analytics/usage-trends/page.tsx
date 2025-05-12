"use client"

import { useState } from "react"
import { Calendar, Download, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "../../dashboard-layout"
import { ApiUsageChart, TokenUsageAreaChart } from "../../../components/dashboard-charts"
import { useTheme } from "next-themes"

// Mock data for charts
const generateChartData = (days) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (days - 1) + i)
    return {
      date: date.toISOString().split("T")[0],
      calls: Math.floor(Math.random() * 100) + 400,
      tokens: Math.floor(Math.random() * 50000) + 100000,
      errors: Math.floor(Math.random() * 10),
    }
  })
}

export default function UsageTrendsPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [timeRange, setTimeRange] = useState("30")
  const [chartData, setChartData] = useState(generateChartData(30))

  const handleTimeRangeChange = (value) => {
    setTimeRange(value)
    setChartData(generateChartData(Number.parseInt(value)))
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Usage Trends</h1>
            <p className="text-muted-foreground">Analyze your API usage patterns over time</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="14">Last 14 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="api-calls">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="api-calls">API Calls</TabsTrigger>
            <TabsTrigger value="tokens">Token Usage</TabsTrigger>
            <TabsTrigger value="errors">Error Rates</TabsTrigger>
          </TabsList>

          <TabsContent value="api-calls">
            <Card>
              <CardHeader>
                <CardTitle>API Calls Over Time</CardTitle>
                <CardDescription>Daily API call volume for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ApiUsageChart data={chartData} isDark={isDark} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tokens">
            <Card>
              <CardHeader>
                <CardTitle>Token Usage Over Time</CardTitle>
                <CardDescription>Daily token consumption for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <TokenUsageAreaChart data={chartData} isDark={isDark} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors">
            <Card>
              <CardHeader>
                <CardTitle>Error Rates Over Time</CardTitle>
                <CardDescription>Daily error counts for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {/* We can reuse ApiUsageChart but focus on the errors data */}
                  <ApiUsageChart data={chartData} isDark={isDark} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Usage by Model</CardTitle>
              <CardDescription>API calls distribution by model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Model usage chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage by Endpoint</CardTitle>
              <CardDescription>API calls distribution by endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Endpoint usage chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
