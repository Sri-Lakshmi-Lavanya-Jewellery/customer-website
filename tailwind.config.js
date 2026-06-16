/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Elegant serif headings (Playfair Display) — luxury display type
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        // Refined serif for eyebrows / labels (Marcellus)
        'heading': ['Marcellus', 'Georgia', 'serif'],
        'indian-serif': ['Marcellus', 'Georgia', 'serif'],
        // Clean, readable body sans (Inter)
        'modern': ['Inter', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Muted antique-gold scale (accent). 500 = #B8860B per design brief.
        gold: {
          50: '#faf6ee',
          100: '#f3e9d2',
          200: '#e7d3a6',
          300: '#d9bd7a',
          400: '#c9a14e',
          500: '#b8860b',
          600: '#a37709',
          700: '#876108',
          800: '#6b4d0a',
          900: '#4d3807',
        },
        // Warm ivory / off-white background
        ivory: {
          DEFAULT: '#FBF8F3',
          50: '#FDFCF9',
          100: '#FBF8F3',
          200: '#F3ECE0',
          300: '#e8dcc8',
        },
        // Deep charcoal — primary text
        charcoal: {
          DEFAULT: '#2B2B2B',
          light: '#4a4a4a',
          muted: '#6b6b6b',
        },
        // Deep maroon — festive / CTA highlight (use sparingly)
        maroon: {
          DEFAULT: '#7B2D26',
          600: '#7B2D26',
          700: '#65221c',
          800: '#4e1915',
        },
        silver: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        indian: {
          saffron: '#ff9933',
          'deep-saffron': '#ff6600',
          maroon: '#800020',
          emerald: '#50c878',
          'royal-blue': '#4169e1',
          crimson: '#dc143c',
          'peacock-green': '#005a5b',
          vermillion: '#e34234',
          'turmeric': '#e89611',
          'ruby': '#cc313d',
          'sapphire': '#0f4c75',
          'emerald-dark': '#006a4e',
          'coral': '#ff6b6b',
          'amber': '#ffbf00',
          'pearl': '#f8f6ff',
          'rose-gold': '#e8b4b8',
          'antique-gold': '#c9b037',
          'temple-gold': '#b8860b',
          'kundan': '#f7e7ce',
          'meenakari': '#ff6347',
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #a37709 0%, #c9a14e 50%, #a37709 100%)',
        'silver-gradient': 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 50%, #94a3b8 100%)',
        'royal-gradient': 'linear-gradient(135deg, #4169e1 0%, #50c878 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #ff9933 0%, #dc143c 100%)',
        'temple-gradient': 'linear-gradient(135deg, #b8860b 0%, #d4af37 50%, #f4d03f 100%)',
        'kundan-gradient': 'linear-gradient(135deg, #f7e7ce 0%, #d4af37 50%, #c9b037 100%)',
        'ruby-gradient': 'linear-gradient(135deg, #cc313d 0%, #ff6b6b 50%, #e34234 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #006a4e 0%, #50c878 50%, #7dcea0 100%)',
        'peacock-gradient': 'linear-gradient(135deg, #005a5b 0%, #4169e1 50%, #50c878 100%)',
        'meenakari-gradient': 'linear-gradient(135deg, #ff6347 0%, #ff9933 50%, #ffbf00 100%)',
        'mandala': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='30' cy='30' r='12'/%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'paisley': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-11 9-20 20-20s20 9 20 20-9 20-20 20S20 31 20 20z'/%3E%3C/g%3E%3C/svg%3E\")",
        'lotus': "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.08'%3E%3Cpath d='M40 10 C30 20, 20 30, 30 40 C20 50, 30 60, 40 70 C50 60, 60 50, 50 40 C60 30, 50 20, 40 10 Z'/%3E%3C/g%3E%3C/svg%3E\")",
        'kalash': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b8860b' fill-opacity='0.06'%3E%3Cellipse cx='50' cy='30' rx='15' ry='8'/%3E%3Crect x='45' y='30' width='10' height='40'/%3E%3Cellipse cx='50' cy='70' rx='20' ry='12'/%3E%3C/g%3E%3C/svg%3E\")",
        'rangoli-bg': "url(\"data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='1' stroke-opacity='0.1'%3E%3Cpath d='M60 20 L80 40 L60 60 L40 40 Z'/%3E%3Cpath d='M60 60 L80 80 L60 100 L40 80 Z'/%3E%3Ccircle cx='60' cy='60' r='30'/%3E%3C/g%3E%3C/svg%3E\")",
        'peacock-feather-bg': "url(\"data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23005a5b' fill-opacity='0.05'%3E%3Cellipse cx='45' cy='20' rx='8' ry='15'/%3E%3Ccircle cx='45' cy='15' r='3'/%3E%3Cpath d='M45 20 Q30 45 45 70 Q60 45 45 20'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        // Soft, restrained luxury shadows (used by cards in the redesign)
        'luxe': '0 2px 8px rgba(43, 43, 43, 0.04), 0 8px 24px rgba(43, 43, 43, 0.06)',
        'luxe-lg': '0 8px 16px rgba(43, 43, 43, 0.06), 0 18px 40px rgba(43, 43, 43, 0.10)',
        'card': '0 1px 3px rgba(43, 43, 43, 0.05), 0 4px 16px rgba(43, 43, 43, 0.05)',
        // Retuned antique-gold accents (softer than before)
        'gold': '0 4px 20px rgba(184, 134, 11, 0.18)',
        'gold-lg': '0 10px 40px rgba(184, 134, 11, 0.22)',
        'silver': '0 4px 20px rgba(148, 163, 184, 0.3)',
        'royal': '0 8px 25px rgba(65, 105, 225, 0.4)',
        'inner-gold': 'inset 0 2px 4px rgba(212, 175, 55, 0.1)',
        'ruby': '0 8px 32px rgba(204, 49, 61, 0.4)',
        'emerald': '0 8px 32px rgba(80, 200, 120, 0.3)',
        'temple': '0 12px 48px rgba(184, 134, 11, 0.5)',
        'kundan': '0 6px 24px rgba(247, 231, 206, 0.6)',
        'peacock': '0 10px 40px rgba(0, 90, 91, 0.4)',
        'divine': '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)',
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'glow': 'glow 4s ease-in-out infinite alternate',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'divine-pulse': 'divine-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '-200% 0' },
          '50%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.5)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        'divine-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7), 0 0 0 0 rgba(184, 134, 11, 0.3)',
            transform: 'scale(1)' 
          },
          '50%': { 
            boxShadow: '0 0 0 20px rgba(212, 175, 55, 0), 0 0 0 40px rgba(184, 134, 11, 0)',
            transform: 'scale(1.02)' 
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
