This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Available Pages to view

This POC project is currently being hosted by Vercel.
You can visit the page here: https://nextjs-contentful-clare-oa4dtnhao-clareahnems-projects.vercel.app/

Some pages to check out are;
- `/` 
    - root page was created by following the documentation provided by contentful: https://www.contentful.com/blog/integrate-contentful-next-js-app-router/
    - This page will display the list of blog contents that is available to view
    - by clicking on the blog component, you will be able to view the full blog content `/articles/{unique-article-slug}`
- `/hero-banner`
    - this will lead you to the generic hero banner block that has been replicated from the existing iselect-wp-repository
- `/flexible-page/{unique-flexiblePage-slug}`
    - This is a page with flexible page contents. It can take in multiple component blocks that have been created.
    - currently, we have `/flexible-page/first-flexible-page` working, which includes the generic hero banner, some text blocks and a blog article


