import React from 'react';

/*
 * Persistent floating WhatsApp button. The whole business runs on WhatsApp
 * enquiries (sold by weight, no online checkout), so a always-visible tap-to-chat
 * action is the single most important conversion element on every page.
 */
const PHONE = '917288865969';
const MESSAGE = encodeURIComponent(
  "Namaste! I'd like to enquire about your silver & gold collection."
);
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${MESSAGE}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2"
    >
      {/* Pulsing ring */}
      <span className="absolute right-0 bottom-0 w-14 h-14 rounded-full bg-[#25D366] opacity-60 animate-ping" />
      {/* Expanding label (desktop) */}
      <span className="hidden md:flex items-center max-w-0 group-hover:max-w-[180px] overflow-hidden whitespace-nowrap bg-charcoal text-white text-xs font-modern font-semibold tracking-wide px-0 group-hover:px-4 py-2.5 rounded-full shadow-luxe transition-all duration-300">
        Chat on WhatsApp
      </span>
      <span className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] shadow-lg flex items-center justify-center transition-colors duration-200">
        {/* WhatsApp glyph */}
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" aria-hidden="true">
          <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.7 12.7 0 0 0 16 3.2zm0 23.3h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.03 1.06 1.08-3.93-.25-.4a10.57 10.57 0 0 1-1.62-5.64c0-5.86 4.77-10.62 10.63-10.62 2.84 0 5.5 1.11 7.51 3.12a10.55 10.55 0 0 1 3.11 7.51c0 5.86-4.77 10.61-10.62 10.61zm5.83-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.38 4.76.75.32 1.34.51 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.18-1.51-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </span>
    </a>
  );
}
