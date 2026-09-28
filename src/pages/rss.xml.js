// RSS-feed van de verhalen (posts). De homepage en de "In opbouw"-tekst verwezen al naar
// /rss.xml zonder dat die bestond; sinds 2026-09-28 bestaat hij.
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'knowledge.bimforce.com — verhalen',
    description:
      'Praktijk-verhalen uit het werk van bimforce aan informatiestandaarden in de gebouwde omgeving.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.slug}/`,
    })),
    customData: '<language>nl-nl</language>',
  });
}
