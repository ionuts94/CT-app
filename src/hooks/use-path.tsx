import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export const usePath = () => {
  const pathname = usePathname()
  const [pathItems, setPathItems] = useState(() => pathname.startsWith('/')
    ? pathname.slice(1).split('/')
    : pathname.split('/')
  )

  const isSelectedPath = (path: string) => {
    const justPath = path.slice(1).toLocaleLowerCase()

    if (justPath === "" && pathItems[0] === "") return true;

    return pathItems[0].toLowerCase() === justPath
  }

  useEffect(() => {
    setPathItems(() => pathname.startsWith('/')
      ? pathname.slice(1).split('/')
      : pathname.split('/'))
  }, [pathname])

  return {
    pathItems,
    isSelectedPath
  }
}