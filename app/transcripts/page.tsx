"use client"

import { useState } from "react"
import { Download, Eye, Filter, Plus, Search } from "lucide-react"

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

// Mock data for transcripts
const transcripts = [
  {
    id: 1,
    phoneNumber: "+1 (555) 123-4567",
    date: "2023-04-15",
    time: "14:30",
    duration: "3m 24s",
    status: "Completed",
  },
  {
    id: 2,
    phoneNumber: "+1 (555) 987-6543",
    date: "2023-04-15",
    time: "10:15",
    duration: "5m 12s",
    status: "Completed",
  },
  {
    id: 3,
    phoneNumber: "+1 (555) 456-7890",
    date: "2023-04-14",
    time: "16:45",
    duration: "1m 45s",
    status: "Completed",
  },
  {
    id: 4,
    phoneNumber: "+1 (555) 234-5678",
    date: "2023-04-13",
    time: "09:20",
    duration: "4m 30s",
    status: "Completed",
  },
  {
    id: 5,
    phoneNumber: "+1 (555) 345-6789",
    date: "2023-04-12",
    time: "11:05",
    duration: "2m 18s",
    status: "Completed",
  },
  {
    id: 6,
    phoneNumber: "+1 (555) 567-8901",
    date: "2023-04-11",
    time: "15:40",
    duration: "6m 52s",
    status: "Completed",
  },
  {
    id: 7,
    phoneNumber: "+1 (555) 678-9012",
    date: "2023-04-10",
    time: "13:25",
    duration: "3m 47s",
    status: "Completed",
  },
  {
    id: 8,
    phoneNumber: "+1 (555) 789-0123",
    date: "2023-04-09",
    time: "17:10",
    duration: "2m 33s",
    status: "Completed",
  },
  {
    id: 9,
    phoneNumber: "+1 (555) 890-1234",
    date: "2023-04-08",
    time: "08:55",
    duration: "4m 19s",
    status: "Completed",
  },
  {
    id: 10,
    phoneNumber: "+1 (555) 901-2345",
    date: "2023-04-07",
    time: "12:40",
    duration: "5m 05s",
    status: "Completed",
  },
]

export default function TranscriptsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Call Transcripts</h1>
          <p className="text-muted-foreground">View and manage your call transcriptions</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transcripts</CardTitle>
                <CardDescription>Browse and search through your call transcripts</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Call
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
                    placeholder="Search transcripts..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="date-range" className="text-sm">
                  Date Range:
                </Label>
                <Select defaultValue="last-week">
                  <SelectTrigger id="date-range" className="w-[180px]">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last-week">Last 7 days</SelectItem>
                    <SelectItem value="last-month">Last 30 days</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Phone Number</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Duration</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
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
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {transcript.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" title="View Transcript">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Download Transcript">
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
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>10</strong> of <strong>42</strong> transcripts
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
