import { Status } from "@/types/api-call";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import TemplateService from "@/services/templates";
import { Template } from "@prisma/client";

export async function DELETE(req: NextRequest) {
  try {
    const { templateId } = await req.json()
    const data = await TemplateService.deleteTemplate({ templateId })

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