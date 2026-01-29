import SignatureService from "@/services/signatures"
import { Status } from "@/types/api-call"
import { T_ChangeMainSignaturePayload } from "@/types/services/signatures"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as T_ChangeMainSignaturePayload

        const response = await SignatureService.changeMainSignature({ newMainSignatureId: body.newMainSignatureId })

        return NextResponse.json({
            status: Status.SUCCESS,
            data: response
        })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            status: Status.FAILED,
            error: "Failed to update main signature. " + error.message
        })
    }
}