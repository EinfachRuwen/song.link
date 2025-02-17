"use client"

import { motion } from "framer-motion"

export function AnimatedTitle() {
  const titleText = "Song Link Converter"

  return (
    <h1 className="text-4xl md:text-5xl font-bold text-center">
      {titleText.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  )
}

