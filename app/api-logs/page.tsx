"use client"

import { useState } from "react"
import { Check, Download, Filter, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import DashboardLayout from "../dashboard-layout"

// Mock data for API logs
const apiLogs = [
  {
    id: 1,
    type: "success",
    endpoint: "/v1/chat/completions",
    model: "gpt-4o",
    tokens: 245,
    latency: "124ms",
    timestamp: "2023-04-15 14:30:22",
  },
  {
    id: 2,
    type: "success",
    endpoint: "/v1/audio/transcriptions",
    model: "whisper-1",
    tokens: 1024,
    latency: "890ms",
    timestamp: "2023-04-15 14:28:15",
  },
  {
    id: 3,
    type: "error",
    endpoint: "/v1/embeddings",
    model: "text-embedding-3-large",
    error: "Rate limit exceeded",
    timestamp: "2023-04-15 14:25:47",
  },
  {
    id: 4,
    type: "success",
    endpoint: "/v1/chat/completions",
    model: "gpt-4o",
    tokens: 512,
    latency: "245ms",
    timestamp: "2023-04-15 14:20:33",
  },
  {
    id: 5,
    type: "success",
    endpoint: "/v1/audio/speech",
    model: "tts-1",
    tokens: 128,
    latency: "320ms",
    timestamp: "2023-04-15 14:15:12",
  },
  {
    id: 6,
    type: "success",
    endpoint: "/v1/chat/completions",
    model: "gpt-3.5-turbo",
    tokens: 320,
    latency: "98ms",
    timestamp: "2023-04-15 14:10:45",
  },
  {
    id: 7,
    type: "error",
    endpoint: "/v1/chat/completions",
    model: "gpt-4o",
    error: "Context length exceeded",
    timestamp: "2023-04-15 14:05:22",
  },
  {
    id: 8,
    type: "success",
    endpoint: "/v1/embeddings",
    model: "text-embedding-3-small",
    tokens: 512,
    latency: "78ms",
    timestamp: "2023-04-15 14:00:18",
  },
  {
    id: 9,
    type: "success",
    endpoint: "/v1/audio/transcriptions",
    model: "whisper-1",
    tokens: 2048,
    latency: "1250ms",
    timestamp: "2023-04-15 13:55:33",
  },
  {
    id: 10,
    type: "success",
    endpoint: "/v1/chat/completions",
    model: "gpt-4o",
    tokens: 1024,
    latency: "356ms",
    timestamp: "2023-04-15 13:50:27",
  },
]

export default function ApiLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">API Logs</h1>
          <p className="text-muted-foreground">Monitor and analyze your API usage</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>API Request Logs</CardTitle>
                <CardDescription>View detailed logs of all API requests</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by endpoint, model, or error..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="status-filter" className="text-sm">
                  Status:
                </Label>
                <Select defaultValue="all" onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="time-range" className="text-sm">
                  Time Range:
                </Label>
                <Select defaultValue="last-hour">
                  <SelectTrigger id="time-range" className="w-[150px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-hour">Last hour</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last-week">Last 7 days</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Endpoint</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Model</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Tokens/Error</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Latency</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {apiLogs.map((log) => (
                    <tr key={log.id} className="border-b">
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
                      <td className="p-4 align-middle">
                        {log.type === "success" ? log.tokens : <span className="text-red-600">{log.error}</span>}
                      </td>
                      <td className="p-4 align-middle">{log.type === "success" ? log.latency : "-"}</td>
                      <td className="p-4 align-middle text-muted-foreground">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>10</strong> of <strong>1,247</strong> logs
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
