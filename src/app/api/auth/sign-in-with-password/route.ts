import { NextRequest, NextResponse } from "next/server";
import { Status } from "@/types/api-call";
import AuthService from "@/services/auth";
import { T_SingInWithPasswordBody } from "@/types/api/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json() as T_SingInWithPasswordBody
    const authUser = await AuthService.signInWithPassword({ email, password })

    return NextResponse.json({
      status: Status.SUCCESS,
      data: authUser
    })
  } catch (err: any) {
    return NextResponse.json({
      status: Status.FAILED,
      error: err.message
    })
  }
}