import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";
import { AnalyticsEvent } from "@/services/event-log-service/types";

export async function log(payload: {
  event: AnalyticsEvent,
  path: string,
  source?: string,
}) {
  return fetch(api.eventLog.log, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}