export const ARTICLE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
  details {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
  date
  authorName
  categoryName
  articleImage {
    url
  }
`;

export const HEROBANNER_GRAPHQL_FIELDS = `
sys {
  id
}
slug
heroBannerImage {
  url
}
heroBackground
heroHeadline
heroHeadlineColour
headlineDescription {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
descriptionTextColour
heroBlockButton
phoneNumberPreferTalkText
phoneNumberPreferTalkTextColour
phoneNumber
phoneNumberTextColour
prepositionIcon {
  url
}
prepositionText
prepositionTextColour
blockTopMargin
`

export const TEXTBLOCK_GRAPHQL_FIELDS = `
  sys {
    id
  }
  slug
  contentTextColour
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`
// extremely useful to test your queries https://graphql.contentful.com/content/v1/spaces/{SPACE_ID}/explore?access_token={ACCESS_TOKEN}
// Doc: https://www.contentful.com/developers/docs/references/graphql/#/reference/schema-generation/one-to-many-single-type-relationships 
export const FLEXPAGE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  slug
  title
  sectionsCollection {
    items {
      __typename
      ... on KnowledgeArticle {
        slug
      }
      ... on GenericHeroBanner {
        slug
      }
      ... on TextBlock {
        slug
      }
    }
  }
`