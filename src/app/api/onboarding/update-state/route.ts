import OnboardingService from "@/services/onboarding"
import { Status } from "@/types/api-call"
import { T_UpdateOnboardingStateBody } from "@/types/api/onboarding"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as T_UpdateOnboardingStateBody
    await OnboardingService.updateOnboardingState(body)

    return NextResponse.json({
      status: Status.SUCCESS,
      data: ""
    })
  } catch (err: any) {
    return NextResponse.json({
      status: Status.FAILED,
      error: err.message
    })
  }
}