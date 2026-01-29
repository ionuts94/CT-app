import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";
import { T_ChangeMainSignaturePayload } from "@/types/services/signatures";

export async function changeMainSignature(payload: T_ChangeMainSignaturePayload) {
    return httpPost(api.signatures.changeMainSignature, payload)
}