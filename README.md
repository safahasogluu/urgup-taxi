# Göreme Taksi - Multilingual Taxi Website

Production-ready multilingual taxi and VIP transfer website for Cappadocia region, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Features

- 🌍 **5 Languages**: Turkish (default), English, Korean, Japanese, Simplified Chinese
- 📱 **Mobile-First Design**: Responsive, conversion-optimized UI
- 🔍 **Technical SEO**: Dynamic metadata, sitemap, robots.txt, JSON-LD schemas, hreflang tags
- 📊 **Analytics Ready**: Google Analytics 4 integration with event tracking
- ⚡ **Performance**: Server Components, optimized Core Web Vitals
- 🎯 **Conversion Focused**: Sticky CTA bar, prominent phone/WhatsApp buttons

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Deployment**: Vercel-ready

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd urgup-taxi
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` (local only, do not commit):
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-Q2S7SWRM0F  # optional for local; GA runs only in production
```

4. Production / Vercel:
```env
NEXT_PUBLIC_SITE_URL=https://www.urguptaxi.com
NEXT_PUBLIC_GA_ID=G-Q2S7SWRM0F
# Optional: set to false to disable GA even in prod
# NEXT_PUBLIC_GA_ENABLED=false
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will automatically redirect to `/tr` (Turkish) as the default locale. You can access other locales:
- `/en` - English
- `/ko` - Korean
- `/ja` - Japanese
- `/zh-hans` - Simplified Chinese

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Project Structure

```
urgup-taxi/
├── app/
│   ├── [locale]/          # Locale-based routes
│   │   ├── page.tsx       # Homepage
│   │   ├── vip-transfer/
│   │   ├── havalimani-transferi/
│   │   ├── transfer/[slug]/
│   │   ├── [slug]/        # Location pages
│   │   ├── fiyatlar/
│   │   ├── rezervasyon/
│   │   ├── iletisim/
│   │   └── sss/
│   ├── layout.tsx         # Root layout
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── StickyCTA.tsx
│   └── GoogleAnalytics.tsx
├── data/                  # Data files
│   ├── locations.ts       # Location data
│   └── transfers.ts       # Transfer route data
├── lib/                   # Utilities
│   ├── seo.ts             # SEO helpers
│   ├── analytics.ts       # Analytics tracking
│   └── schema.ts          # JSON-LD schemas
├── messages/              # Translation files
│   ├── tr.json
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   └── zh-hans.json
└── i18n.ts                # i18n configuration
```

## Pages

All pages are available in all 5 locales:

- **Homepage** (`/{locale}`)
- **VIP Transfer** (`/{locale}/vip-transfer`)
- **Airport Transfer** (`/{locale}/havalimani-transferi`)
- **Transfer Routes** (`/{locale}/transfer/{slug}`)
  - Nevşehir → Ürgüp
  - Nevşehir → Göreme
  - Kayseri → Ürgüp
  - Kayseri → Göreme
- **Location Pages** (`/{locale}/{slug}`)
  - Ürgüp, Göreme, Uçhisar, Mustafapaşa, Ortahisar, Avanos
- **Pricing** (`/{locale}/fiyatlar`)
- **Booking** (`/{locale}/rezervasyon`)
- **Contact** (`/{locale}/iletisim`)
- **FAQ** (`/{locale}/sss`)

## SEO Features

- ✅ Dynamic metadata per page (title, description, canonical)
- ✅ Hreflang tags for all locales + x-default
- ✅ OpenGraph and Twitter Card tags
- ✅ JSON-LD structured data:
  - LocalBusiness schema (homepage, contact)
  - TaxiService schema (homepage)
  - Service schema (transfer pages)
  - FAQPage schema (FAQ and location pages)
  - BreadcrumbList (all pages)
- ✅ Dynamic sitemap.xml
- ✅ robots.txt

## Analytics

Google Analytics 4 is integrated with event tracking:

- `phone_click` - Phone button clicks
- `whatsapp_click` - WhatsApp button clicks
- `cta_click` - Hero primary CTA (in addition to phone_click)
- `form_submit` - Booking form submissions

To enable:
1. Get your GA4 Measurement ID
2. Add it to `.env.local` as `NEXT_PUBLIC_GA_ID=G-Q2S7SWRM0F`
3. (Optional) To force-disable in prod, set `NEXT_PUBLIC_GA_ENABLED=false`
4. Deploy - analytics will automatically start tracking in production only

## Adding New Content

### Add a New Location

Edit `data/locations.ts`:

```typescript
{
  id: 'new-location',
  slug: 'new-location-taksi',
  name: {
    tr: 'Yeni Lokasyon Taksi',
    en: 'New Location Taxi',
    // ... other locales
  },
  description: { /* ... */ },
  faqs: [ /* ... */ ],
}
```

### Add a New Transfer Route

Edit `data/transfers.ts`:

```typescript
{
  id: 'new-route',
  slug: 'new-route',
  from: { /* ... */ },
  to: { /* ... */ },
  description: { /* ... */ },
  duration: 'X minutes',
  distance: 'X km',
}
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub/GitLab
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the static export or use Node.js server:

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID | No (only runs in prod if set) |
| `NEXT_PUBLIC_GA_ENABLED` | Optional flag to disable GA even in prod (`false`) | No |
| `NEXT_PUBLIC_SITE_URL` | Production site URL | Yes (for SEO) |

## Verification Checklist

- [ ] All pages load correctly in all 5 locales
- [ ] Phone and WhatsApp buttons work
- [ ] Booking form submits successfully
- [ ] Sitemap.xml is accessible at `/sitemap.xml`
- [ ] Robots.txt is accessible at `/robots.txt`
- [ ] Metadata appears correctly in page source
- [ ] JSON-LD schemas validate (use Google Rich Results Test)
- [ ] Mobile sticky CTA bar appears on mobile devices
- [ ] All links work correctly
- [ ] Images load (if added)
- [ ] Google Analytics tracks events (if configured)

## Known Limitations

- Booking form currently shows success message only (no backend integration)
- Map placeholder on contact page (needs Google Maps embed)
- No image optimization setup (add Next.js Image component as needed)
- Static generation: Some pages use dynamic rendering due to next-intl. This is expected and doesn't affect functionality. For full static generation, add `setRequestLocale` to each page component (see next-intl docs).

## Support

For issues or questions, contact: +90 535 548 11 78

## License

Proprietary - All rights reserved

