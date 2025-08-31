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

import { Editor, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Paragraph from "@tiptap/extension-paragraph"
import Heading from "@tiptap/extension-heading"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import Blockquote from "@tiptap/extension-blockquote"
import Text from "@tiptap/extension-text"

import { Redo, Undo } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  RICH TEXT EDITOR – minimal, stable, with tooltips & toggles       */
/* ------------------------------------------------------------------ */

type Props = {
  notes: string
  onChange: (value: string) => any
  disabled?: boolean
  className?: string
}

export const RichTextEditor: React.FC<Props> = ({
  notes,
  onChange = () => null,
  disabled = false,
  className,
}) => {
  const editor = useEditor(
    {
      content: notes,           // HTML in/out (MVP-friendly)
      editable: !disabled,
      extensions: [
        // Luăm doar ce folosim, restul off
        StarterKit.configure({
          paragraph: false,
          heading: false,
          bold: false,
          italic: false,
          blockquote: false,
          bulletList: false,
          orderedList: false,
          // păstrăm history, listItem etc. din StarterKit
        }),
        Paragraph.configure({
          HTMLAttributes: { class: "font-[300] text-[14px]" },
        }),
        Heading.configure({
          levels: [1, 2],
          HTMLAttributes: { class: "font-[700]" },
        }),
        Bold,
        Italic,
        Underline,
        BulletList,          // UL
        OrderedList,         // OL
        ListItem,            // necesar pentru liste
        Blockquote,
        Text,
      ],
      editorProps: {
        attributes: {
          class: cn(
            "rounded-md border-[2px] h-[200px] overflow-y-auto overflow-x-hidden border-input p-2 max-w-full bg-card",
            disabled && "bg-card/70 border-input",
            // tipografie coerentă
            "prose prose-sm dark:prose-invert max-w-none",
            "[&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2 [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:mt-3 [&_h2]:mb-1",
            className
          ),
        },
      },
      onUpdate: ({ editor }) => onChange(editor.getHTML()),
    },
    [disabled]
  )

  return (
    <div className="flex flex-col gap-2">
      {!disabled && (
        <TooltipProvider delayDuration={200}>
          <Toolbar editor={editor} />
        </TooltipProvider>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

/* ----------------------------- Toolbar ----------------------------- */

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  // Helpers pt. toggle active
  const h1Active = editor.isActive("heading", { level: 1 })
  const h2Active = editor.isActive("heading", { level: 2 })
  const pActive = editor.isActive("paragraph")

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border rounded-md bg-muted/40">
      {/* 1) TOGGLES: Bold / Italic / Underline */}
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

      {/* 2) TOGGLES: H1 / H2 / P */}
      <TBItem
        label="Heading 1"
        active={h1Active}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </TBItem>

      <TBItem
        label="Heading 2"
        active={h2Active}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </TBItem>

      <TBItem
        label="Paragraph"
        active={pActive}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        P
      </TBItem>

      <Sep />

      {/* 3) Lists + Blockquote */}
      <TBItem
        label="Listă cu buline (UL)"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        ••
      </TBItem>

      <TBItem
        label="Listă numerotată (OL)"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1.
      </TBItem>

      <TBItem
        label="Citat (Blockquote)"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        ❝
      </TBItem>

      <Sep />

      {/* 4) Undo / Redo */}
      <TBItem
        label="Undo"
        disabled={!editor.can().chain().focus().undo().run()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </TBItem>

      <TBItem
        label="Redo"
        disabled={!editor.can().chain().focus().redo().run()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </TBItem>
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