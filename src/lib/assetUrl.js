/**
 * Resolve public/ files correctly on GitHub Pages project sites.
 * Keep editable data portable, e.g. '/memories/photo.jpg', and apply Vite's
 * deployment base path only when displaying/playing assets.
 * Blob/data/remote URLs are used unchanged.
 */
export function assetUrl(value) {
  if (!value || typeof value !== 'string') return value || '';
  if (/^(?:https?:|blob:|data:|\/\/)/i.test(value)) return value;
  if (value.startsWith('/')) return `${import.meta.env.BASE_URL}${value.replace(/^\/+/, '')}`;
  return value;
}
