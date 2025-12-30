import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only handle root "/" for smart locale detection
  if (pathname === '/') {
    // Check for locale cookie first
    const localeCookie = request.cookies.get('NEXT_LOCALE');
    if (localeCookie && locales.includes(localeCookie.value as any)) {
      return NextResponse.redirect(new URL(`/${localeCookie.value}`, request.url));
    }
    
    // Detect Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || '';
    let detectedLocale: string = defaultLocale;
    
    // Parse Accept-Language and find best match
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, q = '1'] = lang.trim().split(';q=');
        return { code: code.toLowerCase().split('-')[0], quality: parseFloat(q) };
      })
      .sort((a, b) => b.quality - a.quality);
    
    for (const lang of languages) {
      if (lang.code === 'ko') {
        detectedLocale = 'ko';
        break;
      } else if (lang.code === 'ja') {
        detectedLocale = 'ja';
        break;
      } else if (lang.code === 'zh') {
        detectedLocale = 'zh-hans';
        break;
      } else if (lang.code === 'tr') {
        detectedLocale = 'tr';
        break;
      } else if (lang.code === 'en') {
        detectedLocale = 'en';
        break;
      }
    }
    
    return NextResponse.redirect(new URL(`/${detectedLocale}`, request.url));
  }
  
  // For all other routes, use next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
