"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { GetAuthUser } from "../auth";
import { Company, Contract, ContractStatus, ContractVersion, Signature, User } from "@prisma/client";
import { GetCurrentUserWithCompany } from "../company";
import { v4 as uuid } from "uuid";
import { CreateContractVersion } from "./contract-versions";
import { LogAudit } from "../audit";

export async function CreateContractRecord({
  title,
  content,
  ownerSignatureId,
  receiverName,
  receiverEmail,
  optionalMessage,
}: {
  title: string,
  content: string,
  ownerSignatureId: string,
  receiverName: string,
  receiverEmail: string,
  optionalMessage?: string
}): Promise<CustomApiResponse<Contract>> {
  const supabase = await createClient();

  try {
    const BASE_ERROR_MESSAGE = "Failed to create contract. Error: "
    const { data: user, error: userError } = await GetCurrentUserWithCompany()

    if (userError) throw Error(userError)

    console.log("user in create contract")
    console.log(user)

    const contractUUID = uuid()
    const contractVersionUUID = uuid()

    const { error: contractVersionError } = await CreateContractVersion({
      contractId: contractUUID,
      content,
      contractVersionUUID
    })

    if (contractVersionError) {
      throw new Error(BASE_ERROR_MESSAGE + contractVersionError)
    }


    const { data: contractData, error: contractError } = await supabase.from("contracts")
      .insert({
        id: contractUUID,
        title,
        ownerId: user?.id,
        companyId: user?.company?.id,
        status: ContractStatus.OUT_FOR_SIGNATURE,
        createdAt: new Date(),
        updatedAt: new Date(),

        // TODO: Handle dynamic expiry date
        expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
        ownerSignatureId,
        receiverName,
        receiverEmail,
        optionalMessage,
        currentVersionId: contractVersionUUID
      })
      .select("*")
      .maybeSingle()

    if (contractError) throw new Error(BASE_ERROR_MESSAGE + contractError.message)


    await LogAudit({
      contractId: contractData?.id!,
      action: "CONTRACT_CREATED",
      actorType: "SENDER",
      ip: "192.168.1.1",
      userAgent: "Chrome",
      metadata: {},
      contractVersion: 1
    })
    await LogAudit({
      contractId: contractData?.id!,
      action: "CONTRACT_SIGNED_OWNER",
      actorType: "SENDER",
      ip: "192.168.1.1",
      userAgent: "Chrome",
      metadata: {},
      contractVersion: 1
    })


    return {
      status: Status.SUCCESS,
      data: contractData
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
        owner: users(*),
        currentVersionContent: contract_versions(*)
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
  receiverSignature?: Signature,
  currentVersion: ContractVersion
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
        receiverSignature: contracts_receiverSignatureId_fkey(*),
        owner: users(*),
        currentVersion: contract_versions(*)
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


export async function DeleteContract({
  contractId
}: {
  contractId: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const BASE_ERROR_MESSAGE = "Failed to delete contract with id: " + contractId + " . Error: "
    const { data: authUser } = await GetAuthUser()

    if (!authUser) throw new Error(BASE_ERROR_MESSAGE + "User not signed in")

    const { data: contractData, error: contractError } = await GetContractWithCompanyAndOwner({ contractId })

    if (contractError) throw new Error(BASE_ERROR_MESSAGE + contractError)
    if (contractData?.ownerId !== authUser.id) throw new Error(BASE_ERROR_MESSAGE + "Contract does not belong to user")

    const { error: deletionError } = await supabase.from("contracts")
      .delete()
      .eq("id", contractId)
      .maybeSingle()

    if (deletionError) throw new Error(BASE_ERROR_MESSAGE + deletionError.message)
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