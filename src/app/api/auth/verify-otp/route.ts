import AuthService from "@/services/auth";
import { Status } from "@/types/api-call";
import { T_OTPOperationPayload } from "@/types/services/auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import UserService from "@/services/users";
import OnboardingService from "@/services/onboarding";

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json() as T_OTPOperationPayload
    const user = await AuthService.verifyOTP({ email, token })

    if (!user) throw new Error("Nu am putut gasi userul in baza de date.")

    await UserService.createUserRecord({
      id: user.id,
      email: user.email!,
      firstName: user.user_metadata.firstName,
      lastName: user.user_metadata.lastName,
    })

    await OnboardingService.createUserOnboarding({ userId: user.id })

    return NextResponse.json({
      status: Status.SUCCESS,
      data: user,
    }, {
      status: 200
    });
  } catch (error: any) {
    console.log("error")
    console.log(error)
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