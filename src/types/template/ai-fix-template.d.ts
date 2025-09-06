export type ChangeAction = "insert" | "replace" | "delete" | "rephrase" | "normalize";

export type ContractFixOutputSelective = {
    status: "ok" | "needsInput" | "error";
    updatedHtml: string;                 // HTML final Tiptap-safe
    fixedIssueIds: string[];             // ce issue-uri (din selectedIssueIds) ai reușit să repari
    skippedIssueIds: string[];           // din selectedIssueIds dar pe care nu le-ai putut repara (ex.: lipsă date)
    failedIssueIds: Array<{              // eșecuri concrete pe selectedIssueIds, cu motiv
        issueId: string;
        reason: string;
    }>;
    changesApplied: Array<{
        issueId?: string;
        section?: string;
        action: ChangeAction;
        summary: string;
    }>;
    skippedIssueConflicts: Array<{       // conflicte cu issue-uri ne-selectate
        issueId: string;                   // un issue ne-selectat care intră în conflict
        affectedSelectedIssueId?: string;  // opțional: cu cine s-a bătut cap în cap
        note: string;                      // explicație scurtă
    }>;
    remainingQuestions: string[];        // ce mai trebuie de la user ca să finalizezi fixurile selectate
};