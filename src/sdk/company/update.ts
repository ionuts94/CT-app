import { Company } from "@prisma/client";
import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function update(companyId: string, payload: Partial<Company>) {
    return httpPost<Company>(api.companies.update, { companyId, payload })
}