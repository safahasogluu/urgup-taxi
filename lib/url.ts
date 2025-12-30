// Prefer explicit env, default to production canonical domain (no vercel fallback).
const envBase = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
const baseUrl = (envBase || 'https://www.urguptaxi.com').replace(/\/+$/, '');

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

