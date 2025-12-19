import { Status } from "@/types/api-call";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import TemplateService from "@/services/templates";
import { Template } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const updateTemplatePayload = await req.json() as Template
    const data = await TemplateService.update(updateTemplatePayload)

    return NextResponse.json({
      status: Status.SUCCESS,
      data: data,
    }, {
      status: 200
    });
  } catch (error: any) {
    // Zod validation error
    if (error instanceof ZodError) {
      return NextResponse.json({
        status: Status.FAILED,
        error: error.flatten(),
      }, {
        status: 400
      });
    }

    // Generic error
    return NextResponse.json({
      status: Status.FAILED,
      error: error.message || "Internal Server Error",
    }, {
      status: 500
    });
  }
}