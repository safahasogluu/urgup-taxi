'use client';

import { GOOGLE_RATING } from '@/lib/constants';
import { useTranslations } from 'next-intl';

interface GoogleRatingBadgeProps {
  /** Visual variant */
  variant?: 'default' | 'glass' | 'solid';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Show "Google Reviews" label */
  showLabel?: boolean;
  /** Custom class */
  className?: string;
}

/**
 * Google Rating Badge
 * Displays star rating with optional review count (only shown if env is set)
 * Links to Google Business Profile reviews if URL is provided
 */
export default function GoogleRatingBadge({
  variant = 'glass',
  size = 'md',
  showLabel = true,
  className = '',
}: GoogleRatingBadgeProps) {
  const t = useTranslations('common');

  const { value, reviewCount, reviewUrl } = GOOGLE_RATING;

  // Generate stars based on rating value
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Size classes
  const sizeClasses = {
    sm: {
      container: 'px-3 py-1.5',
      star: 'w-3.5 h-3.5',
      text: 'text-xs',
      rating: 'text-sm font-bold',
    },
    md: {
      container: 'px-4 py-2.5',
      star: 'w-4 h-4',
      text: 'text-sm',
      rating: 'text-base font-bold',
    },
    lg: {
      container: 'px-5 py-3',
      star: 'w-5 h-5',
      text: 'text-base',
      rating: 'text-lg font-bold',
    },
  };

  // Variant classes - enhanced for premium look
  const variantClasses = {
    default: 'bg-white text-zinc-900 shadow-lg border border-zinc-200/50',
    glass: 'bg-white/15 backdrop-blur-lg text-white border border-white/25 shadow-lg',
    solid: 'bg-amber-50 text-zinc-900 border border-amber-200/70 shadow-md',
  };

  const sizes = sizeClasses[size];
  const variantClass = variantClasses[variant];

  // Star SVG
  const StarFull = () => (
    <svg
      className={`${sizes.star} text-amber-400 fill-amber-400`}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const StarHalf = () => (
    <svg
      className={`${sizes.star} text-amber-400`}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="halfGradient">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
      <path
        fill="url(#halfGradient)"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  );

  const StarEmpty = () => (
    <svg
      className={`${sizes.star} text-gray-300 fill-gray-300`}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const badge = (
    <div
      className={`
        inline-flex items-center gap-2.5 rounded-full
        ${variantClass}
        ${sizes.container}
        ${className}
      `}
    >
      {/* Google "G" icon */}
      <svg
        className={sizes.star}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarFull key={`full-${i}`} />
        ))}
        {hasHalfStar && <StarHalf />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarEmpty key={`empty-${i}`} />
        ))}
      </div>

      {/* Rating text - review count only shown if env is set */}
      <div className="flex items-baseline gap-1.5">
        <span className={sizes.rating}>{value.toFixed(1)}</span>
        {reviewCount !== undefined && (
          <span className={`${sizes.text} opacity-80`}>
            ({reviewCount}+{showLabel ? ` ${t('reviews')}` : ''})
          </span>
        )}
      </div>
    </div>
  );

  // If reviewUrl exists, wrap in link
  if (reviewUrl) {
    return (
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:scale-105 transition-transform duration-200"
        aria-label={`Google rating: ${value} out of 5 stars${reviewCount ? ` based on ${reviewCount}+ reviews` : ''}`}
      >
        {badge}
      </a>
    );
  }

  return badge;
}
