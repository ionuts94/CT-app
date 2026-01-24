import AuthService from "@/services/auth";
import SignatureService from "@/services/signatures";
import { Status } from "@/types/api-call";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const authUser = await AuthService.getAuthUser()
    if (!authUser) throw new Error("Unauthorized operation. User not signed in.")

    const { fileUrl } = await req.json();

    const response = await SignatureService.create({
      userId: authUser.id,
      imageUrl: fileUrl,
      type: "DRAW"
    })

    return NextResponse.json({
      status: Status.SUCCESS,
      data: response,
    }, {
      status: 200
    });
  } catch (error: any) {
    console.log("Error while resending OTP")
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