import StorageService from "@/services/storage";
import { Status } from "@/types/api-call";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const file = formData.get("file") as File
    const filePath = formData.get("filePath") as string
    const bucket = formData.get("bucket") as string
    const contentType = formData.get("contentType") as string | null

    if (!file || !filePath || !bucket) {
      return NextResponse.json(
        { status: Status.FAILED, error: "Invalid payload" },
        { status: 400 }
      )
    }

    const data = await StorageService.storeFile({
      file,
      filePath,
      bucket,
      contentType: contentType ?? undefined,
    })

    return NextResponse.json(
      { status: Status.SUCCESS, data },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { status: Status.FAILED, error: error.message },
      { status: 500 }
    )
  }
}
