"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => { 
    if (resolvedTheme === "light") {
      setTheme("dark")
    } else if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("system")
    }
  }

  // Return null until mounted to prevent hydration issues
  if (!mounted) return null

  return (
    <button
      onClick={handleThemeToggle}
      className="w-12 h-12 bg-dl-neutral-white text-dl-black-gray font-sans font-semibold cursor-pointer select-none hover:bg-dl-mid-purple hover:text-dl-black-gray active:translate-y-2 active:[box-shadow:0_0px_0_0_#beadff,0_0px_0_0_#1b70f841] active:border-b-[0px] transitionI transition-all duration-150 [box-shadow:0_5px_0_0_#beadff,0_7px_0_0_#efebff41] rounded-full border-[1px] border-dl-purple flex justify-center items-center"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dl-red hover:text-dl-black-gray"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (resolvedTheme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dl-red hover:text-dl-black-gray"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ):(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dl-red hover:text-dl-black-gray"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ))}
    </button>
  )
}