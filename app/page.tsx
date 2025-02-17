"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Music2 } from "lucide-react"
import { UrlInput } from "@/components/url-input"
import { PlatformLinks } from "@/components/platform-links"
import { AnimatedTitle } from "@/components/animated-title"
import { LoadingAnimation } from "@/components/loading-animation"
import { Button } from "@/components/ui/button"
import { getSongLinks } from "./actions"
import { CreditLine } from "@/components/credit-line"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [links, setLinks] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("darkMode", (!isDarkMode).toString())
  }

  const handleSubmit = async (url: string) => {
    setIsLoading(true)
    setError(null)
    setLinks(null)
    try {
      const data = await getSongLinks(url)

      const formattedLinks = Object.entries(data.linksByPlatform).map(([platform, info]: [string, any]) => ({
        platform,
        url: info.url,
      }))

      setLinks({
        links: formattedLinks,
        title: data.entitiesByUniqueId[data.entityUniqueId]?.title,
        artist: data.entitiesByUniqueId[data.entityUniqueId]?.artistName,
        album: data.entitiesByUniqueId[data.entityUniqueId]?.albumName,
        coverUrl: data.entitiesByUniqueId[data.entityUniqueId]?.thumbnailUrl,
      })
    } catch (err) {
      setError("Failed to fetch song links. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
      </Head>
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 transition-colors duration-300">
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-4 right-4"
        >
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-2xl"
        >
          <AnimatedTitle />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-muted-foreground text-lg"
          >
            Convert music links between Spotify, Apple Music, and more
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-destructive text-sm bg-destructive/10 px-4 py-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingAnimation />
            </motion.div>
          )}

          {links && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <PlatformLinks
                links={links.links}
                title={links.title}
                artist={links.artist}
                album={links.album}
                coverUrl={links.coverUrl}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!links && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center space-y-4"
          >
            <Music2 className="h-16 w-16 mx-auto text-primary" />
            <p className="text-muted-foreground">Paste a music link above to get started</p>
          </motion.div>
        )}
      </main>
      <CreditLine />
    </div>
  )
}

