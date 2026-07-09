import rss from '@astrojs/rss';
import { getPosts, postUrl } from '../../lib/blog';
import { ui } from '../../i18n/ui';

export async function GET(context) {
  const posts = await getPosts('fr');
  return rss({
    title: ui.fr['site.title'],
    description: ui.fr['site.description'],
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: postUrl(post),
    })),
    customData: '<language>fr</language>',
  });
}
