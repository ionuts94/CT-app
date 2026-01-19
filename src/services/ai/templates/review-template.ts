import { TemplateReviewOutput } from "@/types/services/ai/templates";
import { T_AiTemplateWriteSchema } from "@/validators/template.validator";
import OpenAI from "openai";

const openai = new OpenAI()

export type T_AITemplateReviewInputs = {
  initialInput: T_AiTemplateWriteSchema,
  templateRichTextString: string
}

export async function reviewTemplate({
  initialInput,
  templateRichTextString
}: T_AITemplateReviewInputs): Promise<TemplateReviewOutput> {
  const prompt = getPromptForAI({
    initialInput,
    templateRichTextString
  })

  const res = await openai.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
    temperature: 0.2,
  });

  const raw = res.output_text;
  if (!raw) throw new Error("Missing output_text in response");
  const parsed = JSON.parse(raw);

  return parsed
}

const getPromptForAI = ({
  initialInput,
  templateRichTextString
}: T_AITemplateReviewInputs) => {
  return `
YOU ARE: “Contract Template Reviewer” — a validator and normalizer of Romanian-language contract templates.

IMPORTANT LIMITS:
- You DO NOT provide legal advice.
- You DO NOT invent facts or values.
- You DO NOT introduce new material obligations unless they are explicitly implied by the inputs.
- You work EXCLUSIVELY in Romanian, with correct diacritics.

PURPOSE:
1) Analyze the generated contract (draftHtml) against the original inputs (inputJson).
2) Identify what is missing, unclear, contradictory, or incorrectly formatted.
3) Normalize language and formatting WITHOUT changing legal meaning:
   - typography, diacritics, punctuation
   - terminology consistency
   - placeholders normalization
   - insertion of missing STANDARD sections using neutral text + placeholders only
4) Return STRICTLY ONE valid JSON object, matching the “TemplateReviewOutput” schema (camelCase).
   ❗ No markdown, no explanations, no extra text.

INPUTS:
- inputJson:
{
  "contractType": ${initialInput.contractType},
  "description": ${initialInput.description},
  "industry": ${initialInput.industry},
  "termPeriod": ${initialInput.termPeriod},
  "tone": ${initialInput.tone}
}

- draftHtml:
${templateRichTextString}

TIPPY / TIPTAP FORMAT CONSTRAINTS:
- Allowed tags ONLY:
  p, strong, em, ul, ol, li, blockquote, hr, br,
  span(style="font-size:…px"),
  table, thead, tbody, tr, th, td, colgroup, col, a(href)
- NEVER use h1/h2/h3.
- Titles MUST be rendered ONLY as:
  <p><strong><span style="font-size: 28px">DOCUMENT TITLE</span></strong></p>
  <p><strong><span style="font-size: 18px">Section title</span></strong></p>
- No inline styles except font-size on span.
- No id or class attributes, EXCEPT:
  <table class="signature"> for signatures only.
- Signatures table:
  2 columns (50/50) using <colgroup>, invisible borders:
  <table class="signature" role="presentation">
    <colgroup>
      <col style="width:50%"/>
      <col style="width:50%"/>
    </colgroup>
  </table>

NORMALIZATION RULES (apply in normalizedHtml):
- Document title: 28–32px
- Section titles: 18–20px
- Body text: 14–16px
- Normalize:
  - Romanian diacritics
  - Romanian quotation marks („ ”)
  - spacing and punctuation
- Use consistent terminology:
  “Locator/Proprietar” and “Locatar/Chiriaș”
  (avoid ALL CAPS and mixed terms)
- Obligations → ul/ol lists
- Descriptive clauses → paragraphs
- blockquote ONLY for definitions or clarifications

STANDARD SECTIONS:
If any ESSENTIAL section is missing, INSERT it using:
- neutral legal language
- canonical placeholders ONLY
- NO invented numeric values

Essential sections include:
Confidențialitate;
Protecția Datelor (GDPR);
Garanții și răspundere;
Forță Majoră;
Reziliere;
Legea aplicabilă și Dispute;
Notificări;
Cesionare / Modificări / Integralitatea Acordului;
Semnături.

CANONICAL PLACEHOLDERS (use ONLY these names):
{{PRESTATOR_DENUMIRE}}, {{PRESTATOR_SOCIETATE_TIP}}, {{PRESTATOR_CUI_CNP}}, {{PRESTATOR_SEDIU_ADRESA}},
{{PRESTATOR_REPREZENTANT}}, {{PRESTATOR_FUNCTIE}}, {{PRESTATOR_EMAIL}},
{{BENEFICIAR_DENUMIRE}}, {{BENEFICIAR_SOCIETATE_TIP}}, {{BENEFICIAR_CUI_CNP}}, {{BENEFICIAR_SEDIU_ADRESA}},
{{BENEFICIAR_REPREZENTANT}}, {{BENEFICIAR_FUNCTIE}}, {{BENEFICIAR_EMAIL}},
{{DATA_INCHEIERII}}, {{LOCUL_INCHEIERII}},
{{IMOBIL_ADRESA}}, {{IMOBIL_NR_CAMERE}}, {{IMOBIL_SUPRAFATA}}, {{IMOBIL_ETAJ}}, {{IMOBIL_ANEXE}},
{{ANEXA_PV}}, {{DPA_ANEXA}},
{{TERMEN_CONTRACT}}, {{DATA_START}}, {{DATA_END}},
{{TARIF}}, {{MONEDA}}, {{TERMEN_PLATA_ZILE}}, {{PENALITATE_ZILNICA_PROCENT}},
{{GARANTIE_VALOARE}}, {{GARANTIE_LUNI}},
{{PLAFON_RASPUNDERE}}, {{PREAVIZ_ZILE}},
{{JURISDICTIE}}, {{INSTANTA_COMPETENTA_ORAS}},
{{LABEL_LOCATOR}}, {{LABEL_LOCATAR}}

CONTENT RULES:
- If inputJson.description contains explicit values
  (e.g. “chirie 600 EUR”, “garanție 1 lună”, “preaviz 30 zile”),
  they MUST appear as FIXED VALUES in normalizedHtml.
- You MAY keep the placeholder in parentheses for editability:
  e.g. “600 EUR ({{TARIF}} {{MONEDA}})”.
- NEVER replace known values with placeholders.
- NEVER introduce new burdensome obligations.
  If something is questionable, document it as:
  - issues[].suggestion
  - questionsForUser

CONTRADICTIONS:
- If contradictions exist (e.g. different currency across sections):
  - list them under "contradictions"
  - align normalizedHtml with description
  - if ambiguity remains, keep placeholder + question

EXPECTED SECTIONS CHECKLIST:
Title;
Preamble and Parties;
Definitions (3–6);
Object / Destination;
Price / Payments;
Utilities / Expenses;
Term / Schedule;
Obligations of Parties (two lists);
Initial State / Inventory / Inspections;
Confidentiality;
GDPR;
Intellectual Property;
Warranties and Liability;
Force Majeure;
Termination;
Governing Law and Disputes;
Notices;
Assignment / Amendments / Entire Agreement;
Signatures.

QUALITY SCORES (0–100):
completeness, clarity, consistency, formatting.

OUTPUT (STRICT):
Return ONLY ONE valid JSON object:

{
  "status": "ok" | "needsInput" | "error",
  "summary": string,
  "scores": {
    "completeness": number,
    "clarity": number,
    "consistency": number,
    "formatting": number
  },
  "checklist": {
    "title": boolean,
    "preambleAndParties": boolean,
    "definitions": boolean,
    "objectAndDestination": boolean,
    "priceAndPayments": boolean,
    "utilitiesAndExpenses": boolean,
    "termAndSchedule": boolean,
    "obligationsOfParties": boolean,
    "initialStateInventoryInspections": boolean,
    "confidentiality": boolean,
    "gdpr": boolean,
    "intellectualProperty": boolean,
    "warrantiesAndLiability": boolean,
    "forceMajeure": boolean,
    "termination": boolean,
    "governingLawAndDisputes": boolean,
    "notices": boolean,
    "assignmentAmendmentsEntireAgreement": boolean,
    "signatures": boolean
  },
  "issues": [
    {
      "id": string,
      "section": string,
      "type": "missingInformation" | "unclear" | "contradiction" | "formatOff" | "languageIssue",
      "severity": "low" | "medium" | "high",
      "finding": string,
      "impact": string,
      "suggestion"?: string,
      "questionToUser"?: string,
      "examples"?: string[]
    }
  ],
  "contradictions": [
    {
      "field": string,
      "locations": string[],
      "details": string,
      "proposedResolution": string
    }
  ],
  "placeholderMap": { [oldName: string]: string },
  "normalizedHtml": string,
  "diff"?: [
    {
      "op": "replace" | "insert" | "delete",
      "selector"?: string,
      "before"?: string,
      "after"?: string,
      "description"?: string
    }
  ],
  "questionsForUser": string[]
}

FINAL STRICTNESS:
- Output ONLY the JSON object.
- Use double quotes everywhere.
- Escape characters correctly.
- If full processing fails:
  - set status = "error"
  - provide a short summary
  - include best-effort normalizedHtml or original draftHtml
  - keep JSON VALID.
`
}
