"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface UrlInputProps {
  onSubmit: (url: string) => void
  isLoading: boolean
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl gap-3 px-4 md:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Input
        type="url"
        placeholder="Paste a music link..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 h-12 px-4 text-base bg-background/50 backdrop-blur-sm border-muted"
      />
      <Button type="submit" disabled={isLoading} size="lg" className="px-6">
        <Search className="h-4 w-4 mr-2" />
        Convert
      </Button>
    </motion.form>
  )
}

