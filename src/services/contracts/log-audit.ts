import { createClient } from "@/lib/supabase/server";
import { AuditAction, PartyRole } from "@prisma/client";

export type LogAuditPayload = {
  contractId: string;
  actorType: PartyRole;
  action: AuditAction;
  ip: string;
  userAgent?: string | null;
  contractVersion?: number;
  metadata?: Record<string, any>;
  userId?: string | null;
  userEmail?: string | null;
};

export async function logAudit(payload: LogAuditPayload) {
  const supabase = await createClient();

  const { error } = await supabase.from("audit_logs").insert({
    id: crypto.randomUUID(),
    contractId: payload.contractId,
    actorType: payload.actorType,
    action: payload.action,
    contractVersion: payload.contractVersion ?? null,
    ip: payload.ip,
    userAgent: payload.userAgent ?? null,
    metadata: payload.metadata ?? {},
    userId: payload.userId ?? null,
    userEmail: payload.userEmail ?? null,
    createdAt: new Date(),
  });

  if (error) {
    throw new Error("Failed to write audit log: " + error.message);
  }

  return true;
}