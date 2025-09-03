"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Bold, Italic, List, ListOrdered, Minus, Quote, Redo, Strikethrough, Undo } from 'lucide-react'
import { Editor, EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { FontSize, TextStyle } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from './ui/toggle'
import { Text } from './topography'
import { cn } from '@/lib/utils'
import { AiTemplateWriteDialog } from '@/app/templates/[templateId]/components/ai-template-write-dialog'
import { useState } from 'react'

type EditorProps = {
  disabled?: boolean,
  className?: string,
  content?: string,
  onChange?: (htmlString: string) => any,
}

export const RichTextEditor: React.FC<EditorProps> = ({ disabled, className, content, onChange = () => null }) => {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editable: !disabled,
    extensions: [StarterKit, TextStyle, FontSize],
    content: content,
    editorProps: {
      attributes: {
        class: cn(
          "rounded-md border min-h-[400px] max-h-[800px] overflow-y-auto overflow-x-hidden p-2 max-w-full",
          "prose prose-sm dark:prose-invert max-w-none",
          "[&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2",
          "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6",
          "[&_blockquote]:border-l [&_blockquote]:border-muted-foreground/40 [&_blockquote]:pl-4 [&_blockquote]:italic",
          "focus:outline-none focus:ring-0",
          "border-sidebar-primary bg-muted/40",
          className
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}

function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        fontSize: ctx.editor.getAttributes("textStyle").fontSize || "16px"
      }
    },
  })

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border rounded-md bg-muted/40 justify-between">
      <div className="flex items-center gap-1">
        <MenuBarItem
          label="Bold"
          active={editorState.isBold}
          disabled={!editorState.canBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </MenuBarItem>

        <MenuBarItem
          label="Italic"
          active={editorState.isItalic}
          disabled={!editorState.canItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </MenuBarItem>

        <MenuBarItem
          label="Strike Through"
          active={editorState.isStrike}
          disabled={!editorState.canStrike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </MenuBarItem>

        <Sep />

        <div className='flex items-center gap-2 px-2'>
          <Text size='sm'>Font size:</Text>
          <FontSizeSelect
            onValueChange={(newValue) => editor.chain().focus().setFontSize(newValue).run()}
            value={editorState.fontSize}
          />
        </div>

        <Sep />

        <MenuBarItem
          label="Unordered List"
          active={editorState.isBulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </MenuBarItem>

        <MenuBarItem
          label="Ordered List"
          active={editorState.isOrderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </MenuBarItem>

        <MenuBarItem
          label="Block Quote"
          active={editorState.isBlockquote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote />
        </MenuBarItem>

        <MenuBarItem
          label="Horizontal Line"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus />
        </MenuBarItem>

        <Sep />

        <MenuBarItem
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo />
        </MenuBarItem>

        <MenuBarItem
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo />
        </MenuBarItem>
      </div>
      <AiTemplateWriteDialog
        onGenerateTemplate={(html: string) => {
          editor?.commands.setContent(html, { emitUpdate: true })
          editor?.commands.focus('end')
        }}
      />
    </div>
  )
}

type Props = {
  onClick?: () => any,
  children?: React.ReactNode,
  label: string,
  className?: string,
  active?: boolean,
  disabled?: boolean
}

export const MenuBarItem: React.FC<Props> = ({ onClick = () => null, children, label, className, active, disabled }) => {
  const activeItemClass = "bg-primary text-secondary hover:bg-primary/60 hover:text-secondary"

  return (
    <Tooltip>
      <TooltipTrigger
        asChild
        type='button'
        className={cn("hover:cursor-pointer", className)}
      >
        <Toggle
          type='button'
          disabled={disabled}
          onClick={onClick}
          onMouseDown={(e) => e.preventDefault()}
          className={cn(active && activeItemClass)}
        >
          {children}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent className="bg-primary text-white rounded-md text-[14px] py-1 px-2">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}


type FontSizeSelectProps = {
  onValueChange: (newValue: string) => any,
  value: string,
}

export const FontSizeSelect: React.FC<FontSizeSelectProps> = ({ onValueChange = () => null, value }) => {
  const STARTING_FONT_SIZE = 8
  const ENDING_FONT_SIZE = 48

  const selectItems = []
  for (let i = STARTING_FONT_SIZE; i <= ENDING_FONT_SIZE; i++) {
    selectItems.push(`${i}px`)
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select fontsize" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectItems.map(selectItem => (
            <SelectItem key={selectItem} value={selectItem}>{selectItem}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function Sep() {
  return <div className="mx-1 h-8 w-[2px] bg-border" />
}