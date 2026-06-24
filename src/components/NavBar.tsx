import Link from 'next/link';

export default function NavBar() {
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
      <div style={{ padding: '0 1.5rem', display: 'flex', alignItems: 'center', height: '62px' }}>
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
      </div>
    </nav>
  );
}
