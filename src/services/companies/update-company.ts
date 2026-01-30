import { createClient } from "@/lib/supabase/server";
import { Company } from "@prisma/client";

export async function updateCompany(companyId: string, payload: Partial<Company>): Promise<Company> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("companies")
        .update(payload)
        .eq("id", companyId)
        .select("*")
        .maybeSingle()

    if (error) {
        console.warn(`Failed to update company details for company '${companyId}' Error: + ${error.message}`)
        throw new Error("Failed to update company details. Please try again later.")
    }

    return data
}