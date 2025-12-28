import { useCallback, useEffect, useRef, useState } from "react"

export function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(() => {
    setSecondsLeft(initialSeconds)
  }, [initialSeconds])

  const reset = useCallback(() => {
    setSecondsLeft(0)
  }, [])

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [secondsLeft])

  return {
    secondsLeft,
    isActive: secondsLeft > 0,
    start,
    reset,
  }
}
