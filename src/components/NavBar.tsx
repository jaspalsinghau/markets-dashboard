'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/dashboards/markets', label: 'Markets Overview' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,0.82)',
      backdropFilter: 'saturate(160%) blur(14px)',
      WebkitBackdropFilter: 'saturate(160%) blur(14px)',
      borderBottom: '1px solid var(--grey-100)',
    }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', height: '62px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
          <span style={{
            width: 34,
            height: 34,
            background: 'var(--ink)',
            borderRadius: 9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.8125rem',
            color: 'var(--accent)',
            letterSpacing: '-0.02em',
            flexShrink: 0,
          }}>EC</span>
          <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Experiments with Claude
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: 'auto' }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  position: 'relative',
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--ink)' : 'var(--grey-600)',
                  textDecoration: 'none',
                  borderRadius: 8,
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '0.75rem',
                    right: '0.75rem',
                    height: 2,
                    background: 'var(--accent)',
                    borderRadius: 999,
                  }} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
