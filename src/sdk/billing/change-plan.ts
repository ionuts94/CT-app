import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";

export async function changePlan(body: { priceId: string }) {
    return httpPost<{ redirectUrl: string }>(api.billing.changePlan, body)
}