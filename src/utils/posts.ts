import { getCollection } from 'astro:content';

/**
 * All blog posts, newest first.
 * Drafts are visible with `astro dev` so you can preview them,
 * but never included in the production build.
 */
export async function getPosts() {
    const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
    return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
