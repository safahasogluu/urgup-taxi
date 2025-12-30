import Link from 'next/link';
import { TransferRoute } from '@/data/transfers';
import { Locale } from '@/i18n';

interface PopularRoutesProps {
  locale: string;
  routes: TransferRoute[];
}

export default function PopularRoutes({ locale, routes }: PopularRoutesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {routes.map((route) => (
        <Link
          key={route.id}
          href={`/${locale}/transfer/${route.slug}`}
          className="card-premium p-6 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-xl text-basalt-900 mb-1 group-hover:text-primary-700 transition-colors">
                {route.from[locale as Locale]} → {route.to[locale as Locale]}
              </h3>
              <p className="text-basalt-600 text-sm line-clamp-2">
                {route.description[locale as Locale]}
              </p>
            </div>
            <div className="bg-primary-100 rounded-xl p-2 flex-shrink-0 group-hover:bg-primary-200 transition-colors">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-basalt-500 pt-4 border-t border-sand-300">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {route.duration}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {route.distance}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

