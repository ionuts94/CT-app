"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { GetAuthUser } from "../auth";
import { Company, Contract, ContractStatus, Signature, User } from "@prisma/client";
import { GetCurrentUserWithCompany } from "../company";

export async function CreateContractRecord({
  title,
  content,
  ownerSignatureId,
  reciverName,
  reciverEmail,
  optionalMessage,
}: {
  title: string,
  content: string,
  ownerSignatureId: string,
  reciverName: string,
  reciverEmail: string,
  optionalMessage?: string
}): Promise<CustomApiResponse<Contract>> {
  const supabase = await createClient();

  try {
    const { data: user, error: userError } = await GetCurrentUserWithCompany()

    if (userError) throw Error(userError)

    console.log("user in create contract")
    console.log(user)

    const { data, error } = await supabase.from("contracts")
      .insert({
        title,
        content,
        ownerId: user?.id,
        companyId: user?.company?.id,
        status: ContractStatus.OUT_FOR_SIGNATURE,
        createdAt: new Date(),
        updatedAt: new Date(),

        // TODO: Handle dynamic expiry date
        expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),

        // TODO: Generate dynamic access code
        accessPassword: 123456,

        ownerSignatureId,
        reciverName,
        reciverEmail,
        optionalMessage
      })
      .select("*")
      .maybeSingle()

    if (error) throw error

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


export type T_ViewContract = T_ContractWithCompany & {
  signature: Signature,
  owner: User
}


export async function FreeGetViewContract({
  contractId
}: {
  contractId: string
}): Promise<CustomApiResponse<T_ViewContract>> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("contracts")
      .select(`
        *,
        company: companies(*),
        signature: contracts_ownerSignatureId_fkey(*),
        owner: users(*)
      `)
      .eq("id", contractId)
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

