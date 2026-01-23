import OnboardingService from "@/services/onboarding"
import { Status } from "@/types/api-call"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    console.log("Completing onboarding")
    await OnboardingService.completeOnboarding()

    return NextResponse.json({
      status: Status.SUCCESS,
      data: ""
    })
  } catch (err: any) {
    console.log("Error completting onboarding")
    console.log(err)

    return NextResponse.json({
      status: Status.FAILED,
      error: err.message
    })
  }
}