import TemplateService from "@/services/templates";
import { Status } from "@/types/api-call";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category")

    const tempaltes = await TemplateService.getUserTemplates({ category: category === "undefined" ? undefined : category! })

    return NextResponse.json({
      status: Status.SUCCESS,
      data: tempaltes,
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