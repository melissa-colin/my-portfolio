import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Locale = 'fr' | 'en';
export const LOCALES: Locale[] = ['fr', 'en'];
export const DEFAULT_LOCALE: Locale = 'fr';

type ListCollection =
  | 'projects'
  | 'experiences'
  | 'education'
  | 'certifications'
  | 'publications'
  | 'blog';

/** UI strings singleton for a locale (everything that isn't a list of items). */
export async function getUI(locale: Locale): Promise<any> {
  const entry = await getEntry('ui', locale);
  return entry?.data ?? {};
}

/** Items of a folder collection for a locale, in their original order. */
export async function getList(collection: ListCollection, locale: Locale): Promise<any[]> {
  const entries = await getCollection(collection, (e: CollectionEntry<ListCollection>) =>
    e.id.endsWith(`.${locale}`)
  );
  return entries
    .map((e) => e.data as any)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Localized URL: French is unprefixed (`/path`), English is under `/en`. */
export function localizedHref(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return locale === 'en' ? `/en${clean || ''}` || '/en' : clean || '/';
}

/** Switch the current path to the other locale (for the language toggle). */
export function otherLocaleHref(currentPath: string, locale: Locale): string {
  const other: Locale = locale === 'fr' ? 'en' : 'fr';
  // strip a leading /en if present to get the language-neutral path
  const neutral = currentPath.replace(/^\/en(\/|$)/, '/');
  return localizedHref(neutral === '' ? '/' : neutral, other);
}
