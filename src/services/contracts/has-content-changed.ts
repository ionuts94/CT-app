
import { hashContent } from "./hash-content"

type HasContentChangedArgs = {
  currentContent: string
  newContent: string
}

export async function hasContentChanged({
  currentContent,
  newContent,
}: HasContentChangedArgs): Promise<boolean> {
  const currentHash = hashContent(currentContent)
  const newHash = hashContent(newContent)

  return newHash !== currentHash
}