import { draftMode } from "next/headers"

// api for disabling Draft mode in Next.js
// toggles off Draft Mode for the current user and they will now see the published content
export async function GET() {
    draftMode().disable()
    return new Response("Draft mode is disabled")
}