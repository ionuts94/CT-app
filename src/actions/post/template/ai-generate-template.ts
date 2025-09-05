"use server"

import { CustomApiResponse, Status } from "@/types/api-call";
import { T_AiTemplateWriteSchema } from "@/validators/template.validator";
import OpenAI from "openai";

export async function AIGenerateTemplate(data: T_AiTemplateWriteSchema): Promise<CustomApiResponse<string>> {
  console.log("Generate template for values")
  console.log(data)

  try {
    const openai = new OpenAI()
    const prompt = getPromptForAI(data)

    const response = await openai.responses.create({
      model: "gpt-4",
      input: prompt
    })

    console.log(response)

    return {
      status: Status.SUCCESS,
      data: response.output_text
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


const getPromptForAI = (variables: T_AiTemplateWriteSchema) => {
  const TEMPLATE_WRITER_BASE_PROMPT = `
TU EȘTI: un redactor juridic asistat de AI care generează șabloane de contracte în română pentru antreprenori și IMM-uri. Nu oferi consultanță juridică; livrezi un draft profesionist, clar și editabil.

OBIECTIV: generează UN SINGUR contract complet (nu ghid, nu explicații), în funcție de intrări. Dacă există conflicte, prioritate: DESCRIERE > contractType > industry. Scrie în română cu diacritice.

INTRĂRI (JSON):
{
  "contractType": ${variables.contractType},
  "description":  ${variables.description},
  "industry":     ${variables.industry},
  "termPeriod":   ${variables.termPeriod},
  "tone":         ${variables.tone}   // professional_clear | formal | friendly | concise | legalese | plain_language | neutral
}

FORMAT IEȘIRE (OBLIGATORIU, compatibil Tiptap):
- Livrează DOAR HTML (fără <html>/<body>, fără backticks).
- NU folosi <h1>/<h2>/<h3>. Folosește:
  <p><strong><span style="font-size: 28px">TITLU DOCUMENT</span></strong></p>    // titlu principal
  <p><strong><span style="font-size: 18px">Titlu secțiune</span></strong></p>    // secțiune
- Tag-uri permise: p, strong, em, ul, ol, li, blockquote, hr, br, span(style="font-size:…px"), table, thead, tbody, tr, th, td, colgroup, col, a(href).
- NU folosi alte stiluri inline în afară de font-size pe <span>. NU folosi class/id (EXCEPȚIE: <table class="signature"> pentru semnături).
- Text body 14–16px; titlu principal 28–32px; titluri secțiuni 18–20px.

VALORI DIN DESCRIERE (OBLIGATORIU):
- Dacă descrierea include cifre/condiții (ex. chirie 600 EUR, garanție 1 lună, utilități pe chiriaș, preaviz 30 zile), pune-le ca VALORI FIXE în text (nu placeholders).
- Exemplu aplicare: dacă „garanție 1 lună” și chiria e 600 EUR, setează garanția la 600 EUR (și păstrează și {{GARANTIE_VALOARE}} dacă vrei editabilitate).

TON:
- professional_clear: clar, direct, lizibil și riguros.

LUNGIME & CALITATE (OBLIGATORIU):
- Lungime țintă: 1200–1800 de cuvinte.
- Fiecare secțiune de mai jos trebuie să aibă 2–4 paragrafe SAU o listă clară (6–10 puncte unde e cazul).
- Fără repetiții, fără secțiuni goale, fără platitudini. Evită fraze vagi („se va stabili ulterior”) dacă există valori în descriere.

STRUCTURĂ MINIMĂ OBLIGATORIE (fără <h#>):
1) Titlu document (28–32px) — titlu real, ex. „Contract de Închiriere Apartament”.
2) Preambul și Părți — părți, reprezentanți, sedii, {{DATA_INCHEIERII}}, {{LOCUL_INCHEIERII}}.
3) Definiții — doar dacă ajută; 3–6 definiții utile (Imobil, Utilități, Stare Inițială, Reguli ale Imobilului, PV).
4) Obiectul contractului / Destinația — descrie clar imobilul (placeholder adrese/parametri), destinație rezidențială, predare-primire pe PV.
5) Preț, facturare și plăți — chirie lunară (ex. 600 EUR), scadență ({{TERMEN_PLATA_ZILE}}), modalitate plată, garanție (ex. 600 EUR), penalități (ex. 0,1%/zi), facturare dacă locatorul e PJ, indexare (opțional, descrie mecanism).
6) Utilități și cheltuieli — utilități pe chiriaș, contoare, decont, cheltuieli comune, dovezi plată.
7) Durata și calendar — perioadă (ex. ${variables.termPeriod}), data start/end (placeholders), prelungire.
8) Obligațiile Părților — două liste separate:
   - Locator: 6–8 obligații (predare corespunzătoare, reparații majore, acces pentru furnizori, asigurarea liniștitei folosințe etc.)
   - Locatar: 10–12 obligații (plată la termen, utilități, reparații mărunte, fără modificări fără acord, reguli imobil, subînchiriere interzisă, acces pt verificări cu 48h, animale/pet policy placeholder, fumători, zgomot, PSI).
9) Stare Inițială, Inventar, Verificări — PV la predare, inventar, indici contoare, verificări periodice cu notificare 48h, uzură normală vs deteriorări.
10) Confidențialitate — termeni contractuali, date personale; excepții legale; durată obligatorie post-contract.
11) Protecția Datelor (GDPR) — roluri operator/împuternicit dacă e cazul, măsuri minime, DPA {{DPA_ANEXA}}.
12) Proprietate intelectuală — clarifică fotografie/imagini pentru stare, materiale publice doar cu acord.
13) Garanții și răspundere — garanții ale locatorului, plafonare răspundere la {{PLAFON_RASPUNDERE}} × chiria medie 12 luni (cu excepțiile legale).
14) Forță Majoră — definiție, notificare 5 zile, denunțare după 60 zile.
15) Reziliere — conveniență cu {{PREAVIZ_ZILE}} (ex. 30) zile; pentru neexecutare (notificare de remediere 5 zile); cazuri grave (imediată).
16) Legea aplicabilă și dispute — {{JURISDICTIE}}; {{INSTANTA_COMPETENTA_ORAS}} sau arbitraj.
17) Notificări — canale, ore, efecte, adrese: {{PRESTATOR_EMAIL}}, {{BENEFICIAR_EMAIL}}.
18) Cesionare. Modificări. Integralitatea acordului — reguli standard.
19) Semnături — TABEL 2 COLOANE (Prestator/Beneficiar), fără borduri; folosește exact structura de mai jos.

FORMAT OBLIGATORIU SEMNĂTURI:
<table class="signature" role="presentation">
  <colgroup><col style="width:50%"/><col style="width:50%"/></colgroup>
  <tbody>
    <tr>
      <td>
        <strong>{{LABEL_LOCATOR}}</strong><br/>
        Denumire/Nume: {{PRESTATOR_DENUMIRE}}<br/>
        {{PRESTATOR_SOCIETATE_TIP}} | {{PRESTATOR_CUI_CNP}}<br/>
        Sediu/Domiciliu: {{PRESTATOR_SEDIU_ADRESA}}<br/>
        Reprezentant: {{PRESTATOR_REPREZENTANT}} — {{PRESTATOR_FUNCTIE}}<br/>
        E-mail: {{PRESTATOR_EMAIL}}<br/><br/>
        Semnătură: ____________________<br/>
        Ștampilă (dacă este cazul)
      </td>
      <td>
        <strong>{{LABEL_LOCATAR}}</strong><br/>
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
</table>

OUTPUT FINAL: DOAR HTML conform regulilor de mai sus.

`
  return TEMPLATE_WRITER_BASE_PROMPT
}