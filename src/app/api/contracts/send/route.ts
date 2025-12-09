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


    return NextResponse.json({
      status: Status.SUCCESS,
      data: "",
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
