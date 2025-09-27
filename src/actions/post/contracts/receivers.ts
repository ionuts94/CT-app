"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { ContractStatus } from "@prisma/client";

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
    console.log("signing contract")
    console.log(contractId)
    console.log(receiverName)
    console.log(receiverSignatureId)

    const { error } = await supabase.from("contracts")
      .update({
        reciverName: receiverName,
        reciverSignatureId: receiverSignatureId,
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