import { getArticle } from "@/lib/api"
import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")
    const slug = searchParams.get("slug")

    // verify that the slug and secrets exist
    if (!secret || !slug) return new Response("Missing parameters", { status: 400 })

    // verify that the secret is valid
    if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) return new Response("Invalid token", { status: 401 })


    const article = await getArticle(slug)
    if(!article) return new Response("Article not found", { status: 404 })

    // set user's preview cookie before redirecting to the page
    draftMode().enable()
    redirect(`/articles/${article.slug}`)
}