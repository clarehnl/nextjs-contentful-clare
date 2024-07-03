import { getAllFlexiblePages, getFlexiblePage } from "@/lib/api"
import HeroBanner from "../../_components/heroBanner"
import TextBlock from "../../_components/textBlock"
import Article from "../../_components/article"
import { FlexPage, FlexiblePageContent } from "@/utils/types"
import { notFound } from "next/navigation"


export async function generateStaticParams() {
    const allArticles = await getAllFlexiblePages()
    
    return allArticles.map((flexPage: FlexPage) => ({
      slug: flexPage.slug
    }))
}

export default async function FlexiblePage({params}: {params: {slug: string}}) {
    const pageContent = await getFlexiblePage(params.slug)

    if(!pageContent) {
        notFound()
    }

    return (
        <main className="min-h-screen p-24 bg-white">
            <h1 className="px-24 text-4xl tracking-tighter sm:text-5xl">{pageContent.title}</h1>
            { pageContent.sectionsCollection.items.map((content: FlexiblePageContent) =>{
                switch (content.__typename) {
                    case "GenericHeroBanner": 
                        return <HeroBanner slug={content.slug} />
                    case "TextBlock": 
                        return (
                            <div className="m-10">
                                <TextBlock slug={content.slug} />
                            </div>
                        )
                    case "KnowledgeArticle":
                        return (
                            <div className="m-10">
                                <Article slug={content.slug} />
                            </div>
                        )
                    default:
                        return
                }
            }) 
            }
        </main>
    )
}