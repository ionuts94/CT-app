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
import { useEffect, useState } from 'react'

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
    content: `<p><strong><span style="font-size: 28px">Contract de Prestări Servicii – Dezvoltare Aplicație Web și Mobilă</span></strong></p>
<p><strong><span style="font-size: 18px">Între:</span></strong></p>
<p>Încheiat astăzi, {{DATA_INCHEIERII}}, în {{LOCUL_INCHEIERII}}, între:</p>
<ul>
<li>Prestatorul de servicii, având sediul în {{PRESTATOR_SEDIU_ADRESA}}, reprezentat prin {{PRESTATOR_REPREZENTANT}}, în calitate de {{PRESTATOR_FUNCTIE}}, intern și internațional cunoscut sub numărul {{PRESTATOR_CUI_CNP}}, pe de o parte; și </li>
<li>Beneficiarul de servicii (denumit în continuare Beneficiar), având sediul în {{BENEFICIAR_SEDIU_ADRESA}}, reprezentat prin {{BENEFICIAR_REPREZENTANT}}, în calitate de {{BENEFICIAR_FUNCTIE}}, intern și internațional cunoscut sub numărul {{BENEFICIAR_CUI_CNP}}, pe de altă parte.</li>
</ul>
<p><strong><span style="font-size: 18px">1. DEFINIȚII</span></strong></p>
<p>În cadrul acestui contract, următorii termeni vor avea următoarele semnificații:</p>
<ul>
<li><strong>Platformă:</strong> se referă la aplicația web și aplicația mobilă dezvoltate pentru gestionarea ofertelor între distribuitori, magazine și consumatori.</li>
<li><strong>Prestator:</strong> persoana sau entitatea care oferă serviciile de dezvoltare a Platformei.</li>
<li><strong>Beneficiar:</strong> persoana sau entitatea care beneficiază de serviciile oferite de Prestator.</li>
</ul>
<p><strong><span style="font-size: 18px">2. OBIECTUL CONTRACTULUI</span></strong></p>
<p>Contractul are ca obiect prestarea de servicii de dezvoltare a unei platforme web și mobile pentru Beneficiar, denumită în continuare "Platforma". Platforma va consta în două componente esențiale:</p>
<ul>
<li>O aplicație web: care să permită distribuitorilor să creeze oferte pentru magazine și să permită magazinelor să gestioneze aceste oferte;</li>
<li>O aplicație mobilă: destinată consumatorilor, pentru vizualizarea și accesarea ofertelor.</li>
</ul>
<p><strong><span style="font-size: 18px">3. DURATA</span></strong></p>
<p>Contractul acesta este încheiat pentru o perioadă de 3 luni, cu posibilitatea de prelungire prin acordul ambelor părți. Dată de începere a contractului este {{DATA_START}}, iar data de terminare este {{DATA_END}}.</p>
<p><strong><span style="font-size: 18px">4. GUVERNANȚĂ DE PROIECT</span></strong></p>
<p>Detalii despre guvernanța proiectului vor fi stabilite de comun acord între părți.</p>
<p><strong><span style="font-size: 18px">5. SPECIFICAȚII, LIVRABILE, ACCEPTANȚĂ</span></strong></p>
<p>Specificațiile și livrabilele vor fi stabilite în detaliu în Anexa 1 – Caiet de Sarcini (SOW).</p>
<p><strong><span style="font-size: 18px">6. MODIFICĂRI (CHANGE REQUEST)</span></strong></p>
<p>Orice modificare a specificațiilor inițiale va fi gestionată printr-un proces formal de solicitare de modificare.</p>
<p><strong><span style="font-size: 18px">7. ONORARII, TAXE, PLATĂ</span></strong></p>
<p>Plata pentru serviciile prestate de către Prestator se va face la tariful de 20 de dolari SUA pe oră. Facturarea se va efectua lunar, iar factura emisă de Prestator trebuie achitată în termen de 10 zile de la data emiterii.</p>
<p><strong><span style="font-size: 18px">8. TIMP DE LUCRU ȘI RAPORTARE</span></strong></p>
<p>Detalii despre timpul de lucru și raportare vor fi stabilite de comun acord între părți.</p>
<p><strong><span style="font-size: 18px">9. MEDII, CONTURI ȘI PUBLICARE</span></strong></p>
<p>Detalii despre medii, conturi și publicare vor fi stabilite de comun acord între părți.</p>
<p><strong><span style="font-size: 18px">10. PROPRIETATE INTELECTUALĂ</span></strong></p>
<p>Proprietatea intelectuală asupra Platformei va fi reglementată conform legislației în vigoare.</p>
<p><strong><span style="font-size: 18px">11. CONFIDENȚIALITATE ȘI PROTECȚIA DATELOR</span></strong></p>
<p>Ambele părți se angajează să mențină confidențialitatea informațiilor la care au acces în cadrul executării acestui contract. Niciuna dintre părți nu va folosi, dezvălui, divulga, distribui sau face publice informațiile confidențiale decât cu acordul prealabil, exprimat în scris, al celeilalte părți sau dacă acest lucru este impus de lege. De asemenea, părțile se angajează să respecte reglementările legale privind protecția datelor personale.</p>
<p><strong><span style="font-size: 18px">12. SUBCONTRACTARE</span></strong></p>
<p>Prestatorul poate subcontracta anumite servicii, cu condiția să informeze Beneficiarul și să obțină acordul acestuia.</p>
<p><strong><span style="font-size: 18px">13. GARANȚIE, MENTENANȚĂ ȘI SUPORT</span></strong></p>
<p>Detalii despre garanție, mentenanță și suport vor fi stabilite în Anexa 2 – SLA Suport și Mentenanță.</p>
<p><strong><span style="font-size: 18px">14. DECLARAȚII ȘI GARANȚII</span></strong></p>
<p>Ambele părți declară că au capacitatea legală de a încheia acest contract.</p>
<p><strong><span style="font-size: 18px">15. RĂSPUNDERE. LIMITARE</span></strong></p>
<p>Răspunderea părților va fi limitată conform legislației în vigoare.</p>
<p><strong><span style="font-size: 18px">16. DESPĂGUBIRI (INDEMNIZAȚII)</span></strong></p>
<p>Fiecare parte se angajează să despăgubească cealaltă parte pentru orice daune cauzate de neîndeplinirea obligațiilor contractuale.</p>
<p><strong><span style="font-size: 18px">17. FORȚĂ MAJORĂ</span></strong></p>
<p>Ambele părți sunt exonerate de răspundere în cazul unor evenimente de forță majoră, conform legislației în vigoare.</p>
<p><strong><span style="font-size: 18px">18. REZILIERE</span></strong></p>
<p>Contractul poate fi reziliat de oricare dintre părți, cu notificare prealabilă de 30 de zile.</p>
<p><strong><span style="font-size: 18px">19. ANTI-CORUPȚIE ȘI CONFORMITATE</span></strong></p>
<p>Ambele părți se angajează să respecte legislația aplicabilă în domeniul anti-corupției.</p>
<p><strong><span style="font-size: 18px">20. LEGEA APLICABILĂ ȘI JURISDICȚIA</span></strong></p>
<p>Contractul este reglementat de legea română. Orice litigiu apărut între părți se va soluționa pe cale amiabilă sau, în cazul în care aceasta nu este posibilă, litigiul va fi soluționat de instanța competentă din {{JUDECATORIA_TRIBUNAL}}.</p>
<p><strong><span style="font-size: 18px">21. NOTIFICĂRI</span></strong></p>
<p>Orice notificare, cerere, cerere sau alte comunicări ce trebuie făcute sau permise de către părți conform prezentului contract, vor fi în scris și vor fi considerate a fi fost valabil date sau făcute atunci când vor fi înmânate personal sau trimise prin e-mail la adresa de e-mail a Beneficiarului, {{BENEFICIAR_EMAIL}}, sau a Prestatorului, {{PRESTATOR_EMAIL}}.</p>
<p><strong><span style="font-size: 18px">22. CESIONARE</span></strong></p>
<p>Ambele părți convin asupra faptului că niciunul dintre ele nu poate ceda sau transfera oricare dintre drepturile și obligațiile sale prevăzute de prezentul contract fără acordul prealabil scris al celeilalte părți.</p>
<p><strong><span style="font-size: 18px">23. ÎNTREGUL ACORD. MODIFICĂRI</span></strong></p>
<p>Acest contract constituie înțelegerea completă și exclusivă între părți cu privire la subiectul său și înlocuiește toate discuțiile, negocierile, acordurile și înțelegerile anterioare între părți cu privire la subiectul său.</p>
<p><strong><span style="font-size: 18px">24. SEMNĂTURI</span></strong></p>
<table class="signature" role="presentation">
  <colgroup><col style="width:50%"/><col style="width:50%"/></colgroup>
  <tbody>
    <tr>
      <td>
        <strong>Prestator</strong><br/>
        Denumire/Nume: {{PRESTATOR_DENUMIRE}}<br/>
        {{PRESTATOR_SOCIETATE_TIP}} | {{PRESTATOR_CUI_CNP}}<br/>
        Sediu/Domiciliu: {{PRESTATOR_SEDIU_ADRESA}}<br/>
        Reprezentant: {{PRESTATOR_REPREZENTANT}} — {{PRESTATOR_FUNCTIE}}<br/>
        E-mail: {{PRESTATOR_EMAIL}}<br/><br/>
        Semnătură: ____________________<br/>
        Ștampilă (dacă este cazul)
      </td>
      <td>
        <strong>Beneficiar</strong><br/>
        Denumire/Nume: {{BENEFICIAR_DENUMIRE}}<br/>
        {{BENEFICIAR_SOCIETATE_TIP}} | {{BENEFICIAR_CUI_CNP}}<br/>
        Sediu/Domiciliu: {{BENEFICIAR_SEDIU_ADRESA}}<br/>
        Reprezentant: {{BENEFICIAR_REPREZENTANT}} — {{BENEFICIAR_FUNCTIE}}<br/>
        E-mail: {{BENEFICIAR_EMAIL}}<br/><br/>
        Semnătură: ____________________<br/>
        Ștampilă (dacă este cazul)
      </td>
    </tr>
  </tbody>
</table>`,
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

  useEffect(() => {
    if (!content) return;
    editor?.commands.setContent(content, { emitUpdate: true })
  }, [content])

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