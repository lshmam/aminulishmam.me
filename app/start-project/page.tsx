"use client"

import type React from "react"

import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function StartProjectPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, projectType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend or email service
    console.log(formData)
    toast({
      title: "Project Request Submitted",
      description: "Thank you for your interest. I'll get back to you soon!",
    })
    // Reset form after submission
    setFormData({ name: "", email: "", projectType: "", budget: "", description: "" })
  }

  return (
    <>
      <Sidebar />
      <main className="space-y-8">
        <h1 className="text-4xl font-bold mb-8">Start a Project</h1>
        <p className="text-xl text-gray-300 mb-8">
          Excited to bring your ideas to life? Fill out the form below, and let's start creating something amazing
          together!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-200">
              Your Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-200">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="projectType" className="text-sm font-medium text-gray-200">
              Project Type
            </label>
            <Select onValueChange={handleSelectChange} value={formData.projectType}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select a project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website Design</SelectItem>
                <SelectItem value="app">Mobile App</SelectItem>
                <SelectItem value="branding">Branding</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="budget" className="text-sm font-medium text-gray-200">
              Budget Range
            </label>
            <Input
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g. $5,000 - $10,000"
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-200">
              Project Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              className="bg-gray-800 border-gray-700"
              placeholder="Tell me about your project idea, goals, and any specific requirements."
            />
          </div>
          <Button type="submit" size="lg">
            Submit Project Request
          </Button>
        </form>
      </main>
    </>
  )
}

