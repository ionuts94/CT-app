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


export async function GetAuthUserContracts({ status }: { status?: string }): Promise<CustomApiResponse<Contract[]>> {
  const supabase = await createClient();

  console.log("Getting contracts")

  try {
    const { data: authUser } = await GetAuthUser()
    if (!authUser) throw new Error("You are not signed in")

    const query = supabase.from("contracts").select("*").eq("ownerId", authUser.id)
    if (status) query.eq("status", status)

    const { data, error } = await query
    if (error) throw new Error("Failed to retrieve contracts. Error: " + error.message)

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


export type T_ContractWithCompanyAndOwner = Contract & {
  company: Company,
  owner: User
}

export async function GetContractWithCompanyAndOwner({
  contractId
}: {
  contractId: string
}): Promise<CustomApiResponse<T_ContractWithCompanyAndOwner>> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("contracts")
      .select(`
        *,
        company: companies(*),
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


export type T_ViewContract = T_ContractWithCompanyAndOwner & {
  owner: User,
  ownerSignature: Signature,
  receiverSignature?: Signature
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
        ownerSignature: contracts_ownerSignatureId_fkey(*),
        receiverSignature: contracts_reciverSignatureId_fkey(*),
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


export async function UpdateContractSignedPdfUrl({
  contractId,
  contractUrl
}: {
  contractId: string,
  contractUrl: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("contracts")
      .update({ signedPdfUrl: contractUrl })
      .eq("id", contractId)

    if (error) throw new Error("Failed to update contract pdf url. Error: " + error.message)

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