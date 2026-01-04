import ContractService from "@/services/contracts";
import { Status } from "@/types/api-call";
import { ContractDBInsertPayload } from "@/types/services/contracts";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { extractClientIp } from "../../utils";
import UserService from "@/services/users";

export async function PATCH(req: NextRequest) {
  try {
    const { ip, userAgent } = extractClientIp(req)
    const { user } = await UserService.getCurrentUserWithCompany()

    const body = await req.json() as ContractDBInsertPayload
    const data = await ContractService.updateContract(body)

    return NextResponse.json({
      status: Status.SUCCESS,
      data: data,
    }, {
      status: 200
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        status: Status.FAILED,
        error: error.flatten(),
      }, {
        status: 400
      });
    }

    return NextResponse.json({
      status: Status.FAILED,
      error: error.message || "Internal Server Error",
    }, {
      status: 500
    });
  }
}