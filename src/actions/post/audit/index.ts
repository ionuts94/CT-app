"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { AuditAction, PartyRole } from "@prisma/client";
import { GetCurrentUserWithCompany } from "../company";

export async function LogAudit({
  contractId,
  actorType,
  action,
  contractVersion,
  ip,
  userAgent,
  metadata
}: {
  contractId: string,
  actorType: PartyRole,
  action: AuditAction,
  contractVersion?: number,
  ip: string,
  userAgent?: string,
  metadata: any
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { data } = await GetCurrentUserWithCompany()
    const { error: auditInsertError } = await supabase.from("audit_logs").insert({
      userId: data?.id,
      contractId,
      userEmail: data?.email,
      actorType,
      action,
      contractVersion,
      ip,
      userAgent,
      metadata,
    })

    if (auditInsertError) throw new Error("Failed to create audit log. Error: ", auditInsertError)

    return {
      status: Status.SUCCESS,
      data: ""
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