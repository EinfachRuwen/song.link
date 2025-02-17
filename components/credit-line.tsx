"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function CreditLine() {
  return (
    <motion.div
      className="text-center text-sm text-muted-foreground mt-8"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href="https://by0.link"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors duration-200"
      >
        Created by EinfachRuwen
      </Link>
    </motion.div>
  )
}

