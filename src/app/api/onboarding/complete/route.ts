import OnboardingService from "@/services/onboarding"
import { Status } from "@/types/api-call"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    await OnboardingService.completeOnboarding()

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