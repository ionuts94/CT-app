import { T_AiTemplateWriteSchema } from "@/validators/template.validator"

export type T_AiFixTemplateArgs = {
  baseInput: T_AiTemplateWriteSchema,
  baseHtml: string,
  issues: ReviewIssue[]
}

export type T_AITemplateReviewInputs = {
  initialInput: T_AiTemplateWriteSchema,
  templateRichTextString: string
}


export type ChangeAction = "insert" | "replace" | "delete" | "rephrase" | "normalize";

export type ContractFixOutputSelective = {
  status: "ok" | "needsInput" | "error";
  updatedHtml: string;
  fixedIssueIds: string[];
  skippedIssueIds: string[];
  failedIssueIds: Array<{
    issueId: string;
    reason: string;
  }>;
  changesApplied: Array<{
    issueId?: string;
    section?: string;
    action: ChangeAction;
    summary: string;
  }>;
  skippedIssueConflicts: Array<{
    issueId: string;
    affectedSelectedIssueId?: string;
    note: string;
  }>;
  remainingQuestions: string[];
};



// ---------- Status & enums ----------
export type ReviewStatus = 'ok' | 'needsInput' | 'error';

export type IssueType =
  | 'missingInformation'
  | 'unclear'
  | 'contradiction'
  | 'formatOff'
  | 'languageIssue';

export type Severity = 'low' | 'medium' | 'high';
export interface ReviewScores {
  completeness: number;
  clarity: number;
  consistency: number;
  formatting: number;
}
export interface ReviewChecklist {
  title: boolean;
  preambleAndParties: boolean;
  definitionsAndScope: boolean;
  durationAndGovernance: boolean;
  financial: boolean;
  ipAndLicenses: boolean;
  environmentAndAccounts: boolean;
  confidentialityAndGdpr: boolean;
  supportAndSla: boolean;
  liabilityAndLimitations: boolean;
  termination: boolean;
  otherClauses: boolean;
  signatures: boolean;
}


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