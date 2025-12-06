import { NextRequest, NextResponse } from "next/server";
import { Status } from "@/types/api-call";
import { z, ZodError } from "zod";
import { v4 as uuid } from "uuid";
import { ContractStatus } from "@prisma/client";
import { extractClientIp } from "../../utils";
import * as ContractService from "@/services/contracts"
import * as AuthService from "@/services/auth"

const CreateContractSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  ownerSignatureId: z.string().uuid(),
  receiverName: z.string().min(1),
  receiverEmail: z.string().email(),
  optionalMessage: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { ip, userAgent } = extractClientIp(req)
    const json = await req.json();
    const body = CreateContractSchema.parse(json);

    const contractUUID = uuid();
    const contractVersionUUID = uuid();

    const user = await AuthService.getUserWithCompany()

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
      status: ContractStatus.OUT_FOR_SIGNATURE,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),

      ownerSignatureId: body.ownerSignatureId,
      receiverName: body.receiverName,
      receiverEmail: body.receiverEmail,
      optionalMessage: body.optionalMessage ?? null,
      currentVersionId: contractVersionUUID,
    })

    await ContractService.logAudit({
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

    await ContractService.logAudit({
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
        error: error.flatten(),
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
