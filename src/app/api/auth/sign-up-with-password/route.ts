import { NextRequest, NextResponse } from "next/server";
import { Status } from "@/types/api-call";
import AuthService from "@/services/auth";
import { T_SignUpSchema } from "@/validators/auth.validator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as T_SignUpSchema
    await AuthService.signUpWithPassword(body)

    return NextResponse.json({
      status: Status.SUCCESS,
      data: "OK"
    })
  } catch (err: any) {
    return NextResponse.json({
      status: Status.FAILED,
      error: err.message
    })
  }
}