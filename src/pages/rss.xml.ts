import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles');
  const sorted = articles.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'Bountymon Blog',
    description: 'Guides, case studies, and opinions on replacing enterprise software with vibe-coded alternatives.',
    site: context.site!,
    items: sorted.map(article => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: new Date(article.data.date),
      link: `/blog/${article.data.slug}/`,
      categories: [article.data.category, ...article.data.tags],
      author: article.data.author,
    })),
    customData: `<language>en-us</language>`,
  });
}
