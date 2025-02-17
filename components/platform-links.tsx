"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"
import { getPlatformIcon } from "./platform-icons"

interface PlatformLink {
  url: string
  platform: string
}

interface PlatformLinksProps {
  links: PlatformLink[]
  title?: string
  artist?: string
  album?: string
  coverUrl?: string
  isLoading?: boolean
}

export function PlatformLinks({ links, title, artist, album, coverUrl, isLoading }: PlatformLinksProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (url: string, index: number) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-xl mx-auto backdrop-blur-sm bg-background/50">
        <CardHeader className="space-y-2">
          <motion.div
            className="h-8 w-2/3 bg-muted rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="h-4 w-1/2 bg-muted rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
          />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="h-12 bg-muted rounded-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.1 }}
            />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-xl mx-auto backdrop-blur-sm bg-background/50">
      <CardHeader className="flex flex-row items-center gap-4">
        {coverUrl && (
          <Image
            src={coverUrl || "/placeholder.svg"}
            alt={`${title} cover`}
            width={80}
            height={80}
            className="rounded-lg shadow-md"
          />
        )}
        <div>
          <CardTitle className="text-2xl font-bold">{title || "Track Information"}</CardTitle>
          {artist && <CardDescription className="text-lg">{artist}</CardDescription>}
          {album && <CardDescription className="text-sm text-muted-foreground">{album}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {links.map((link, index) => {
          const platform = link.platform.toLowerCase()
          const icon = getPlatformIcon(platform)

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm font-medium capitalize">
                  {link.platform.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(link.url, index)}
                  className="h-8 px-3 hover:bg-secondary"
                >
                  {copiedIndex === index ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 px-3 hover:bg-secondary inline-flex items-center justify-center"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}

