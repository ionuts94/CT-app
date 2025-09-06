// ---------- Status & enums ----------
export type ReviewStatus = 'ok' | 'needsInput' | 'error';

export type IssueType =
    | 'missingInformation'
    | 'unclear'
    | 'contradiction'
    | 'formatOff'
    | 'languageIssue';

export type Severity = 'low' | 'medium' | 'high';

// ---------- Scores ----------
export interface ReviewScores {
    /** 0–100 */
    completeness: number;
    /** 0–100 */
    clarity: number;
    /** 0–100 */
    consistency: number;
    /** 0–100 */
    formatting: number;
}

// ---------- Checklist (UPDATED) ----------
export interface ReviewChecklist {
    /** Titlu document (28–32px) */
    title: boolean;
    /** Preambul + părți contractante */
    preambleAndParties: boolean;
    /** Definiții + scope clar: obiect, livrabile, acceptance */
    definitionsAndScope: boolean;
    /** Durată & guvernanță: perioadă, milestone-uri, comunicare, roluri */
    durationAndGovernance: boolean;
    /** Financiar: tarif, TVA/monedă, facturare, penalități, suspendare pentru neplată */
    financial: boolean;
    /** IP & Licențe: background/foreground, transfer drepturi, OSS/terți */
    ipAndLicenses: boolean;
    /** Mediu & conturi: cloud, App Store, repo; cine publică/deține */
    environmentAndAccounts: boolean;
    /** Confidențialitate & GDPR (NDA + DPA dacă e cazul) */
    confidentialityAndGdpr: boolean;
    /** Suport & SLA: garanție bugfix, suport post-lansare, timpi de răspuns */
    supportAndSla: boolean;
    /** Răspundere & limitări: plafonare, excluderi pierderi indirecte */
    liabilityAndLimitations: boolean;
    /** Reziliere: pentru cauză & pentru conveniență, efecte/hand-over */
    termination: boolean;
    /** Alte clauze: forță majoră, lege aplicabilă, jurisdicție, notificări, cesiune/modificări/integralitate */
    otherClauses: boolean;
    /** Semnături: tabel 2 coloane */
    signatures: boolean;
}

// (opțional) ordinea recomandată pentru UI
export const REVIEW_CHECKLIST_ORDER: Array<keyof ReviewChecklist> = [
    'title',
    'preambleAndParties',
    'definitionsAndScope',
    'durationAndGovernance',
    'financial',
    'ipAndLicenses',
    'environmentAndAccounts',
    'confidentialityAndGdpr',
    'supportAndSla',
    'liabilityAndLimitations',
    'termination',
    'otherClauses',
    'signatures',
];

// ---------- Issues, contradictions, diffs ----------
export interface ReviewIssue {
    id: string;
    section: string; // ex.: "financial", "supportAndSla" etc.
    type: IssueType;
    severity: Severity;
    finding: string;
    impact: string;
    suggestion?: string;
    questionToUser?: string;
    examples?: string[];
}

export interface ContradictionItem {
    field: string;
    locations: string[];
    details: string;
    proposedResolution: string;
}

export interface DiffEntry {
    op: 'replace' | 'insert' | 'delete';
    selector?: string;
    before?: string;
    after?: string;
    description?: string;
}

// ---------- Main output (RENAMED) ----------
export interface TemplateReviewOutput {
    status: ReviewStatus;
    summary: string;
    scores: ReviewScores;
    checklist: ReviewChecklist;
    issues: ReviewIssue[];
    contradictions: ContradictionItem[];
    placeholderMap: Record<string, string>;
    normalizedHtml: string;
    diff?: DiffEntry[];
    questionsForUser: string[];
}