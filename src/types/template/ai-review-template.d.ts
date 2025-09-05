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

// ---------- Checklist ----------
export interface ReviewChecklist {
    title: boolean;
    preambleAndParties: boolean;
    definitions: boolean;
    objectAndDestination: boolean;
    priceAndPayments: boolean;
    utilitiesAndExpenses: boolean;
    termAndSchedule: boolean;
    obligationsOfParties: boolean;
    initialStateInventoryInspections: boolean;
    confidentiality: boolean;
    gdpr: boolean;
    intellectualProperty: boolean;
    warrantiesAndLiability: boolean;
    forceMajeure: boolean;
    termination: boolean;
    governingLawAndDisputes: boolean;
    notices: boolean;
    assignmentAmendmentsEntireAgreement: boolean;
    signatures: boolean;
}

// ---------- Issues, contradictions, diffs ----------
export interface ReviewIssue {
    id: string;
    section: string;
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

// ---------- Main output ----------
export interface ContractReviewOutput {
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
