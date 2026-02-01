import { cookies } from "next/headers"
import EventLogService from "@/services/event-log-service"
import { NextResponse } from "next/server"
import { Status } from "@/types/api-call"

export async function POST(req: Request) {
  const { event, path, source } = await req.json()

  const cookieStore = await cookies()
  let sessionId = cookieStore.get("pactly_session_id")?.value

  if (!sessionId) {
    sessionId = crypto.randomUUID()
    cookieStore.set("pactly_session_id", sessionId, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 7 zile
    })
  }

  await EventLogService.logEvent({
    event,
    path,
    source,
    sessionId,
  })

  return NextResponse.json({
    status: Status.SUCCESS,
    data: "",
  }, {
    status: 200
  });
}
