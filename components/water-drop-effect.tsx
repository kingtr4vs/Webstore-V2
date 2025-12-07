"use client"

import { useEffect, useCallback } from "react"

export function WaterDropEffect() {
  const createRipple = useCallback((e: MouseEvent) => {
    const ripple = document.createElement("div")
    ripple.className = "water-ripple"
    ripple.style.left = `${e.clientX}px`
    ripple.style.top = `${e.clientY}px`
    document.body.appendChild(ripple)

    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove()
    }, 600)
  }, [])

  useEffect(() => {
    document.addEventListener("click", createRipple)
    return () => {
      document.removeEventListener("click", createRipple)
    }
  }, [createRipple])

  return null
}
