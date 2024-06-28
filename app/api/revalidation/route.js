// route.js is a reserved file name that specified you are creating a custom request handler
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  const requestHeaders = new Headers(request.headers);
  // checks for existence of x-vercel-reveal-key header.
  // restricts calls to this API to contentful via CONTENTFUL_REVALIDATE_SECRET value
  const secret = requestHeaders.get("x-vercel-reval-key");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // purge cache for components with "articles" tag
  revalidateTag("articles");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}