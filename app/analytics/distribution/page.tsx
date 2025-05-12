"use client"
import { Download, PieChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "../../dashboard-layout"
import { ModelUsageChart, EndpointDistributionChart } from "../../../components/dashboard-charts"
import { useTheme } from "next-themes"

// Mock data for model usage
const modelUsage = [
  { name: "gpt-4o", value: 45 },
  { name: "gpt-3.5-turbo", value: 30 },
  { name: "whisper-1", value: 15 },
  { name: "text-embedding-3", value: 10 },
]

// Mock data for endpoint distribution
const endpointDistribution = [
  { name: "Chat Completions", value: 55 },
  { name: "Transcriptions", value: 20 },
  { name: "Embeddings", value: 15 },
  { name: "Text-to-Speech", value: 10 },
]

// Mock data for token distribution
const tokenDistribution = [
  { name: "gpt-4o", value: 65 },
  { name: "gpt-3.5-turbo", value: 20 },
  { name: "whisper-1", value: 10 },
  { name: "text-embedding-3", value: 5 },
]

export default function DistributionPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#10b981"]

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Distribution</h1>
            <p className="text-muted-foreground">Analyze usage distribution across models and endpoints</p>
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

        <Tabs defaultValue="models">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="tokens">Token Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="models">
            <Card>
              <CardHeader>
                <CardTitle>API Calls by Model</CardTitle>
                <CardDescription>Distribution of API calls across different models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ModelUsageChart data={modelUsage} colors={COLORS} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints">
            <Card>
              <CardHeader>
                <CardTitle>API Calls by Endpoint</CardTitle>
                <CardDescription>Distribution of API calls across different endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <EndpointDistributionChart data={endpointDistribution} colors={COLORS} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tokens">
            <Card>
              <CardHeader>
                <CardTitle>Token Usage by Model</CardTitle>
                <CardDescription>Distribution of token usage across different models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ModelUsageChart data={tokenDistribution} colors={COLORS} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top API Consumers</CardTitle>
              <CardDescription>Users or applications with highest API usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">User/App</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">API Calls</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 align-middle">Production App</td>
                      <td className="p-4 align-middle">12,450</td>
                      <td className="p-4 align-middle">45%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle">Staging Environment</td>
                      <td className="p-4 align-middle">5,230</td>
                      <td className="p-4 align-middle">19%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle">Development</td>
                      <td className="p-4 align-middle">4,120</td>
                      <td className="p-4 align-middle">15%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle">Admin Portal</td>
                      <td className="p-4 align-middle">3,540</td>
                      <td className="p-4 align-middle">13%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle">Testing Suite</td>
                      <td className="p-4 align-middle">2,210</td>
                      <td className="p-4 align-middle">8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>API usage by geographic region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <PieChart className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Geographic distribution chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
