import { useCallback, useEffect, useState } from 'react';

/**
 * Lightweight wishlist persisted to localStorage. Previously the "Add to
 * Wishlist" button was a dead placeholder; this gives it real, app-wide state.
 * Changes are broadcast via a custom event so every mounted card/button stays
 * in sync within the tab (and the `storage` event syncs across tabs).
 */
const KEY = 'sllj_wishlist';
const EVENT = 'sllj-wishlist-change';

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    /* storage unavailable (private mode) — ignore */
  }
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>(() => (typeof window !== 'undefined' ? read() : []));

  useEffect(() => {
    const sync = () => setIds(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    write(next);
    setIds(next);
  }, []);

  return { ids, count: ids.length, has, toggle };
}

export default useWishlist;
