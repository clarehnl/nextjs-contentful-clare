import { getAllTextBlocks } from "@/lib/api"
import { textBlock } from "@/utils/types"
import TextBlock from "@/app/_components/textBlock"


// we can improve performance by retrieving all articles and rendering the detail page at build time (static rendering)
export async function generateStaticParams() {
  const allArticles = await getAllTextBlocks()
  
  return allArticles.map((textBlock: textBlock) => ({
    slug: textBlock.slug
  }))
}

export default async function Content({params}: {params: {slug: string}}) {
    return <TextBlock slug={params.slug} />
}