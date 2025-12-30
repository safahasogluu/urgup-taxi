/**
 * Decorative arch divider inspired by Cappadocia cave architecture
 * Lightweight SVG component for section transitions
 */
export default function ArchDivider({ 
  className = '',
  color = 'sand-300',
  flip = false 
}: { 
  className?: string;
  color?: string;
  flip?: boolean;
}) {
  return (
    <div 
      className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 1200 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto text-${color}`}
        preserveAspectRatio="none"
      >
        <path 
          d="M0 60V30C0 30 150 0 300 0C450 0 450 30 600 30C750 30 750 0 900 0C1050 0 1200 30 1200 30V60H0Z" 
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

