export type VariableField = {
  key: string
  label: string
  occurrences: number
}

export function useTemplateVariables(content?: string) {
  function escapeHtml(value: string) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  function escapeHtmlAttribute(value: string) {
    return escapeHtml(value)
  }

  function annotateTemplateVariables(content: string) {
    const regex = /{{\s*([a-zA-Z0-9_.-]+)\s*}}/g

    return content.replace(regex, (_, rawKey: string) => {
      const key = rawKey.trim()
      const originalPlaceholder = `{{ ${key} }}`

      return [
        `<span`,
        ` data-template-variable="${escapeHtmlAttribute(key)}"`,
        ` data-template-original="${escapeHtmlAttribute(originalPlaceholder)}"`,
        ` data-template-empty="true"`,
        ` class="pactly-template-variable bg-yellow-200 rounded-md"`,
        `>`,
        `${escapeHtml(originalPlaceholder)}`,
        `</span>`,
      ].join("")
    })
  }

  function extractTemplateVariables(content: string) {
    const regex = /{{\s*([a-zA-Z0-9_.-]+)\s*}}/g
    const counts = new Map<string, number>()

    for (const match of content.matchAll(regex)) {
      const key = match[1].trim()
      counts.set(key, (counts.get(key) || 0) + 1)
    }

    return Array.from(counts.entries()).map(([key, occurrences]) => ({
      key,
      label: toLabel(key),
      occurrences,
    }))
  }

  function replaceTemplateVariables(
    content: string,
    values: Record<string, string>
  ) {
    let result = content

    for (const [key, value] of Object.entries(values)) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const regex = new RegExp(`{{\\s*${escapedKey}\\s*}}`, "g")
      result = result.replace(regex, () => value)
    }

    return result
  }

  function toLabel(key: string) {
    return key
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return {
    annotateTemplateVariables,
    extractTemplateVariables,
    replaceTemplateVariables
  }
  // function extractTemplateVariables(content: string) {
  //   const regex = /{{\s*([a-zA-Z0-9_.-]+)\s*}}/g
  //   const counts = new Map<string, number>()

  //   for (const match of content.matchAll(regex)) {
  //     const key = match[1].trim()
  //     counts.set(key, (counts.get(key) || 0) + 1)
  //   }

  //   return Array.from(counts.entries()).map(([key, occurrences]) => ({
  //     key,
  //     label: toLabel(key),
  //     occurrences,
  //   }))
  // }

  // function replaceTemplateVariables(
  //   content: string,
  //   values: Record<string, string>
  // ) {
  //   let result = content

  //   for (const [key, value] of Object.entries(values)) {
  //     const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  //     const regex = new RegExp(`{{\\s*${escapedKey}\\s*}}`, "g")
  //     result = result.replace(regex, () => value)
  //   }

  //   return result
  // }

  // function toLabel(key: string) {
  //   return key
  //     .replace(/[._-]+/g, " ")
  //     .replace(/\b\w/g, (char) => char.toUpperCase())
  // }

  // return {
  //   extractTemplateVariables,
  //   replaceTemplateVariables,
  //   toLabel,
  // }
}