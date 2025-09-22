"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { GetAuthUser } from "../auth";
import { Company, Contract } from "@prisma/client";

export async function CreateContractRecord({

}: {

  }): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { data: authUser, error: authUserError } = await GetAuthUser()
    if (authUserError || !authUser) throw Error(authUserError || "You are not authorized to perform this action")

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


export type T_ContractWithCompany = Contract & {
  company: Company
}

export async function GetContractWithCompany({
  contractId
}: {
  contractId: string
}): Promise<CustomApiResponse<T_ContractWithCompany>> {
  const supabase = await createClient();

  try {
    const { data: authUser, error: authUserError } = await GetAuthUser()
    if (authUserError || !authUser) throw Error(authUserError || "You are not authorized to perform this action")

    const { data, error } = await supabase.from("contracts")
      .select(`
        *,
        company: companies(*)
      `)
      .eq("id", contractId)
      .eq("ownerId", authUser.id)
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