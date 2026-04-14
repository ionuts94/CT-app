import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";
import { AffiliateAccount } from "@prisma/client";

export async function createAffiliateAccount(payload: { userId: string }) {
    return httpPost<AffiliateAccount>(api.affiliate.createAffiliateAccount, payload)
}