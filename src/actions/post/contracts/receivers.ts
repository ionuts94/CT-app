"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { ContractStatus } from "@prisma/client";
import { LogAudit } from "../audit";


export async function GetContractForReceiver({
  receiverToken
}: {
  receiverToken: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("contracts")
      .select(`
        *,
        company: companies(*),
        ownerSignature: contracts_ownerSignatureId_fkey(*),
        receiverSignature: contracts_receiverSignatureId_fkey(*),
        owner: users(*),
        currentVersion: contract_versions(*)
      `)
      .eq("receiverToken", receiverToken)
      .maybeSingle()

    if (error) throw Error(error.message)
    if (!data) throw Error("Contract not found")
    if (data && !data.company) throw Error("Company not found")

    return {
      status: Status.SUCCESS,
      data: data
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

export async function ReceiverSignContract({
  contractId,
  receiverSignatureId,
  receiverName,
}: {
  contractId: string,
  receiverSignatureId: string,
  receiverName: string,
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("contracts")
      .update({
        receiverName: receiverName,
        receiverSignatureId: receiverSignatureId,
        status: ContractStatus.FULLY_SIGNED,
      })
      .eq("id", contractId)

    if (error) throw error

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


export async function ReceiverDeclineContract({
  contractId,
  failedReason = ""
}: {
  contractId: string,
  failedReason?: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("contracts")
      .update({
        status: ContractStatus.DECLINED,
        failedReason,
        failedAt: new Date()
      })
      .eq("id", contractId)

    if (error) throw error

    await LogAudit({
      contractId: contractId,
      action: "CONTRACT_DECLINED",
      actorType: "SIGNER",
      ip: "192.168.1.1",
      userAgent: "Chrome",
      metadata: {},
      contractVersion: 1
    })

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

