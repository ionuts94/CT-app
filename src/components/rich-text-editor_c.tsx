"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"

type RichTextEditorProps = {
  initialJSON?: any
  initialHTML?: string
  className?: string
  placeholder?: string
  readOnly?: boolean
  minHeight?: number
  onChange?: (payload: { json: any; html: string }) => void
  onSave?: (payload: { json: any; html: string }) => void
}

export function RichTextEditor({
  initialJSON,
  initialHTML,
  className,
  placeholder = "Scrie contractul aici…",
  readOnly = false,
  minHeight = 280,
  onChange,
  onSave,
}: RichTextEditorProps) {
  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          codeBlock: false,
          bulletList: { keepMarks: true, keepAttributes: true },
          orderedList: { keepMarks: true, keepAttributes: true },
        }),
        Underline,
        Link.configure({
          autolink: true,
          openOnClick: false,
          linkOnPaste: true,
        }),
        Placeholder.configure({ placeholder }),
      ],
      content: initialJSON ?? initialHTML ?? "<p>Contract Prestări Servicii</p>",
      editable: !readOnly,
      onUpdate: ({ editor }) => {
        onChange?.({ json: editor.getJSON(), html: editor.getHTML() })
      },
    },
    [readOnly]
  )

  return (
    <div className={cn("border rounded-lg bg-card", className)}>
      <TooltipProvider delayDuration={200}>
        {!readOnly && <Toolbar editor={editor} onSave={onSave} />}
      </TooltipProvider>

      <div className="px-4 pb-4" style={{ minHeight }}>
        <EditorContent
          editor={editor}
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none",
            // spacing fin
            "[&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2 [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:mt-4 [&_h2]:mb-2"
          )}
        />
      </div>
    </div>
  )
}

/* ============================ Toolbar ============================ */

function Toolbar({
  editor,
  onSave,
}: {
  editor: Editor | null
  onSave?: (payload: { json: any; html: string }) => void
}) {
  if (!editor) return null

  const save = () => onSave?.({ json: editor.getJSON(), html: editor.getHTML() })

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/40">
      <TBItem
        label="Bold"
        active={editor.isActive("bold")}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <span className="font-bold">B</span>
      </TBItem>

      <TBItem
        label="Italic"
        active={editor.isActive("italic")}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <span className="italic">I</span>
      </TBItem>

      <TBItem
        label="Underline"
        active={editor.isActive("underline")}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </TBItem>

      <Sep />

      <TBItem
        label="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </TBItem>
      <TBItem
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </TBItem>
      <TBItem
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </TBItem>

      <Sep />

      <TBItem
        label="Listă cu buline"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        ••
      </TBItem>

      <TBItem
        label="Listă numerotată"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1.
      </TBItem>

      <TBItem
        label="Citat (blockquote)"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        ❝
      </TBItem>

      <Sep />

      <TBItem
        label="Inserare/Editare link"
        onClick={() => toggleLink(editor)}
      >
        🔗
      </TBItem>

      <TBItem
        label="Înlătură link"
        disabled={!editor.isActive("link")}
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        ✕
      </TBItem>

      <Sep />

      <TBItem
        label="Undo"
        onClick={() => editor.chain().focus().undo().run()}
      >
        ⟲
      </TBItem>
      <TBItem
        label="Redo"
        onClick={() => editor.chain().focus().redo().run()}
      >
        ⟳
      </TBItem>

      <div className="ml-auto">
        <Button size="sm" className="h-8" onClick={save}>
          Save
        </Button>
      </div>
    </div>
  )
}

function Sep() {
  return <div className="mx-1 h-6 w-px bg-border" />
}

function TBItem({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant={active ? "default" : "ghost"}
          className="h-8"
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

/* ============================ Helpers ============================ */

function toggleLink(editor: Editor) {
  const prev = editor.getAttributes("link")?.href as string | undefined
  // prompt simplu MVP-friendly (poți schimba cu un Dialog mai târziu)
  const url = window.prompt("Introdu URL-ul", prev ?? "https://")
  if (url === null) return // cancel
  if (url === "") {
    editor.chain().focus().unsetLink().run()
    return
  }
  // dacă nu e selectat text, TipTap va aplica link pe cuvântul curent (sau nu aplica deloc)
  editor
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run()
}
