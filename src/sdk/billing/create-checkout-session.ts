import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";

export async function createCheckoutSession(body: { priceId: string }) {
    return httpPost<{ redirectUrl: string }>(api.billing.checkout, body)
}