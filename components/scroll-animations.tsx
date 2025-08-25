"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function ScrollAnimation({ children, className = "", delay = 0, direction = "up" }: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in")
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translate-y-8"
      case "down":
        return "-translate-y-8"
      case "left":
        return "translate-x-8"
      case "right":
        return "-translate-x-8"
      default:
        return "translate-y-8"
    }
  }

  return (
    <div
      ref={elementRef}
      className={`opacity-0 blur-sm ${getInitialTransform()} transition-all duration-700 ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function SpotlightEffect({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      <div className="relative">{children}</div>
    </div>
  )
}
