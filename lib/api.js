import { 
  TEXTBLOCK_GRAPHQL_FIELDS,
  ARTICLE_GRAPHQL_FIELDS,
  HEROBANNER_GRAPHQL_FIELDS,
  FLEXPAGE_GRAPHQL_FIELDS
} from "@/utils/dataFields";

// This is a file used to fetch content via Contentful's GraphQL API

// Set a variable that contains all the fields needed for articles when a fetch for content is performed
// these are the fields for our "knowledgeArticle" content model
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

async function fetchGraphQL(query, preview = false) {
  return fetch(
   `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      // Associate all fetches for articles with an "articles" cache tag so content can
      // be revalidated or updated from Contentful on publish
      // for an application that has multiple detail pages, it would be better to include a page-specific tag
      // that way, we can revalidate the cache for an individual page without purging the cache for all pages
      next: { tags: ["articles"] },
    }
  ).then((response) => response.json());
}

function extractArticleEntries(fetchResponse) {
  return fetchResponse?.data?.knowledgeArticleCollection?.items;
}

export async function getAllArticles(
  // For this demo set the default limit to always return 3 articles.
  limit = 5,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const articles = await fetchGraphQL(
    `query {
        knowledgeArticleCollection(where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractArticleEntries(articles);
}

export async function getArticle(
  slug,
  isDraftMode = false
) {
  const article = await fetchGraphQL(
    `query {
        knowledgeArticleCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractArticleEntries(article)[0];
}

function extractHeroBannerEntries(fetchResponse) {
  return fetchResponse?.data?.genericHeroBannerCollection?.items;
}

export async function getHeroBanner(
  slug,
  isDraftMode = false
) {
  const heroBanner = await fetchGraphQL(
    `query {
      genericHeroBannerCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${HEROBANNER_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return extractHeroBannerEntries(heroBanner)[0]
}

function extractTextBlockEntries(fetchResponse) {
  return fetchResponse?.data?.textBlockCollection?.items;
}

export async function getAllTextBlocks(
  // For this demo set the default limit to always return 3 articles.
  limit = 5,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const textBlocks = await fetchGraphQL(
    `query {
        textBlockCollection(where:{slug_exists: true}, limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${TEXTBLOCK_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractTextBlockEntries(textBlocks);
}

export async function getTextBlock(
  slug,
  isDraftMode = false
) {
  const textBlock = await fetchGraphQL(
    `query {
      textBlockCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${TEXTBLOCK_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return extractTextBlockEntries(textBlock)[0]
}

export async function getAllFlexiblePages(
  limit = 5,
  isDraftMode = false
) {
  const pageContent = await fetchGraphQL(
    `query {
      flexiblePageCollection(where:{slug_exists: true}, limit: ${limit}, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${FLEXPAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return pageContent?.data?.flexiblePageCollection?.items
}

export async function getFlexiblePage(
  slug,
  isDraftMode = false
) {
  const pageContent = await fetchGraphQL(
    `query {
      flexiblePageCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${FLEXPAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return pageContent?.data?.flexiblePageCollection?.items[0]
}

