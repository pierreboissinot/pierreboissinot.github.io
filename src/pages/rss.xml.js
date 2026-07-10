import rss from '@astrojs/rss';
import { getPosts, postUrl } from '../lib/blog';
import { ui } from '../i18n/ui';

export async function GET(context) {
  const posts = await getPosts('en');
  return rss({
    title: ui.en['site.title'],
    description: ui.en['site.description'],
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: postUrl(post),
    })),
    customData: '<language>en</language>',
  });
}
