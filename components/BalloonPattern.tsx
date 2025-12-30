/**
 * Decorative hot air balloon SVG pattern for hero sections
 * Lightweight inline SVG, aria-hidden for accessibility
 */
export default function BalloonPattern({ className = '' }: { className?: string }) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Top-right balloon */}
      <svg 
        className="absolute -top-10 -right-10 w-48 h-64 text-sand-400/20"
        viewBox="0 0 100 140" 
        fill="none"
      >
        <ellipse cx="50" cy="40" rx="35" ry="40" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M30 75 L50 120 L70 75" stroke="currentColor" strokeWidth="1" fill="none" />
        <rect x="42" y="118" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
        {/* Decorative lines on balloon */}
        <path d="M25 30 Q50 50 75 30" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M20 45 Q50 65 80 45" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>

      {/* Top-left smaller balloon */}
      <svg 
        className="absolute top-20 left-10 w-24 h-32 text-terracotta-300/15"
        viewBox="0 0 100 140" 
        fill="none"
      >
        <ellipse cx="50" cy="40" rx="35" ry="40" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M30 75 L50 120 L70 75" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="42" y="118" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Bottom-left distant balloon */}
      <svg 
        className="absolute bottom-10 left-1/4 w-16 h-24 text-sand-400/10"
        viewBox="0 0 100 140" 
        fill="none"
      >
        <ellipse cx="50" cy="40" rx="35" ry="40" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M30 75 L50 120 L70 75" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="42" y="118" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>

      {/* Right side middle balloon */}
      <svg 
        className="absolute top-1/2 -right-5 w-20 h-28 text-sage-300/15 -translate-y-1/2"
        viewBox="0 0 100 140" 
        fill="none"
      >
        <ellipse cx="50" cy="40" rx="35" ry="40" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M30 75 L50 120 L70 75" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="42" y="118" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

