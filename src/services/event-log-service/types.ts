export type AnalyticsEvent =
  | "page_view"
  | "cta_home_primary"
  | "cta_home_secondary"
  | "cta_agencies_primary"
  | "cta_agencies_secondary"
  | "signup_view"

export type LogEventInput = {
  event: AnalyticsEvent
  path: string
  source?: string
  sessionId: string
  userId?: string | null
}