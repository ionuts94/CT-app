import AffiliateService from "@/services/affiliate"
import { Status } from "@/types/api-call"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as { userId: string }

        const affiliate = await AffiliateService.createAffiliateAccount(body)

        return NextResponse.json({
            status: Status.SUCCESS,
            data: affiliate
        })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            status: Status.FAILED,
            error: error.message
        })
    }
}