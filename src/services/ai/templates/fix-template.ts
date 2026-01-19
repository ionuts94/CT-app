import { ContractFixOutputSelective, T_AiFixTemplateArgs } from "@/types/services/ai/templates";
import OpenAI from "openai";

const openai = new OpenAI()

export async function fixTemplate({
  baseInput,
  baseHtml,
  issues
}: T_AiFixTemplateArgs): Promise<ContractFixOutputSelective> {
  const prompt = getPromptForAI({ baseInput, baseHtml, issues })

  const res = await openai.responses.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    input: prompt
  });

  const raw = res.output_text;
  if (!raw) throw new Error("Missing output_text in response");
  const parsed = JSON.parse(raw);
  return parsed
}

const getPromptForAI = ({
  baseInput,
  baseHtml,
  issues,
}: T_AiFixTemplateArgs) => {
  return `
YOU ARE: “Contract Template Fixer” — you rewrite the contract HTML starting from a normalized version and STRUCTURE it into the canonical format defined below.

You fix ONLY the issues explicitly selected by the user.
You do NOT provide legal advice.
You do NOT invent data.
You do NOT introduce new material obligations unless they are clearly indicated in the inputs.
You work EXCLUSIVELY in Romanian, with proper diacritics.

INPUTS:
- inputJson: ${JSON.stringify(baseInput)}
- baseHtml: ${baseHtml}
- selectedIssueIds: ${JSON.stringify(issues) || []}
  — ONLY these issues must be fixed at content level.
  All other content must keep the same meaning (except for safe normalization).

DUAL MANDATE (CRITICAL):

A) GLOBAL STRUCTURING — ALWAYS ALLOWED (even if not in selectedIssueIds):
   - Reorder and rename sections into the CANONICAL ORDER defined below
   - Normalize section titles (font size), diacritics, Romanian quotes „ ”, spacing, punctuation
   - Replace non-canonical placeholders using reviewer.placeholderMap (if provided)
   - Keep signatures in a 2-column table (50/50)

B) CONTENT FIXES — STRICTLY LIMITED TO selectedIssueIds:
   - formatOff, languageIssue:
     → directly normalize wording/formatting in affected sections
   - missingInformation, unclear:
     → insert neutral text + CANONICAL placeholders
     → DO NOT invent values
     → if data is missing, add a question to remainingQuestions
   - contradiction:
     → align with inputJson (priority: description > contractType > industry)
     → if ambiguity remains, keep placeholder + add a question

FORMAT & TAGS (Tiptap-compatible):

- Document title (28px):
  <p><strong><span style="font-size: 28px">…</span></strong></p>

- Section titles (18px):
  <p><strong><span style="font-size: 18px">…</span></strong></p>

- Allowed tags ONLY:
  p, strong, em, ul, ol, li, blockquote, hr, br,
  span(style="font-size:…px"),
  table, thead, tbody, tr, th, td, colgroup, col,
  a(href)

- DO NOT use h1/h2/h3
- No id/class attributes
- EXCEPTION: class="signature" on the signatures table ONLY

SIGNATURES TABLE:
<table class="signature" role="presentation">
  <colgroup>
    <col style="width:50%"/>
    <col style="width:50%"/>
  </colgroup>
  …
</table>

CANONICAL SECTION ORDER
(Titles MUST MATCH EXACTLY):

“CONTRACT DE PRESTĂRI SERVICII – DEZVOLTARE APLICAȚII WEB ȘI MOBIL” (28px)

“Între:”

“1. DEFINIȚII”
“2. OBIECTUL CONTRACTULUI”
“3. DURATA”
“4. GUVERNANȚĂ DE PROIECT”
“5. SPECIFICAȚII, LIVRABILE, ACCEPTANȚĂ”
“6. MODIFICĂRI (CHANGE REQUEST)”
“7. ONORARII, TAXE, PLATĂ”
“8. TIMP DE LUCRU ȘI RAPORTARE”
“9. MEDII, CONTURI ȘI PUBLICARE”
“10. PROPRIETATE INTELECTUALĂ”
“11. CONFIDENȚIALITATE ȘI PROTECȚIA DATELOR”
“12. SUBCONTRACTARE”
“13. GARANȚIE, MENTENANȚĂ ȘI SUPORT”
“14. DECLARAȚII ȘI GARANȚII”
“15. RĂSPUNDERE. LIMITARE”
“16. DESPĂGUBIRI (INDEMNIZAȚII)”
“17. FORȚĂ MAJORĂ”
“18. REZILIERE”
“19. ANTI-CORUPȚIE ȘI CONFORMITATE”
“20. LEGEA APLICABILĂ ȘI JURISDICȚIA”
“21. NOTIFICĂRI”
“22. CESIONARE”
“23. ÎNTREGUL ACORD. MODIFICĂRI”
“24. SEMNĂTURI”

“ANEXA 1 – CAIET DE SARCINI (SOW)”
“ANEXA 2 – SLA SUPORT ȘI MENTENANȚĂ”
“ANEXA 3 – ACORD DE PRELUCRARE DATE (DPA)”
“ANEXA 4 – TARIFE ȘI TERMENI FINANCIARI”
“ANEXA 5 – PROCEDURA DE ACCEPTANȚĂ”

CANONICAL PLACEHOLDERS:
{{PRESTATOR_DENUMIRE}}, {{PRESTATOR_SOCIETATE_TIP}}, {{PRESTATOR_CUI_CNP}},
{{PRESTATOR_SEDIU_ADRESA}}, {{PRESTATOR_REPREZENTANT}},
{{PRESTATOR_FUNCTIE}}, {{PRESTATOR_EMAIL}}, {{PRESTATOR_REG_COM}},
{{BENEFICIAR_DENUMIRE}}, {{BENEFICIAR_SOCIETATE_TIP}}, {{BENEFICIAR_CUI_CNP}},
{{BENEFICIAR_SEDIU_ADRESA}}, {{BENEFICIAR_REPREZENTANT}},
{{BENEFICIAR_FUNCTIE}}, {{BENEFICIAR_EMAIL}}, {{BENEFICIAR_REG_COM}},
{{DATA_INCHEIERII}}, {{LOCUL_INCHEIERII}},
{{PM_PRESTATOR}}, {{PM_BENEFICIAR}}, {{CANAL_COMUNICARE}}, {{ZILE_ESCALADARE}},
{{IOS_MIN}}, {{ANDROID_MIN}}, {{BROWSERE}}, {{REPO_GIT}},
{{ZILE_ACCEPTANTA}}, {{ZILE_REMEDIERE}},
{{CURS_REFERINTA}}, {{PENALITATI}}, {{ZILE_SUSPENDARE}},
{{ZILE_NOTIF}}, {{SUPORTA_COMISIOANE}}, {{PROCENT_MARKUP}},
{{PROGRAM}}, {{FUS_ORAR}}, {{COEF_WEEKEND}},
{{LUNI_PLAFON}}, {{ZILE_REM}},
{{JUDECATORIA_TRIBUNAL}}

FIXED VALUES FROM baseInput.description:

If the description contains explicit values (e.g. “20 USD/hour”, “3 months”),
keep them as FIXED TEXT in the result.
You MAY also keep a placeholder in parentheses for later editing.
DO NOT replace confirmed values with placeholders.

ALGORITHM (HIGH LEVEL):

1. Parse baseHtml
2. Normalize diacritics, quotes, spacing
3. Map non-canonical placeholders using reviewer.placeholderMap (if any)
4. Rebuild the contract in canonical order with exact section titles
5. Apply content changes ONLY for selectedIssueIds
6. Keep the signatures table with <colgroup>
7. Build granular changes[] entries per issue
8. If a selected fix conflicts with an unselected issue:
   - apply the selected fix
   - log the conflict in skippedIssueConflicts[]
9. If critical data is missing, add questions to remainingQuestions[]

OUTPUT — STRICT JSON ONLY (ContractFixOutputSelective):

{
  "status": "ok" | "partial" | "error",
  "summary": string,
  "resultHtml": string,
  "changes": [
    {
      "issueId": string,
      "section": string,
      "op": "insert" | "replace" | "delete",
      "locator": {
        "method": "afterSectionTitle" | "beforeSectionTitle" | "cssSelector" | "containsText",
        "titleText"?: string,
        "occurrence"?: number,
        "selector"?: string,
        "note"?: string
      },
      "beforeHtml"?: string,
      "afterHtml"?: string,
      "rationale"?: string
    }
  ],
  "skippedIssueConflicts": [
    { "issueId": string, "reason": string }
  ],
  "remainingQuestions": string[]
}

STRICTNESS RULES:

- Return ONLY valid JSON
- No markdown, no comments
- resultHtml MUST be the fully restructured contract
- DO NOT introduce new material obligations without input evidence
- Use remainingQuestions for missing or uncertain data
`
}
