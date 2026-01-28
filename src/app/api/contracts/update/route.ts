import ContractService from "@/services/contracts"
import { Status } from "@/types/api-call"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { extractClientIp } from "../../utils"
import UserService from "@/services/users"
import { ContractStatus } from "@prisma/client"
import { v4 as uuid } from "uuid"
import AuditService from "@/services/audit"
import { T_UpdateContractBody } from "@/types/api/contracts"
import AuthService from "@/services/auth"

const LOCKED_UPDATE_STATES: ContractStatus[] = [
  ContractStatus.FULLY_SIGNED,
  ContractStatus.EXPIRED,
  ContractStatus.REVOKED,
  ContractStatus.DECLINED,
]

export async function PATCH(req: NextRequest) {
  try {
    const { ip, userAgent } = extractClientIp(req)
    const authUser = await AuthService.getAuthUser()

    const user = await UserService.getUserWithCompany({ userId: authUser.id })

    const body = (await req.json()) as T_UpdateContractBody
    const contractId = body.contractId

    if (!contractId) {
      throw new Error("A technical error occurred while updating the contract.")
    }

    const contractData =
      await ContractService.getContractWithCompanyAndOwner({ contractId })

    if (LOCKED_UPDATE_STATES.includes(contractData.status)) {
      throw new Error(
        "This contract can no longer be modified due to its current status."
      )
    }

    const hasContentChanged = await ContractService.hasContentChanged({
      currentContent: contractData.currentVersionContent.content,
      newContent: body.content,
    })

    const newContractVersionId = uuid()

    if (hasContentChanged) {
      const newContractVersionNumber = contractData.currentVersionContent.versionNumber + 1

      await ContractService.createContractVersion({
        versionId: newContractVersionId,
        contractId: contractData.id,
        content: body.content,
        versionNumber: newContractVersionNumber,
      })

      await AuditService.logAudit({
        contractId: contractData.id,
        action: "CONTRACT_UPDATED",
        actorType: "SENDER",
        ip,
        userAgent,
        contractVersion: newContractVersionNumber,
        metadata: {},
        userId: user.id,
        userEmail: user.email,
      })
    }

    const data = await ContractService.updateContract({
      ...contractData,
      ...body,
      updatedAt: new Date(),
      currentVersionId: hasContentChanged
        ? newContractVersionId
        : contractData.currentVersionId,
    })

    return NextResponse.json(
      {
        status: Status.SUCCESS,
        data,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error updating contract:", error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: Status.FAILED,
          error: error.flatten(),
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        status: Status.FAILED,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    )
  }
}
