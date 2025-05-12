"use client"
import { Clock, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import DashboardLayout from "../../dashboard-layout"
import { ResponseTimeComparisonChart } from "../../../components/dashboard-charts"
import { useTheme } from "next-themes"

// Mock data for response times
const responseTimeData = [
  { name: "gpt-4o", value: 367 },
  { name: "gpt-3.5-turbo", value: 245 },
  { name: "whisper-1", value: 890 },
  { name: "text-embedding-3", value: 120 },
]

// Mock data for percentiles
const percentileData = {
  p50: 245,
  p90: 450,
  p95: 650,
  p99: 890,
}

export default function PerformancePage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#10b981"]

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Performance</h1>
            <p className="text-muted-foreground">Monitor API response times and performance metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30">
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
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">367 ms</div>
              <p className="text-xs text-muted-foreground">Across all models and endpoints</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">P90 Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">450 ms</div>
              <p className="text-xs text-muted-foreground">90% of requests are faster than this</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Fastest Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">text-embedding-3</div>
              <p className="text-xs text-muted-foreground">120 ms average response time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Slowest Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">whisper-1</div>
              <p className="text-xs text-muted-foreground">890 ms average response time</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Response Time by Model</CardTitle>
            <CardDescription>Average response time comparison across models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponseTimeComparisonChart data={responseTimeData} colors={COLORS} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time Percentiles</CardTitle>
            <CardDescription>Distribution of response times across all API calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>P50 (Median)</span>
                  </div>
                  <span className="font-medium">{percentileData.p50} ms</span>
                </div>
                <Progress value={percentileData.p50 / 10} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  50% of requests complete in {percentileData.p50} ms or less
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>P90</span>
                  </div>
                  <span className="font-medium">{percentileData.p90} ms</span>
                </div>
                <Progress value={percentileData.p90 / 10} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  90% of requests complete in {percentileData.p90} ms or less
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>P95</span>
                  </div>
                  <span className="font-medium">{percentileData.p95} ms</span>
                </div>
                <Progress value={percentileData.p95 / 10} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  95% of requests complete in {percentileData.p95} ms or less
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>P99</span>
                  </div>
                  <span className="font-medium">{percentileData.p99} ms</span>
                </div>
                <Progress value={percentileData.p99 / 10} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  99% of requests complete in {percentileData.p99} ms or less
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
