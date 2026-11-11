---
title: "Why I chose Astro for this site"
description: "Zero JavaScript by default, pages built ahead of time, components that read like HTML: why I picked Astro over Next.js for this site."
date: 2026-11-05
kind: note
tags: [astro, web]
---

I already knew React and Next.js when I started this site: I use React on a team project at Epitech. Reaching for Next.js would have been the obvious choice. I picked Astro instead, for two reasons: the site doesn't need what Next.js offers, and I wanted to learn something new. This note explains that choice and the two Astro ideas I found most useful.

## The problem: a site made of content

Look at what this site actually does: a home page, a projects page, an about page and a blog. Almost nothing is interactive. There is no login, no form, no data that changes while you read.

A Next.js site, even with Server Components, still sends the React runtime and its router to the browser. That makes sense for an application. For a page of text, it is code the visitor downloads and runs for nothing. Next.js also brings concepts I didn't need here: the App Router, `'use client'`, server rendering, API routes.

Astro starts from the opposite assumption: **a page is HTML, and JavaScript is the exception**. By default, a page ships zero JavaScript. If a component needs interactivity, you opt in for that component only (Astro calls these *islands*).

## Idea 1: a component is HTML with a frontmatter

An `.astro` file has two parts. Between the `---` fences is code that runs **at build time**, on my machine, never in the browser. Below is the template, then the styles. Here is a simplified version of this site's hero:

```astro title="src/components/Hero.astro"
---
// Runs at build time: imports, data, logic
import Button from './Button.astro';
import { CV_URL, EMAIL } from '../data/site';
---

<section class="hero">
  <h1>Steve NGUELE</h1>
  <Button variant="primary" href={CV_URL} download>Download my CV</Button>
  <Button variant="ghost" href={`mailto:${EMAIL}`}>Get in touch →</Button>
</section>

<style>
  /* Scoped: these rules only apply to this component */
  .hero { display: flex; flex-direction: column; gap: 24px; }
</style>
```

There is no `useState`, no hook, no client/server boundary to think about. If you can read HTML, you can read this file. The styles are scoped automatically, so a `.hero` rule here can't break a page elsewhere.

When I do need JavaScript, I write a plain `<script>` tag in the component. On this site, the only one worth mentioning highlights the current section in an article's table of contents, in about fifteen lines with an `IntersectionObserver`. Everything else is static HTML.

## Idea 2: pages are generated at build time

The blog posts are Markdown files in `src/content/blog/`. The page that displays them, `src/pages/blog/[id].astro`, is a single template. To turn it into one page per post, Astro asks for a `getStaticPaths` function:

```astro title="src/pages/blog/[id].astro"
---
import { getPosts } from '../../utils/posts';

// Called once, at build time: one entry = one generated page
export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({
    params: { id: post.id },   // the URL: /blog/why-astro
    props: { post },           // the data passed to the template
  }));
}

const { post } = Astro.props;
---
```

When I run `npm run build`, Astro calls this function, gets the list of posts, and writes one HTML file for each. The RSS feed is built the same way. The result is a `dist/` folder of plain files.

That has a concrete consequence for hosting. There is no Node server to run, monitor or update: Cloudflare serves the files as they are. A visitor gets a page that is already complete, and nothing can fail at request time, because nothing happens at request time.

## What I take away

Coming from the backend, I find Astro reassuring. The work happens once, at build time, where I control it, instead of in each visitor's browser. The tool fits the problem: a content site gets HTML, and JavaScript only where it earns its place.

Next.js remains the better choice for an application with users, sessions and live data. For a portfolio and a blog, Astro let me write less code, ship less code, and learn a different way of thinking about the web.
