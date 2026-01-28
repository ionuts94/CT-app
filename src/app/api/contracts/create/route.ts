import { NextRequest, NextResponse } from "next/server";
import { Status } from "@/types/api-call";
import { z, ZodError } from "zod";
import { v4 as uuid } from "uuid";
import { ContractStatus } from "@prisma/client";
import { extractClientIp } from "../../utils";
import ContractService from "@/services/contracts"
import AuditService from "@/services/audit";
import UserService from "@/services/users";
import { ContractSchema } from "@/validators/contract.validator";
import { T_CreateContractBody } from "@/types/api/contracts";
import AuthService from "@/services/auth";

export async function POST(req: NextRequest) {
  try {
    const { ip, userAgent } = extractClientIp(req)
    const json = await req.json() as T_CreateContractBody
    const body = ContractSchema.parse(json);

    const contractUUID = uuid();
    const contractVersionUUID = uuid();

    const authUser = await AuthService.getAuthUser()

    const user = await UserService.getUserWithCompany({ userId: authUser.id })

    await ContractService.createContractVersion({
      versionId: contractVersionUUID,
      contractId: contractUUID,
      content: body.content,
    })

    const contractData = await ContractService.createContract({
      id: contractUUID,
      title: body.title,
      ownerId: user.id,
      companyId: user.company?.id,
      status: ContractStatus.DRAFT,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: body.expiresAt ?? null,

      ownerSignatureId: body.ownerSignatureId,
      receiverName: body.receiverName,
      receiverEmail: body.receiverEmail,
      optionalMessage: body.optionalMessage ?? null,
      currentVersionId: contractVersionUUID,
      signingDeadline: body.signingDeadline
    })

    await AuditService.logAudit({
      contractId: contractData.id,
      action: "CONTRACT_CREATED",
      actorType: "SENDER",
      ip,
      userAgent,
      contractVersion: 1,
      metadata: {},
      userId: user.id,
      userEmail: user.email,
    });

    await AuditService.logAudit({
      contractId: contractData.id!,
      action: "CONTRACT_SIGNED_OWNER",
      actorType: "SENDER",
      ip: ip,
      userAgent: userAgent ?? "unknown",
      metadata: {},
      contractVersion: 1,
      userId: user.id,
      userEmail: user.email,
    });

    return NextResponse.json({
      status: Status.SUCCESS,
      data: contractData,
    }, {
      status: 200
    });
  } catch (error: any) {
    // Zod validation error
    if (error instanceof ZodError) {
      return NextResponse.json({
        status: Status.FAILED,
        error: error.message,
      }, {
        status: 400
      });
    }

    // Generic error
    return NextResponse.json({
      status: Status.FAILED,
      error: error.message || "Internal Server Error",
    }, {
      status: 500
    });
  }
}
