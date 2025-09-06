"use server"

import { CustomApiResponse, Status } from "@/types/api-call";
import { ContractFixOutputSelective } from "@/types/template/ai-fix-template";
import { IssueType, ReviewIssue } from "@/types/template/ai-review-template";
import { T_AiTemplateWriteSchema } from "@/validators/template.validator";
import OpenAI from "openai";

const openai = new OpenAI()

export type T_AiFixTemplateArgs = {
    baseInput: T_AiTemplateWriteSchema,
    baseHtml: string,
    issues: ReviewIssue[]
}

export async function AIFixTemplate({
    baseInput,
    baseHtml,
    issues
}: T_AiFixTemplateArgs): Promise<CustomApiResponse<ContractFixOutputSelective>> {

    try {
        const prompt = getPromptForAI({ baseInput, baseHtml, issues })

        const res = await openai.responses.create({
            model: "gpt-4o-mini",
            temperature: 0.2,
            input: prompt
        });

        const raw = res.output_text;
        if (!raw) throw new Error("Missing output_text in response");
        const parsed = JSON.parse(raw);

        return {
            status: Status.SUCCESS,
            data: parsed
        };
    } catch (err: any) {
        const errMessage = `${err.message}`;
        console.log(errMessage);
        return {
            status: Status.FAILED,
            error: errMessage
        };
    }
}

const getPromptForAI = ({
    baseInput,
    baseHtml,
    issues
}: T_AiFixTemplateArgs) => {
    return (
        `
TU EȘTI: „Contract Template Fixer” — rescrii HTML-ul contractului pornind de la o versiune normalizată și îl STRUCTUREZI în formatul canonic de mai jos. Repari DOAR problemele selectate de utilizator. Nu oferi consultanță juridică, nu inventa date, nu introdu obligații materiale noi fără indicii clare în intrări. Lucrezi exclusiv în română, cu diacritice.

INTRĂRI:
- inputJson: ${JSON.stringify(baseInput)}
- baseHtml: ${baseHtml}
- selectedIssueIds: ${JSON.stringify(issues) || []} — **NUMAI aceste issue-uri trebuie reparate** (conținut). Restul rămân neschimbate ca sens (în afara normalizărilor sigure).

MANDAT DUAL (foarte important):
A) **STRUCTURARE GLOBALĂ PERMISĂ ÎNTOTDEAUNA** (chiar dacă nu e în selectedIssueIds):
   - Rearanjează & redenumește secțiunile în **ORDINEA CANONICĂ** de mai jos.
   - Normalizează titlurile (font-size), diacriticele, ghilimelele „ ”, spațierea, punctuația.
   - Înlocuiește placeholder-ele necanonice folosind 'reviewer.placeholderMap' (dacă există).
   - Menține semnături în tabel 2 coloane (50/50).

B) **REPARAȚII DE CONȚINUT STRICT PE selectedIssueIds**:
   - 'formatOff', 'languageIssue': normalizezi direct formularea/formatul în secțiunile afectate.
   - 'missingInformation', 'unclear': inserezi text neutru + **placeholders CANONICE**; NU inventezi valori. Dacă lipsesc date, adaugi întrebări în 'remainingQuestions'.
   - 'contradiction': aliniază la inputJson (prioritate: description > contractType > industry). Dacă rămâne ambiguu, păstrează placeholder + întrebare.

FORMAT & TAG-URI (compatibil Tiptap):
- Titlu document (28px): '<p><strong><span style="font-size: 28px">…</span></strong></p>'
- Titluri secțiuni (18px): '<p><strong><span style="font-size: 18px">…</span></strong></p>'
- Conținut: doar 'p, strong, em, ul, ol, li, blockquote, hr, br, span(style="font-size:…px"), table, thead, tbody, tr, th, td, colgroup, col, a(href)'
- **NU** folosi 'h1/h2/h3'. Fără id/class, **EXCEPTÂND** 'class="signature"' pe tabelul de semnături.
- Semnături: 
<table class="signature" role="presentation"> <colgroup><col style="width:50%"/><col style="width:50%"/></colgroup> … </table> '''
ORDINE CANONICĂ A SECȚIUNILOR (titlurile trebuie să fie EXACT acestea):

„CONTRACT DE PRESTĂRI SERVICII – DEZVOLTARE APLICAȚII WEB ȘI MOBIL” (titlu principal, 28px)

„Între:”

„1. DEFINIȚII”

„2. OBIECTUL CONTRACTULUI”

„3. DURATA”

„4. GUVERNANȚĂ DE PROIECT”

„5. SPECIFICAȚII, LIVRABILE, ACCEPTANȚĂ”

„6. MODIFICĂRI (CHANGE REQUEST)”

„7. ONORARII, TAXE, PLATĂ”

„8. TIMP DE LUCRU ȘI RAPORTARE”

„9. MEDII, CONTURI ȘI PUBLICARE”

„10. PROPRIETATE INTELECTUALĂ”

„11. CONFIDENȚIALITATE ȘI PROTECȚIA DATELOR”

„12. SUBCONTRACTARE”

„13. GARANȚIE, MENTENANȚĂ ȘI SUPORT”

„14. DECLARAȚII ȘI GARANȚII”

„15. RĂSPUNDERE. LIMITARE”

„16. DESPĂGUBIRI (INDEMNIZAȚII)”

„17. FORȚĂ MAJORĂ”

„18. REZILIERE”

„19. ANTI-CORUPȚIE ȘI CONFORMITATE”

„20. LEGEA APLICABILĂ ȘI JURISDICȚIA”

„21. NOTIFICĂRI”

„22. CESIONARE”

„23. ÎNTREGUL ACORD. MODIFICĂRI”

„24. SEMNĂTURI”

„ANEXA 1 – CAIET DE SARCINI (SOW)”

„ANEXA 2 – SLA SUPORT ȘI MENTENANȚĂ”

„ANEXA 3 – ACORD DE PRELUCRARE DATE (DPA)”

„ANEXA 4 – TARIFE ȘI TERMENI FINANCIARI”

„ANEXA 5 – PROCEDURA DE ACCEPTANȚĂ”

PLACEHOLDERS CANONICE (include și extinderile folosite în model):
{{PRESTATOR_DENUMIRE}}, {{PRESTATOR_SOCIETATE_TIP}}, {{PRESTATOR_CUI_CNP}}, {{PRESTATOR_SEDIU_ADRESA}}, {{PRESTATOR_REPREZENTANT}}, {{PRESTATOR_FUNCTIE}}, {{PRESTATOR_EMAIL}}, {{PRESTATOR_REG_COM}},
{{BENEFICIAR_DENUMIRE}}, {{BENEFICIAR_SOCIETATE_TIP}}, {{BENEFICIAR_CUI_CNP}}, {{BENEFICIAR_SEDIU_ADRESA}}, {{BENEFICIAR_REPREZENTANT}}, {{BENEFICIAR_FUNCTIE}}, {{BENEFICIAR_EMAIL}}, {{BENEFICIAR_REG_COM}},
{{DATA_INCHEIERII}}, {{LOCUL_INCHEIERII}},
{{PM_PRESTATOR}}, {{PM_BENEFICIAR}}, {{CANAL_COMUNICARE}}, {{ZILE_ESCALADARE}},
{{IOS_MIN}}, {{ANDROID_MIN}}, {{BROWSERE}}, {{REPO_GIT}},
{{ZILE_ACCEPTANTA}}, {{ZILE_REMEDIERE}},
{{CURS_REFERINTA}}, {{PENALITATI}}, {{ZILE_SUSPENDARE}}, {{ZILE_NOTIF}}, {{SUPORTA_COMISIOANE}}, {{PROCENT_MARKUP}},
{{PROGRAM}}, {{FUS_ORAR}}, {{COEF_WEEKEND}},
{{LUNI_PLAFON}}, {{ZILE_REM}},
{{JUDECATORIA_TRIBUNAL}}

VALORI FIXE DIN ${baseInput.description}:

Dacă descrierea conține cifre/condiții explicite (ex.: „20 USD/oră”, „3 luni”), păstrează-le ca TEXT FIX în rezultat (poți lăsa și placeholder în paranteză pentru editabilitate). NU înlocui valori certe cu placeholders.

ALGORITM (succint):

Parsează baseHtml. Normalizează diacritice/ghilimele/spațiere. Mapează placeholders necanonice folosind reviewer.placeholderMap (dacă există).

Reasamblează conținutul în ordine canonică și redenumește titlurile în exact textele listate.

Aplică numai pe selectedIssueIds: inserează/înlocuiește/clarifică conform regulilor de mai sus. Pentru lipsuri, inserează text neutru + placeholders canonice.

Menține tabelul de semnături 2 coloane cu <colgroup>.

Construiește changes[] granular (pe issue), cu op (insert/replace/delete), locator (ex.: { method: "afterSectionTitle", titleText: "1. DEFINIȚII", occurrence: 1 }), beforeHtml, afterHtml, rationale.

Dacă un fix selectat intră în conflict cu issue-uri ne-selectate, finalizează fixul selectat și adaugă intrarea în skippedIssueConflicts[].

Dacă lipsesc date critice, adaugă întrebări în remainingQuestions[].

OUTPUT STRICT JSON (schema „ContractFixOutputSelective”):
{
"status": "ok" | "partial" | "error",
"summary": string,
"resultHtml": string, // contractul FINAL, Tiptap-safe, în ordinea canonică
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

STRICTEȚE:

Returnează DOAR JSON valid. Fără markdown/comentarii.

resultHtml trebuie să fie contractul restructurat (nu copia baseHtml).

Nu introduce obligații materiale noi fără indicii; pentru astfel de idei, folosește doar remainingQuestions sau sugestii în rationale.

`
    )
}