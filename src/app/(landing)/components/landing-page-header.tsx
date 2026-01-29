"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PactlyLogo } from "@/components/logo"
import { LandingPageWidth } from "./landing-page-width"
import {
  LandingPageDesktopNavigation,
  LandingPageMobileNavigation
} from "./landing-page-navigation"

const HEADER_HEIGHT = 94
const STICKY_HEIGHT = 54

export const LandingPageHeader = () => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY >= HEADER_HEIGHT)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const stickyHeightClass = "h-[54px]"
  const unstickyHeightClass = "h-[94px]"

  return (
    <>
      {/* Spacer – stabilitate layout */}
      <div style={{ height: HEADER_HEIGHT }} />

      {/* Header real */}
      <header
        className={[
          "fixed left-0 right-0 top-0 z-50 bg-white border-b transition-all duration-300 ease-out",
          isSticky ? "shadow-[0_1px_0_rgba(0,0,0,0.04)]" : ""
        ].join(" ")}
      >
        <LandingPageWidth
          className={[
            "flex items-center justify-between transition-all duration-300 ease-out",
            isSticky ? stickyHeightClass : unstickyHeightClass
          ].join(" ")}
        >
          <Link href="/" className="flex items-center justify-center w-full md:w-fit absolute">
            <PactlyLogo
              className={[
                "transition-all duration-300",
                isSticky ? "h-[28px]" : "h-[40px]"
              ].join(" ")}
            />
          </Link>

          <div className="md:hidden absolute right-6">
            <LandingPageMobileNavigation />
          </div>

          <div className="hidden md:block w-full">
            <LandingPageDesktopNavigation isSticky={isSticky} />
          </div>
        </LandingPageWidth>
      </header>
    </>
  )
}
