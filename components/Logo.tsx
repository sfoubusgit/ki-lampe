import Link from 'next/link'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  return (
    <Link href="/" aria-label="KI-Lampe — Home" className={`flex items-center gap-0 ${className}`}>
      <span
        className="font-black text-black dark:text-white text-2xl tracking-tight leading-none !text-black"
        style={{ color: '#000' }}
      >
        <span className="inline-block">K</span>
        <span className="inline-block">I</span>
        <span className="inline-block" style={{ color: '#fbbf24' }}>.</span>
        <span className="inline-block">LAMPE</span>
      </span>
    </Link>
  )
}

