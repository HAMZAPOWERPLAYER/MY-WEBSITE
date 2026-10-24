import { initialsFor, type ProductRecord, type ProductStatus } from '@/lib/products';

const ICON_SIZES = {
  sm: 'h-10 w-10 rounded-lg text-xs',
  md: 'h-14 w-14 rounded-xl text-base',
  lg: 'h-20 w-20 rounded-2xl text-xl',
} as const;

export function ProductIcon({
  product,
  size = 'md',
  className = '',
}: {
  product: ProductRecord;
  size?: keyof typeof ICON_SIZES;
  className?: string;
}) {
  const dimensions = ICON_SIZES[size];

  if (product.iconUrl) {
    return (
      <img
        src={product.iconUrl}
        alt=""
        width={size === 'lg' ? 80 : size === 'md' ? 56 : 40}
        height={size === 'lg' ? 80 : size === 'md' ? 56 : 40}
        loading={size === 'lg' ? 'eager' : 'lazy'}
        decoding="async"
        className={`${dimensions} shrink-0 object-cover ring-1 ring-white/10 ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${dimensions} grid shrink-0 place-items-center font-display font-black text-[#04040a] ring-1 ring-white/10 ${className}`}
      style={{ background: product.accent?.gradient ?? 'linear-gradient(135deg,#00f0ff,#7c3aed)' }}
    >
      {initialsFor(product.name)}
    </div>
  );
}

const STATUS_STYLES: Record<ProductStatus, { label: string; dot: string; text: string; border: string; bg: string }> = {
  published: {
    label: 'LIVE ON GOOGLE PLAY',
    dot: 'bg-[var(--success)]',
    text: 'text-[var(--success)]',
    border: 'border-[rgba(0,255,136,0.24)]',
    bg: 'bg-[rgba(0,255,136,0.06)]',
  },
  'coming-soon': {
    label: 'IN DEVELOPMENT',
    dot: 'bg-[var(--gold)]',
    text: 'text-[var(--gold)]',
    border: 'border-[rgba(245,197,24,0.24)]',
    bg: 'bg-[rgba(245,197,24,0.06)]',
  },
  'source-available': {
    label: 'PUBLIC SOURCE',
    dot: 'bg-[var(--neon-cyan)]',
    text: 'text-[var(--neon-cyan)]',
    border: 'border-[rgba(0,240,255,0.22)]',
    bg: 'bg-[rgba(0,240,255,0.05)]',
  },
};

export function StatusPill({
  status,
  label,
  className = '',
}: {
  status: ProductStatus;
  label?: string;
  className?: string;
}) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.14em] ${style.border} ${style.bg} ${style.text} ${className}`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {label ?? style.label}
    </span>
  );
}

/**
 * Shows the full, uncropped store artwork with a blurred copy behind it so
 * portrait and landscape screenshots both sit comfortably in one frame.
 */
export function ProductMedia({
  src,
  alt,
  priority = false,
  className = '',
  imageClassName = '',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={`hp-media ${className}`}>
      <img src={src} alt="" aria-hidden="true" className="hp-media-blur" loading="lazy" decoding="async" />
      <img
        src={src}
        alt={alt}
        className={`hp-media-main ${imageClassName}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
      />
    </div>
  );
}

export function MonogramArt({ product, className = '' }: { product: ProductRecord; className?: string }) {
  const gradient = product.accent?.gradient ?? 'linear-gradient(135deg,#00f0ff,#7c3aed)';

  return (
    <div
      aria-hidden="true"
      className={`relative grid place-items-center overflow-hidden bg-[#070712] ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.16]" style={{ background: gradient }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#070712_74%)]" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="relative flex flex-col items-center">
        <span
          className="bg-clip-text font-display text-6xl font-black tracking-tight text-transparent"
          style={{ backgroundImage: gradient }}
        >
          {initialsFor(product.name)}
        </span>
      </div>
    </div>
  );
}
