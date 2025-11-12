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