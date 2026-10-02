import { getCollection, type CollectionEntry } from 'astro:content';

export type Lang = 'en' | 'fr';
export type BlogPost = CollectionEntry<'blog'>;

export const slugOf = (post: BlogPost) => post.id.replace(/^(en|fr)\//, '');
export const langOf = (post: BlogPost) => post.id.split('/')[0] as Lang;
export const translationKeyOf = (post: BlogPost) =>
  post.data.translationKey ?? slugOf(post);
export const postUrl = (post: BlogPost) =>
  `${langOf(post) === 'fr' ? '/fr' : ''}/posts/${slugOf(post)}/`;
export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'fr' : 'en');
export const seriesUrl = (lang: Lang, seriesId: string) =>
  `${lang === 'fr' ? '/fr' : ''}/series/${seriesId}/`;

/**
 * Single source of truth for post listing: language scoping, draft filtering
 * (drafts are visible in dev only) and date sorting. Never call
 * getCollection('blog') directly from pages or feeds.
 */
export async function getPosts(lang: Lang): Promise<BlogPost[]> {
  const posts = await getCollection(
    'blog',
    ({ id, data }) => id.startsWith(`${lang}/`) && (import.meta.env.DEV || !data.draft),
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getTranslation(post: BlogPost): Promise<BlogPost | null> {
  const candidates = await getPosts(otherLang(langOf(post)));
  return candidates.find((p) => translationKeyOf(p) === translationKeyOf(post)) ?? null;
}

export async function getEpisodes(lang: Lang, seriesId: string): Promise<BlogPost[]> {
  const posts = await getPosts(lang);
  return posts
    .filter((p) => p.data.series?.id === seriesId)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
}

export function readingTimeMinutes(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export type Talk = CollectionEntry<'talks'>;

export const talksUrl = (lang: Lang) => `${lang === 'fr' ? '/fr' : ''}/talks/`;

export async function getTalks(): Promise<Talk[]> {
  const talks = await getCollection('talks');
  return talks.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
