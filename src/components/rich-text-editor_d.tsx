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
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import Blockquote from "@tiptap/extension-blockquote"
import Text from "@tiptap/extension-text"
import { TextStyle } from "@tiptap/extension-text-style"
import { Extension } from "@tiptap/core"

import { Redo, Undo } from "lucide-react"

/* -------------------------- FontSize Extension -------------------------- */
/* Ușor și robust: adaugă atributul fontSize pe textStyle și comenzi set/unset */
const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            renderHTML: (attributes) =>
              attributes.fontSize
                ? { style: `font-size: ${attributes.fontSize}` }
                : {},
            parseHTML: (element) => ({
              fontSize: (element as HTMLElement).style.fontSize || null,
            }),
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setFontSize:
        (size: string) =>
          ({ chain }) =>
            chain().setMark("textStyle", { fontSize: size }).run(),
      unsetFontSize:
        () =>
          ({ chain }) =>
            chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    }
  },
})

/* --------------------------------- Types -------------------------------- */
type Props = {
  notes: string
  onChange: (value: string) => any
  disabled?: boolean
  className?: string
}

/* ---------------------------- Main Component ---------------------------- */
export const RichTextEditor: React.FC<Props> = ({
  notes,
  onChange = () => null,
  disabled = false,
  className,
}) => {
  const editor = useEditor(
    {
      content: notes, // HTML in/out – simplu pentru MVP
      editable: !disabled,
      extensions: [
        // Pornim cu StarterKit dar oprim ce nu folosim explicit
        StarterKit.configure({
          paragraph: false,
          bold: false,
          italic: false,
          blockquote: false,
          bulletList: false,
          orderedList: false,
          // history ON (undo/redo)
        }),
        Paragraph.configure({
          HTMLAttributes: { class: "font-[300] text-[14px]" },
        }),
        Bold,
        Italic,
        Underline,
        BulletList,
        OrderedList,
        ListItem,
        Blockquote,
        Text,
        TextStyle, // necesar pentru a atașa stiluri inline
        FontSize,  // extensia noastră pentru font-size
      ],
      editorProps: {
        attributes: {
          class: cn(
            "rounded-md border-[2px] h-[220px] overflow-y-auto overflow-x-hidden border-input p-2 max-w-full bg-card",
            disabled && "bg-card/70 border-input",
            "prose prose-sm dark:prose-invert max-w-none",
            "[&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2",
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

/* -------------------------------- Toolbar ------------------------------- */
function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  const isBold = editor.isActive("bold")
  const isItalic = editor.isActive("italic")
  const isUnderline = editor.isActive("underline")
  const isParagraph = editor.isActive("paragraph")
  const isUL = editor.isActive("bulletList")
  const isOL = editor.isActive("orderedList")
  const isBQ = editor.isActive("blockquote")

  const currentFontSize =
    (editor.getAttributes("textStyle")?.fontSize as string | undefined) || "16px"

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border rounded-md bg-muted/40">
      {/* Font size select */}
      <FontSizeSelect
        value={currentFontSize}
        onChange={(size) => editor.chain().focus().setFontSize(size).run()}
        onReset={() => editor.chain().focus().unsetFontSize().run()}
      />

      <Sep />

      {/* TOGGLES cu tooltips: Bold / Italic / Underline / Paragraph */}
      <TBItem
        label="Bold"
        active={isBold}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <span className="font-bold">B</span>
      </TBItem>

      <TBItem
        label="Italic"
        active={isItalic}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <span className="italic">I</span>
      </TBItem>

      <TBItem
        label="Underline"
        active={isUnderline}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </TBItem>

      <TBItem
        label="Paragraph"
        active={isParagraph}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        P
      </TBItem>

      <Sep />

      {/* Lists + Blockquote */}
      <TBItem
        label="Listă cu buline (UL)"
        active={isUL}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        ••
      </TBItem>

      <TBItem
        label="Listă numerotată (OL)"
        active={isOL}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1.
      </TBItem>

      <TBItem
        label="Citat (Blockquote)"
        active={isBQ}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        ❝
      </TBItem>

      <Sep />

      {/* Undo / Redo */}
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

/* --------------------------- Font size select --------------------------- */
function FontSizeSelect({
  value,
  onChange,
  onReset,
}: {
  value: string
  onChange: (size: string) => void
  onReset: () => void
}) {
  const sizes = ["12px", "14px", "16px", "18px", "20px", "22px"]

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <select
            className="h-8 text-sm rounded-md border px-2 bg-background"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </TooltipTrigger>
        <TooltipContent>
          <p>Font size</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-8"
            onClick={onReset}
          >
            Reset
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reset font size</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
