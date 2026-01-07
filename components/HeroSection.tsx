/**
 * Optimized Hero Section with responsive Cappadocia images
 * - LCP optimized: fetchpriority="high", loading="eager"
 * - No CLS: fixed min-height, absolute positioned image
 * - Art direction: <picture> with mobile/desktop sources
 * - Blur placeholder via CSS background
 * - Premium gradient overlay for text readability
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
        {/* Desktop source (landscape) - shifted right to show landscape */}
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
        {/* Fallback img with object-position shifted right */}
        <img
          src="/hero/hero-desktop-1200.webp"
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-[60%_50%] md:object-[70%_50%]"
          // LCP optimization
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>

      {/* Premium gradient overlay - stronger on left for text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"
        aria-hidden="true"
      />
      
      {/* Radial vignette for top-left focus */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 20% 30%, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center md:text-left md:mx-0">
          <h1 
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 text-white"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)' }}
          >
            {title}
          </h1>
          <p 
            className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 max-w-2xl"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
          >
            {subtitle}
          </p>
          
          {/* CTAs and badges passed as children */}
          {children}
        </div>
      </div>
    </section>
  );
}
