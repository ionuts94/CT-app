"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { PartyRole } from "@prisma/client";
import { v4 as uuid } from "uuid";

export async function CreateContractVersion({
  contractId,
  content,
  contractVersionUUID
}: {
  contractId: string,
  content: string,
  contractVersionUUID?: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("contract_versions").insert({
      id: contractVersionUUID || uuid(),
      contractId,
      content,
      createdByType: PartyRole.SENDER,
      versionNumber: 1
    })

    if (error) throw new Error("Failed to create contract version. Error: " + error.message)

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