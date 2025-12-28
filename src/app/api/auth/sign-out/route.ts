import AuthService from "@/services/auth";
import { Status } from "@/types/api-call";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST() {
  try {
    const response = await AuthService.signOut()

    return NextResponse.json({
      status: Status.SUCCESS,
      data: response,
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