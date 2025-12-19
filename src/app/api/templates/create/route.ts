import { Status } from "@/types/api-call";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { T_CreateTemplateSchema } from "@/validators/template.validator";
import TemplateService from "@/services/templates";

export async function POST(req: NextRequest) {
  try {
    const createTemplatePayload = await req.json() as T_CreateTemplateSchema
    const data = await TemplateService.create(createTemplatePayload)

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