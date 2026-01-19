import { T_AiTemplateWriteSchema } from "@/validators/template.validator";
import OpenAI from "openai";

export async function generateTemplate(data: T_AiTemplateWriteSchema): Promise<string> {
  const openai = new OpenAI()
  const prompt = getPromptForAI(data)

  const response = await openai.responses.create({
    model: "gpt-4",
    input: prompt
  })

  return response.output_text
}


const getPromptForAI = (variables: T_AiTemplateWriteSchema) => {
  return `
YOU ARE: an AI-assisted legal drafter that generates professional, editable contract templates in Romanian for entrepreneurs and SMEs.
You do NOT provide legal advice.
You deliver a complete, clear, production-ready contract draft.

OBJECTIVE:
Generate ONE complete contract (not a guide, not explanations), based strictly on the inputs.
If conflicts exist, resolve them using this priority:
DESCRIPTION > contractType > industry.

Write exclusively in Romanian, using correct diacritics.

INPUT (JSON):
{
  "contractType": ${variables.contractType},
  "description": ${variables.description},
  "industry": ${variables.industry},
  "termPeriod": ${variables.termPeriod},
  "tone": ${variables.tone}
}

OUTPUT FORMAT (MANDATORY – Tiptap compatible):
- Output ONLY raw HTML (no <html>, no <body>, no markdown, no backticks).
- DO NOT use <h1>, <h2>, <h3>.
- Use ONLY:
  <p><strong><span style="font-size: 28px">DOCUMENT TITLE</span></strong></p>
  <p><strong><span style="font-size: 18px">Section title</span></strong></p>
- Allowed tags:
  p, strong, em, ul, ol, li, blockquote, hr, br,
  span(style="font-size:…px"),
  table, thead, tbody, tr, th, td, colgroup, col, a(href)
- NO class or id attributes.
- NO inline styles except font-size on span.
- Body text: 14–16px
- Document title: 28–32px
- Section titles: 18–20px

VALUES FROM DESCRIPTION (STRICT RULE):
- If the description contains explicit values (e.g. rent 600 EUR, deposit 1 month, notice 30 days),
  these MUST appear as FIXED VALUES in the contract text (NOT placeholders).
- Example:
  If rent = 600 EUR and deposit = 1 month → deposit = 600 EUR.
  You MAY keep an editable placeholder alongside the fixed value if useful
  (e.g. {{GARANTIE_VALOARE}}), but do NOT replace confirmed values.

TONE:
- professional_clear: clear, direct, structured, legally coherent, easy to read.

LENGTH & QUALITY (MANDATORY):
- Target length: 1200–1800 words.
- EACH section below must contain:
  - 2–4 paragraphs OR
  - a clear list (6–10 bullet points where appropriate).
- No empty sections.
- No repetition.
- Avoid vague language like “to be agreed later” if data exists in description.

MANDATORY STRUCTURE (NO <h#> TAGS):

1) Document Title (28–32px)
   Example: “Contract de Închiriere Apartament”

2) Preamble and Parties
   - Parties, legal form, representatives, registered offices
   - {{DATA_INCHEIERII}}, {{LOCUL_INCHEIERII}}

3) Definitions (only if useful)
   - 3–6 practical definitions (e.g. Imobil, Utilități, Proces-Verbal)

4) Object of the Contract / Purpose
   - Clear description of the subject
   - Address placeholders
   - Residential use
   - Handover based on a handover report (PV)

5) Price, Invoicing and Payments
   - Monthly price (e.g. 600 EUR)
   - Payment deadline {{TERMEN_PLATA_ZILE}}
   - Payment method
   - Security deposit (e.g. 600 EUR)
   - Penalties (e.g. 0.1%/day)
   - Invoicing rules (if applicable)
   - Indexation mechanism (optional but concrete)

6) Utilities and Expenses
   - Utilities paid by tenant
   - Meter readings
   - Common expenses
   - Proof of payment

7) Duration and Timeline
   - Contract period (e.g. ${variables.termPeriod})
   - Start/end dates (placeholders)
   - Extension rules

8) Parties’ Obligations
   a) Lessor obligations (6–8 items)
   b) Lessee obligations (10–12 items):
      - Timely payment
      - Utilities
      - Minor repairs
      - No alterations without consent
      - House rules
      - No subletting
      - Access with 48h notice
      - Pets policy placeholder
      - Smoking, noise, fire safety

9) Initial Condition, Inventory, Inspections
   - Handover report
   - Inventory
   - Meter readings
   - Periodic inspections with 48h notice
   - Normal wear vs damage

10) Confidentiality
    - Contractual information
    - Personal data
    - Legal exceptions
    - Survival after termination

11) Data Protection (GDPR)
    - Operator / processor roles if applicable
    - Minimum safeguards
    - DPA reference {{DPA_ANEXA}}

12) Intellectual Property
    - Photos/videos for condition evidence
    - No public use without consent

13) Warranties and Liability
    - Lessor warranties
    - Liability cap:
      {{PLAFON_RASPUNDERE}} × average 12-month rent
    - Legal exceptions apply

14) Force Majeure
    - Definition
    - Notification within 5 days
    - Termination after 60 days

15) Termination
    - Convenience termination with {{PREAVIZ_ZILE}} days (e.g. 30)
    - Breach with cure period (5 days)
    - Immediate termination for serious breaches

16) Governing Law and Disputes
    - {{JURISDICTIE}}
    - {{INSTANTA_COMPETENTA_ORAS}} or arbitration

17) Notices
    - Communication channels
    - Time rules
    - Email addresses:
      {{PRESTATOR_EMAIL}}, {{BENEFICIAR_EMAIL}}

18) Assignment, Amendments, Entire Agreement
    - Standard legal clauses

FINAL OUTPUT:
Return ONLY the HTML contract, respecting ALL rules above.
`
}


// ceva
// Am o firma care se ocupa cu dezvoltarea software. Acest contract o sa fie pentru o companie pentru care o sa dezvoltam o aplicatie web in mod gratuit dar beneficiarul se comite sa plateasca gazduirea pentru minim 12 luni. Daca acestea nu mai plateste in aceasta perioada de 12 luni, avem dreptul sa mergem in instanta si sa incercam o executare silita a beneficiarului. Codul sursa apartine exclusiv prestatorului dar beneficiarul are dreptul sa il cumpere in orice moment la un pret stabilit de comun acrod.