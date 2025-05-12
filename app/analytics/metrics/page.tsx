"use client"
import { Download, GaugeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import DashboardLayout from "../../dashboard-layout"
import { Gauge } from "../../../components/dashboard-charts"
import { useTheme } from "next-themes"

// Mock data for KPIs
const kpiData = {
  totalApiCalls: 721,
  successRate: 98.5,
  avgResponseTime: 367,
  activeUsers: 239,
  callsPerHour: 42,
  tokenUsage: 1250000,
  costToDate: 125.75,
  estimatedMonthlyUsage: 1850000,
}

export default function MetricsPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Metrics</h1>
            <p className="text-muted-foreground">Key performance indicators and usage metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
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
              <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.totalApiCalls.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
              <Progress className="mt-3" value={72} />
              <p className="mt-1 text-xs text-muted-foreground">72% of monthly quota</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.successRate}%</div>
              <p className="text-xs text-muted-foreground">API call success rate</p>
              <Progress className="mt-3" value={kpiData.successRate} />
              <p className="mt-1 text-xs text-green-600">+0.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.activeUsers}</div>
              <p className="text-xs text-muted-foreground">Unique users this month</p>
              <Progress className="mt-3" value={(kpiData.activeUsers / 500) * 100} />
              <p className="mt-1 text-xs text-green-600">+18 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.avgResponseTime} ms</div>
              <p className="text-xs text-muted-foreground">Across all models</p>
              <Progress className="mt-3" value={(kpiData.avgResponseTime / 1000) * 100} />
              <p className="mt-1 text-xs text-green-600">-15ms from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Token Usage</CardTitle>
              <CardDescription>Monthly token consumption</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Gauge value={Math.floor(kpiData.tokenUsage / 10000)} min={0} max={200} label="Tokens (K)" size={160} />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {kpiData.tokenUsage.toLocaleString()} tokens used this month
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimated monthly usage: {kpiData.estimatedMonthlyUsage.toLocaleString()} tokens
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Calls Per Hour</CardTitle>
              <CardDescription>Average hourly call volume</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Gauge value={kpiData.callsPerHour} min={0} max={100} label="Calls/Hour" size={160} />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">Peak: 78 calls/hour</p>
                <p className="text-sm text-muted-foreground">Low: 12 calls/hour</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost to Date</CardTitle>
              <CardDescription>API usage cost this month</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-5xl font-bold mt-8">${kpiData.costToDate.toFixed(2)}</div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">Monthly budget: $200.00</p>
                <Progress className="mt-2" value={(kpiData.costToDate / 200) * 100} />
                <p className="mt-2 text-sm text-muted-foreground">
                  {((kpiData.costToDate / 200) * 100).toFixed(1)}% of monthly budget
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usage Quotas</CardTitle>
            <CardDescription>Current usage against allocated quotas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <GaugeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>API Calls</span>
                  </div>
                  <span className="font-medium">{kpiData.totalApiCalls} / 1,000</span>
                </div>
                <Progress value={(kpiData.totalApiCalls / 1000) * 100} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">72.1% of monthly quota used</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <GaugeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Token Usage</span>
                  </div>
                  <span className="font-medium">{kpiData.tokenUsage.toLocaleString()} / 2,000,000</span>
                </div>
                <Progress value={(kpiData.tokenUsage / 2000000) * 100} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">62.5% of monthly token quota used</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <GaugeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Audio Minutes</span>
                  </div>
                  <span className="font-medium">125 / 300</span>
                </div>
                <Progress value={(125 / 300) * 100} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">41.7% of monthly audio minutes used</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <GaugeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Cost</span>
                  </div>
                  <span className="font-medium">${kpiData.costToDate.toFixed(2)} / $200.00</span>
                </div>
                <Progress value={(kpiData.costToDate / 200) * 100} className="h-2" />
                <p className="mt-1 text-xs text-muted-foreground">62.9% of monthly budget used</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
