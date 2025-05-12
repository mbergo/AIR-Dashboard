"use client"

import { useState } from "react"
import { BookOpen, FileText, HelpCircle, MessageSquare, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import DashboardLayout from "../dashboard-layout"

// Mock data for FAQs
const faqs = [
  {
    question: "How do I generate an API key?",
    answer:
      "To generate an API key, go to the Settings page and navigate to the API Configuration tab. Click on the 'Regenerate' button next to your API key field. Note that this will invalidate any existing API key.",
  },
  {
    question: "What models are supported?",
    answer:
      "We currently support GPT-4o, GPT-3.5 Turbo, Whisper-1 for transcription, Text Embedding models, and TTS-1 for text-to-speech. You can configure default models in the Settings page under Model Settings.",
  },
  {
    question: "How are API calls billed?",
    answer:
      "API calls are billed based on the number of tokens processed. Different models have different pricing tiers. You can view your current usage and estimated costs in the Metrics page under the Analytics section.",
  },
  {
    question: "How do I set up rate limiting?",
    answer:
      "Rate limiting can be enabled in the Settings page under the API Configuration tab. When enabled, the system will automatically limit API requests to prevent quota overages.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes, you can export your data from various pages. Look for the Export button in the top right corner of the API Logs, Transcripts, and Analytics pages.",
  },
  {
    question: "How do I add team members?",
    answer:
      "To add team members, go to the Team page and click on the 'Add Team Member' button. Enter their email address and select their role, then send the invitation.",
  },
  {
    question: "What are the different user roles?",
    answer:
      "We offer four roles: Administrator (full access), Developer (API and development access), Analyst (analytics and reporting access), and Viewer (limited read-only access). You can view detailed permissions on the Team page.",
  },
]

// Mock data for documentation categories
const docCategories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    description: "Learn the basics of using the Voice Stream API",
    articles: ["Quick Start Guide", "API Overview", "Authentication", "Making Your First API Call"],
  },
  {
    title: "API Reference",
    icon: FileText,
    description: "Detailed documentation for all API endpoints",
    articles: ["Chat Completions", "Audio Transcription", "Text Embeddings", "Text-to-Speech"],
  },
  {
    title: "Guides",
    icon: BookOpen,
    description: "Step-by-step guides for common tasks",
    articles: [
      "Implementing Voice Transcription",
      "Building a Chatbot",
      "Optimizing API Usage",
      "Error Handling Best Practices",
    ],
  },
  {
    title: "Tutorials",
    icon: FileText,
    description: "Comprehensive tutorials for advanced usage",
    articles: [
      "Creating a Voice Assistant",
      "Implementing Real-time Transcription",
      "Building a Knowledge Base",
      "Advanced Prompt Engineering",
    ],
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">Find answers and get support for Voice Stream API</p>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for help articles, FAQs, or topics..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="faq">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about Voice Stream API</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p>{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Can't find what you're looking for? Contact our support team for assistance.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="docs">
            <div className="grid gap-6 md:grid-cols-2">
              {docCategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <category.icon className="h-5 w-5 text-primary" />
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <Button variant="link" className="p-0 h-auto text-left">
                            {article}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="border rounded-md p-6 flex flex-col items-center text-center">
                    <MessageSquare className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-medium mb-2">Chat Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Chat with our support team for immediate assistance with your questions.
                    </p>
                    <Button>Start Chat</Button>
                  </div>

                  <div className="border rounded-md p-6 flex flex-col items-center text-center">
                    <HelpCircle className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-medium mb-2">Email Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send us an email and we'll get back to you within 24 hours.
                    </p>
                    <Button variant="outline">support@example.com</Button>
                  </div>
                </div>

                <div className="border rounded-md p-6">
                  <h3 className="text-lg font-medium mb-4">Submit a Support Ticket</h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="Support ticket subject" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe your issue in detail"
                      />
                    </div>
                    <Button>Submit Ticket</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
