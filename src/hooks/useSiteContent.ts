import { useState, useEffect } from 'react';

/*
 * Editable site content. Fetches /customer/content from the backend and merges
 * it over built-in defaults, so the storefront renders correct content
 * immediately (and even if the backend is unreachable), then updates with any
 * admin overrides. The defaults here MUST mirror the backend's CONTENT_DEFAULTS.
 */

export interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
}

export interface SiteContent {
  hero: { slides: HeroSlide[] };
  announcement: { lines: string[] };
  featuredBanner: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    primaryCta: string;
    primaryLink: string;
    secondaryCta: string;
    secondaryLink: string;
    image?: string;
  };
  occasions: { items: { icon: string; label: string; link: string }[] };
  testimonials: { items: { quote: string; name: string; place: string }[] };
  about: { storyTitle: string; storyBody: string };
}

export const SITE_CONTENT_DEFAULTS: SiteContent = {
  hero: {
    slides: [
      {
        image: '/assets/images/products/kamakshi-deepam/1.jpg',
        eyebrow: 'Pure 925 Silver',
        title: 'Sacred Lamps,',
        titleAccent: 'Crafted to Last Generations',
        subtitle: 'Hand-finished silver Kamakshi deepams for your daily pooja and festive altar.',
        cta: 'Explore Pooja Silver',
        ctaLink: '/categories',
      },
      {
        image: '/assets/images/products/harathi stand/1.1.jpg',
        eyebrow: 'Temple & Ritual',
        title: 'Authentic Silver',
        titleAccent: 'for Every Ritual',
        subtitle: 'Harathi stands, bells and uddharini — sold by honest weight, at today’s fair rate.',
        cta: 'Shop the Collection',
        ctaLink: '/categories',
      },
      {
        image: '/assets/images/products/agarbatti stand/1.jpg',
        eyebrow: 'Heirloom Craft',
        title: 'Heritage Silver,',
        titleAccent: 'Made to Be Treasured',
        subtitle: 'Two decades of trusted craftsmanship in BIS hallmark-grade 925 silver.',
        cta: 'Our Story',
        ctaLink: '/about',
      },
    ],
  },
  announcement: {
    lines: [
      'BIS Hallmark-Grade Silver',
      '100% Authentic Craftsmanship',
      'Sold by Honest Weight',
      'Personal WhatsApp Service',
      'Trusted Since 2001',
    ],
  },
  featuredBanner: {
    eyebrow: '✦ Exclusive Collection ✦',
    title: 'The Shubhalagnam',
    subtitle: 'Bridal Silver Set',
    description:
      'Handcrafted in pure 925 silver — our signature bridal collection blends traditional artistry with timeless elegance. Perfect for your most sacred moments.',
    primaryCta: 'Explore Collection',
    primaryLink: '/collections/featured',
    secondaryCta: 'Book Consultation',
    secondaryLink: '/enquiry',
    image: '',
  },
  occasions: {
    items: [
      { icon: '💍', label: 'Bridal & Wedding', link: '/collections' },
      { icon: '🪔', label: 'Festivals & Puja', link: '/collections' },
      { icon: '⭐', label: 'Daily Wear', link: '/collections' },
      { icon: '👶', label: 'Baby & Kids', link: '/collections' },
      { icon: '🎁', label: 'Gifting', link: '/collections' },
      { icon: '🛕', label: 'Temple & Religious', link: '/collections' },
    ],
  },
  testimonials: {
    items: [
      {
        quote:
          'The silver Kamakshi deepam I ordered is breathtaking — the weight and finish are exactly as promised. Truly heirloom quality.',
        name: 'Lakshmi Priya',
        place: 'Hyderabad',
      },
      {
        quote:
          'Honest weight, fair rate and such warm service on WhatsApp. They guided me through the whole purchase for my daughter’s wedding.',
        name: 'Ramesh Kumar',
        place: 'Vijayawada',
      },
      {
        quote:
          'Authentic craftsmanship you can feel. Our family has been buying pooja silver here for years — never once disappointed.',
        name: 'Sridevi Reddy',
        place: 'Chennai',
      },
    ],
  },
  about: {
    storyTitle: 'Crafting Silver Memories Since 2001',
    storyBody:
      'Sri Lakshmi Lavanya Jewellery was born from a deep love for traditional Indian craftsmanship. For over two decades, we have curated exquisite silver that honours our heritage while embracing modern aesthetics.',
  },
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://silver-website-backend.onrender.com/api/v1/customer';

// Deep-merge a partial override (per-section) over the defaults so a partial
// admin edit never drops fields the storefront relies on.
function mergeSection<T>(def: T, override: unknown): T {
  if (!override || typeof override !== 'object' || Array.isArray(override)) {
    return (override as T) ?? def;
  }
  return { ...(def as object), ...(override as object) } as T;
}

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(SITE_CONTENT_DEFAULTS);

  useEffect(() => {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 6000);

    fetch(`${API_BASE_URL}/content`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        const d = json?.data;
        if (!d || typeof d !== 'object') return;
        setContent({
          hero: mergeSection(SITE_CONTENT_DEFAULTS.hero, d.hero),
          announcement: mergeSection(SITE_CONTENT_DEFAULTS.announcement, d.announcement),
          featuredBanner: mergeSection(SITE_CONTENT_DEFAULTS.featuredBanner, d.featuredBanner),
          occasions: mergeSection(SITE_CONTENT_DEFAULTS.occasions, d.occasions),
          testimonials: mergeSection(SITE_CONTENT_DEFAULTS.testimonials, d.testimonials),
          about: mergeSection(SITE_CONTENT_DEFAULTS.about, d.about),
        });
      })
      .catch(() => {
        /* keep defaults — site stays fully functional if content API is down */
      })
      .finally(() => clearTimeout(t));

    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, []);

  return content;
}
