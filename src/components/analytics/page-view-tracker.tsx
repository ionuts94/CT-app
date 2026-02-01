"use client"

import CTEventLog from "@/sdk/event-log"
import { useEffect } from "react"

export function PageViewTracker({
  path,
  source,
}: {
  path: string
  source?: string
}) {
  useEffect(() => {
    CTEventLog.log({
      event: "page_view",
      path,
      source,
    })
  }, [path, source])

  return null
}