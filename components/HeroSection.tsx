/**
 * Optimized Hero Section with responsive Cappadocia images
 * - LCP optimized: fetchpriority="high", loading="eager"
 * - No CLS: fixed min-height, absolute positioned image
 * - Art direction: <picture> with mobile/desktop sources
 * - Blur placeholder via CSS background
 */

interface HeroSectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  /** Alt text for hero image - should be descriptive, not spammy */
  imageAlt?: string;
}

export default function HeroSection({
  title,
  subtitle,
  children,
  imageAlt = 'Kapadokya manzarasi onunde taksi transfer hizmeti',
}: HeroSectionProps) {
  return (
    <section 
      className="relative min-h-[520px] md:min-h-[560px] lg:min-h-[620px] overflow-hidden flex items-center"
      style={{
        // Blur placeholder as CSS background
        backgroundImage: 'url(/hero/hero-placeholder-40.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Responsive Hero Image with Art Direction */}
      <picture>
        {/* Desktop source (landscape) */}
        <source
          media="(min-width: 768px)"
          srcSet="
            /hero/hero-desktop-480.webp 480w,
            /hero/hero-desktop-768.webp 768w,
            /hero/hero-desktop-1200.webp 1200w
          "
          sizes="100vw"
          type="image/webp"
        />
        {/* Mobile source (portrait) */}
        <source
          media="(max-width: 767px)"
          srcSet="
            /hero/hero-mobile-400.webp 400w,
            /hero/hero-mobile-600.webp 600w,
            /hero/hero-mobile-900.webp 900w
          "
          sizes="100vw"
          type="image/webp"
        />
        {/* Fallback img */}
        <img
          src="/hero/hero-desktop-1200.webp"
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          // LCP optimization
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>

      {/* Dark gradient overlay for text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center md:text-left md:mx-0">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 text-white drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 max-w-2xl drop-shadow-md">
            {subtitle}
          </p>
          
          {/* CTAs and badges passed as children */}
          {children}
        </div>
      </div>
    </section>
  );
}
