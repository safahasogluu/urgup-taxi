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

      {/* Global dark overlay */}
      <div 
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
      />
      
      {/* Left-focused gradient overlay for text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16 lg:py-20">
        {/* Glass card wrapper for premium effect */}
        <div 
          className="max-w-4xl mx-auto md:mx-0 p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl"
          style={{
            background: 'rgba(20, 20, 20, 0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="text-center md:text-left">
            <h1 
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 leading-tight"
              style={{ 
                color: '#F7F3EE',
                textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              {typeof title === 'string' ? (
                title.split(/(7\/24|VIP)/gi).map((part, index) => {
                  const isKeyword = /^(7\/24|VIP)$/i.test(part);
                  return isKeyword ? (
                    <span
                      key={index}
                      className="inline-block"
                      style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #f59e0b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 2px 8px rgba(217, 119, 6, 0.4)',
                        fontWeight: '700',
                      }}
                    >
                      {part}
                    </span>
                  ) : (
                    part
                  );
                })
              ) : (
                title
              )}
            </h1>
            <p 
              className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 max-w-2xl"
              style={{ 
                color: 'rgba(247, 243, 238, 0.95)',
                textShadow: '0 1px 6px rgba(0,0,0,0.5), 0 2px 12px rgba(0,0,0,0.3)',
              }}
            >
              {subtitle}
            </p>
            
            {/* CTAs and badges passed as children */}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
