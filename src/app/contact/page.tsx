"use client"

import { useState } from "react"
import { Mail, Phone, Globe2, MessageSquare, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ridedirect.eu",
    description: "We reply within 1 business day",
  },
  {
    icon: Globe2,
    label: "Coverage",
    value: "29 European Countries",
    description: "Full European market coverage",
  },
  {
    icon: MessageSquare,
    label: "Languages",
    value: "English, German, French",
    description: "Multilingual support team",
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0F1B3D] mb-3">
            Contact Us
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Have questions about buying, selling, or listing on RideDirect? We&apos;re here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold text-[#0F1B3D] text-lg mb-1">Get in Touch</h2>
              <p className="text-sm text-gray-500">
                Whether you&apos;re buying, selling, or just exploring — our team is ready to help.
              </p>
            </div>

            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-[#1B4FD8]" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                  <div className="font-medium text-[#0F1B3D] text-sm">{item.value}</div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                </div>
              </div>
            ))}

            <div className="bg-[#0F1B3D] rounded-xl p-5 text-white">
              <h3 className="font-semibold mb-2 text-sm">For urgent matters</h3>
              <p className="text-blue-200 text-xs leading-relaxed">
                If you have a time-sensitive inquiry about an active listing or a verified seller issue, please mark your subject as &quot;URGENT&quot; and we&apos;ll prioritise your message.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#0F1B3D] mb-2">Message Sent!</h3>
                <p className="text-gray-500">
                  Thank you for reaching out. We&apos;ll get back to you within 1 business day.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-semibold text-[#0F1B3D] text-lg mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" placeholder="John Smith" required className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" placeholder="john@company.com" required className="mt-1.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" placeholder="Your company name" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Select name="subject" required>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buying">Buying a ride</SelectItem>
                          <SelectItem value="selling">Selling / listing a ride</SelectItem>
                          <SelectItem value="account">Account support</SelectItem>
                          <SelectItem value="listing_issue">Issue with a listing</SelectItem>
                          <SelectItem value="partnership">Partnership enquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      required
                      rows={5}
                      className="mt-1.5"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="brand"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
