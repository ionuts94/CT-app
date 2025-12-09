import { createClient } from "@/lib/supabase/server";
import { T_GetContractAuditLogBody } from "@/types/api/contracts";
import { AuditLog } from "@prisma/client";

export async function getContractAuditLog({ contractId }: T_GetContractAuditLogBody): Promise<AuditLog[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("audit_logs")
    .select("*")
    .eq("contractId", contractId)
    .order("createdAt", { ascending: true })

  if (error) throw new Error("Failed to retrieve audit for contract. Error: " + error.message)
  return data
}