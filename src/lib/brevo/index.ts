import { envs } from "@/constants/envs";

const brevoSDK = require("@getbrevo/brevo")

const brevo = new brevoSDK.TransactionalEmailsApi();
brevo.authentications.apiKey.apiKey = envs.NEXT_PUBLIC_BREVO_API_KEY || '';

export { brevo }