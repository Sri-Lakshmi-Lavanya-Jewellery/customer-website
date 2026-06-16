import { useEffect } from 'react';

/**
 * Injects a <script type="application/ld+json"> tag into <head> for structured
 * data (rich results in Google). Googlebot renders client-side JS, so this is
 * read on crawl. The `id` lets each page replace its own tag without clobbering
 * the site-wide JewelryStore JSON-LD that lives in index.html.
 */
export default function JsonLd({ id, data }: { id: string; data: Record<string, unknown> }) {
  useEffect(() => {
    const elId = `jsonld-${id}`;
    let el = document.getElementById(elId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = elId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      document.getElementById(elId)?.remove();
    };
  }, [id, data]);

  return null;
}
