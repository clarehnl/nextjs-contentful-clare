import { notFound } from "next/navigation"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { draftMode } from "next/headers"
import { getTextBlock } from "@/lib/api"

export default async function TextBlock({slug}: {slug: string}) {
    const { isEnabled } = draftMode()
    const textBlock = await getTextBlock(slug, isEnabled)
    if (!textBlock) {
      notFound()
    }

    return (
      <section className="w-full bg-white">
        <div className="w-full px-10 py-10 h-full" style={{color: textBlock.contentTextColour}}>
          {documentToReactComponents(textBlock.content.json)}
        </div>
      </section>
  )
}