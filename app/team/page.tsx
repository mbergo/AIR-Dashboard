"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Trash, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "../dashboard-layout"

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Marcus Bergo",
    email: "marcus@example.com",
    role: "Administrator",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "5 minutes ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Analyst",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "3 hours ago",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "Yesterday",
  },
  {
    id: 5,
    name: "David Kim",
    email: "david@example.com",
    role: "Viewer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2 days ago",
  },
]

export default function TeamPage() {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground">Manage team members and their access permissions</p>
          </div>
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>Invite a new team member to your organization.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="developer">
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administrator">Administrator</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddMemberOpen(false)}>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage your team members and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Last Active</th>
                    <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="border-b">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant={
                            member.role === "Administrator"
                              ? "default"
                              : member.role === "Developer"
                                ? "secondary"
                                : member.role === "Analyst"
                                  ? "outline"
                                  : "outline"
                          }
                        >
                          {member.role}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-muted-foreground">{member.lastActive}</td>
                      <td className="p-4 align-middle text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Manage access levels for each role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Administrator</h3>
                  <p className="text-sm text-muted-foreground mb-2">Full access to all features and settings</p>
                  <ul className="text-sm space-y-1">
                    <li>• Manage team members and roles</li>
                    <li>• Configure API settings</li>
                    <li>• View all analytics and logs</li>
                    <li>• Manage billing and subscriptions</li>
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Developer</h3>
                  <p className="text-sm text-muted-foreground mb-2">Access to API and development features</p>
                  <ul className="text-sm space-y-1">
                    <li>• View and use API endpoints</li>
                    <li>• Access analytics and logs</li>
                    <li>• Configure model settings</li>
                    <li>• Limited access to team management</li>
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Analyst</h3>
                  <p className="text-sm text-muted-foreground mb-2">Access to analytics and reporting</p>
                  <ul className="text-sm space-y-1">
                    <li>• View all analytics and reports</li>
                    <li>• Access logs and transcripts</li>
                    <li>• Read-only access to settings</li>
                    <li>• No team management access</li>
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Viewer</h3>
                  <p className="text-sm text-muted-foreground mb-2">Limited read-only access</p>
                  <ul className="text-sm space-y-1">
                    <li>• View basic analytics</li>
                    <li>• View transcripts</li>
                    <li>• No access to settings</li>
                    <li>• No team management access</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Permissions
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>Track and manage pending team invitations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No Pending Invitations</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  There are currently no pending invitations to join your team.
                </p>
                <Button variant="outline" onClick={() => setIsAddMemberOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Invite Team Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
