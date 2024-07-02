import { getHeroBanner } from "@/lib/api"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import Image from "next/image"

export default async function HeroBanner({slug}: {slug: string}) {
    const { isEnabled } = draftMode()
    const heroBanner = await getHeroBanner(slug, isEnabled)
    if (!heroBanner) {
      notFound()
    }
    const heroImageStyling = {
        backgroundImage: `url('${heroBanner.heroBannerImage?.url}')`
    }

    return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white">
        <div id="generic-hero-banner" className="flex items-center bg-cover bg-no-repeat bg-center w-screen h-svh" style={heroImageStyling}>
            <div className="m-30 text-center" style={{backgroundColor: heroBanner.heroBackground ? "none" : "rgba(255,255,255,.9)"}}>
                <h1 className="text-5xl font-extrabold" style={{color: heroBanner.heroHeadlineColour}}>{heroBanner.heroHeadline}</h1>
                <div className="px-6 py-6" style={{color: heroBanner.descriptionTextColour ? "grey": "white"}}>{documentToReactComponents(heroBanner.headlineDescription.json)}</div>
                <a href={heroBanner.heroBlockButton.buttonLink}>
                    <button type="button" className="select-none rounded-lg bg-orange-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-50 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        {heroBanner.heroBlockButton.buttonText}
                    </button>
                </a>
                <div className="flex items-center justify-center text-center pt-6">
                    <p className="pr-1" style={{color: heroBanner.phoneNumberPreferTalkTextColour}}>{heroBanner.phoneNumberPreferTalkText}</p>
                    <p className="pl-1" style={{color: heroBanner.phoneNumberTextColour}}>{heroBanner.phoneNumber}</p>
                </div>
                <div className="flex justify-center pt-6">
                <Image
                    alt="Article Image"
                    className="pr-1"
                    height={30}
                    src={heroBanner.prepositionIcon.url}
                    width={30}
                />
                <p className="pl-1" style={{color: heroBanner.prepositionTextColour}}>{heroBanner.prepositionText}</p>
                </div>
            </div>
        </div>
    </main>
  )
}