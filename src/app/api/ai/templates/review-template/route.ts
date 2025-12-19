import AIService from "@/services/ai";
import { Status } from "@/types/api-call";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await AIService.templates.reviewTemplate(body)

    return NextResponse.json({
      status: Status.SUCCESS,
      data: "",
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