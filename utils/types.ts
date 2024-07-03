export type knowledgeArticle = {
  sys: {
    id: string
  }
  title: string,
  slug: string,
  summary: string,
  details: {
    links: {
      assets: {
        block: {
          sys: {
            id: string
          }
          url: string,
          description: string
        }
      }
    }
  },
  date: Date,
  authorName: string,
  categoryName: string,
  articleImage: {
    url: string
  }
}

export type heroBanner = {
  sys: {
    id: string
  }
  slug: string
  heroBackground: boolean
  heroHeadline: string
  heroHeadlineColour: string
  descriptionTextColour: boolean
  heroBlockButton: {
    buttonLink: string
    buttonText: string
  }
  phoneNumberPreferTalkText: string
  phoneNumberPreferTalkTextColour: string
  phoneNumber: string
  phoneNumberTextColour: string
  prepositionText: string
  prepositionTextColour: string
  blockTopMargin: number
  heroBannerImage: {
    url: string
  }
  prepositionIcon: {
    url: string
  }
  headlineDescription: {
    links: {
      assets: {
        block: {
          sys: {
            id: string
          }
          url: string,
          description: string
        }
      }
    },
    json: any
  }
}

export type textBlock = {
  sys: {
    id: string
  }
  slug: string,
  content: {
    links: {
      assets: {
        block: {
          sys: {
            id: string
          }
          url: string,
          description: string
        }
      }
    }
  },
  contentTextColour: string
}

export type FlexPage = {
  sys: {
      id: string
  }
  slug: string
  title: string
  sectionsCollection: {
      items: FlexiblePageContent[]
  }
}

export type FlexiblePageContent = {
  __typename: string
  slug: string
}