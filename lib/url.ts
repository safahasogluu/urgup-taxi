const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '');

export function buildUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const full = `${baseUrl}${normalizedPath}`;
  // Remove trailing slash except for root
  if (full === `${baseUrl}/`) return baseUrl;
  return full.replace(/\/+$/, '');
}

export function buildLocaleUrl(locale: string, path: string): string {
  const localizedPath = path === '/' ? `/${locale}` : `/${locale}${path}`;
  return buildUrl(localizedPath);
}

export function getBaseUrl(): string {
  return baseUrl;
}

