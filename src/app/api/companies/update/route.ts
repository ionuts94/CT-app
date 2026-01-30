import { createClient } from "@/lib/supabase/server"
import CompanyService from "@/services/companies"
import { Status } from "@/types/api-call"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {
        const { companyId, payload } = await req.json()

        const updatedCompany = await CompanyService.updateCompany(companyId, payload)

        return NextResponse.json({
            status: Status.SUCCESS,
            data: updatedCompany
        })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            status: Status.FAILED,
            error: error.message
        })
    }
}