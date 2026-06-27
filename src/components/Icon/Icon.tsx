import React from 'react';

export type IconName =
  /* occasion icons */
  | 'bridal'
  | 'festivals'
  | 'daily-wear'
  | 'baby'
  | 'gifting'
  | 'temple'
  /* calendar icons */
  | 'waxing-crescent'
  | 'om-star'
  | 'lotus'
  | 'lamp'
  | 'sun'
  | 'flower'
  | 'crescent-moon'
  | 'group'
  | 'full-moon';

interface IconDef {
  content: React.ReactNode;
  strokeWidth?: number;
  fill?: string;
  stroke?: string;
}

const ICONS: Record<IconName, IconDef> = {
  /* ── Occasion ── */
  bridal: {
    content: (
      <>
        <path d="M9 5h6l1.5 3.5H7.5L9 5z"/>
        <circle cx="12" cy="14.5" r="5"/>
        <circle cx="12" cy="14.5" r="2"/>
      </>
    ),
  },
  festivals: {
    content: (
      <>
        <path d="M12 2c-1.2 1.8-2 3.6-2 5a2 2 0 0 0 4 0c0-1.4-.8-3.2-2-5z"/>
        <ellipse cx="12" cy="16" rx="6" ry="2.5"/>
        <path d="M8 18.5v.5c0 1 1.8 1.5 4 1.5s4-.5 4-1.5v-.5"/>
      </>
    ),
  },
  'daily-wear': {
    content: (
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    ),
  },
  baby: {
    content: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    ),
  },
  gifting: {
    content: (
      <>
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5" rx="1"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </>
    ),
  },
  temple: {
    content: (
      <>
        <line x1="12" y1="2" x2="12" y2="5"/>
        <path d="M6 8h12l-1.5-3H7.5L6 8z"/>
        <rect x="3" y="8" width="18" height="2" rx="0.5"/>
        <rect x="7" y="10" width="3" height="8"/>
        <rect x="14" y="10" width="3" height="8"/>
        <rect x="10.5" y="13" width="3" height="5"/>
        <line x1="2" y1="20" x2="22" y2="20"/>
      </>
    ),
  },

  /* ── Calendar ── */
  'waxing-crescent': {
    content: <path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9z"/>,
    strokeWidth: 2,
  },
  'om-star': {
    content: (
      <polygon points="12,2 14.9,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 9.1,8.3"/>
    ),
    fill: 'currentColor',
    stroke: 'none',
  },
  lotus: {
    content: (
      <>
        <path d="M12 22C12 22 5 17 5 11a7 7 0 0 1 14 0c0 6-7 11-7 11z"/>
        <path d="M12 22C12 22 8.5 19 8.5 15a3.5 3.5 0 0 1 7 0c0 4-3.5 7-3.5 7z"/>
      </>
    ),
  },
  lamp: {
    content: (
      <>
        <path d="M12 2c-1.2 1.8-2 3.6-2 5a2 2 0 0 0 4 0c0-1.4-.8-3.2-2-5z"/>
        <ellipse cx="12" cy="16" rx="5" ry="2"/>
        <path d="M9 18v1c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1"/>
      </>
    ),
  },
  sun: {
    content: (
      <>
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="2" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="22"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="2" y1="12" x2="4" y2="12"/>
        <line x1="20" y1="12" x2="22" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </>
    ),
    strokeWidth: 2,
  },
  flower: {
    content: (
      <>
        <circle cx="12" cy="12" r="2.5"/>
        <path d="M12 2a3 3 0 0 1 3 3v2a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
        <path d="M12 14a3 3 0 0 1 3 3v2a3 3 0 0 1-6 0v-2a3 3 0 0 1 3-3z"/>
        <path d="M2 12a3 3 0 0 1 3-3h2a3 3 0 0 1 0 6H5a3 3 0 0 1-3-3z"/>
        <path d="M14 12a3 3 0 0 1 3-3h2a3 3 0 0 1 0 6h-2a3 3 0 0 1-3-3z"/>
      </>
    ),
  },
  'crescent-moon': {
    content: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
    strokeWidth: 2,
  },
  group: {
    content: (
      <>
        <circle cx="9" cy="7" r="3"/>
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        <path d="M21 21v-2a4 4 0 0 0-3-3.85"/>
      </>
    ),
    strokeWidth: 2,
  },
  'full-moon': {
    content: <circle cx="12" cy="12" r="9"/>,
    strokeWidth: 2,
  },
};

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const def = ICONS[name];
  if (!def) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill={def.fill ?? 'none'}
      stroke={def.stroke ?? 'currentColor'}
      strokeWidth={def.strokeWidth ?? 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {def.content}
    </svg>
  );
}
