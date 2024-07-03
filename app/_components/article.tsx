import { getArticle } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { draftMode } from "next/headers"

export default async function Article({slug}: {slug: string}) {
    const { isEnabled } = draftMode()
    const article = await getArticle(slug, isEnabled)
    if (!article) {
      notFound()
    }

    return (
      <section className="w-full px-16">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              {article.title}
            </h1>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              {article.summary}
            </p>
          </div>
          <div className="space-y-8 lg:space-y-10">
            <Image
              alt="Article Image"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height="365"
              src={article.articleImage.url}
              width="650"
            />
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <div className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                  {documentToReactComponents(article.details.json)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}