import { getAllArticles } from "@/lib/api"
import { knowledgeArticle } from "@/utils/types"
import Article from "@/app/_components/article"


// we can improve performance by retrieving all articles and rendering the detail page at build time (static rendering)
export async function generateStaticParams() {
  const allArticles = await getAllArticles()
  
  return allArticles.map((article: knowledgeArticle) => ({
    slug: article.slug
  }))
}

export default async function KnowledgeArticle({params}: {params: {slug: string}}) {
  // see if we are on draft preview mode
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
        <Article slug={params.slug} />
      </main>
    )
}