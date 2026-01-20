import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";

export async function cancelSubscription() {
    return httpPost(api.billing.cancelSubscription)
}