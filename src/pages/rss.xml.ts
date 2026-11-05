import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../utils/posts';
import { AUTHOR, SITE_DESCRIPTION } from '../data/site';

// RSS feed of the blog, served at /rss.xml
export async function GET(context: APIContext) {
    const posts = await getPosts();

    return rss({
        title: `${AUTHOR} — Blog`,
        description: SITE_DESCRIPTION,
        site: context.site!,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            categories: post.data.tags,
            link: `/blog/${post.id}/`,
        })),
    });
}
