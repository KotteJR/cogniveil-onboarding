'use client';

interface BreakdownBarProps {
  heavy: number;
  mid: number;
  light: number;
  total: number;
}

export default function BreakdownBar({ heavy, mid, light, total }: BreakdownBarProps) {
  const assigned = heavy + mid + light;
  const remaining = Math.max(0, total - assigned);
  const base = Math.max(total, assigned, 1);

  const heavyPct  = (heavy     / base) * 100;
  const midPct    = (mid       / base) * 100;
  const lightPct  = (light     / base) * 100;
  const restPct   = (remaining / base) * 100;

  const over = assigned > total && total > 0;

  return (
    <div>
      <div className="breakdown-bar-track" style={{ marginBottom: '12px' }}>
        <div className="breakdown-seg-heavy" style={{ width: `${heavyPct}%` }} />
        <div className="breakdown-seg-mid"   style={{ width: `${midPct}%` }} />
        <div className="breakdown-seg-light" style={{ width: `${lightPct}%` }} />
        <div style={{ flex: 1, background: 'transparent' }} />
      </div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <LegendItem color="var(--accent)"              label="Heavy"     value={heavy}     pct={heavyPct} />
        <LegendItem color="rgba(48,122,240,0.45)"      label="Mid"       value={mid}       pct={midPct} />
        <LegendItem color="rgba(48,122,240,0.2)"       label="Light"     value={light}     pct={lightPct} />
        <LegendItem color="var(--border)"              label="Unassigned" value={remaining} pct={restPct} />
      </div>
      {over && (
        <p style={{ marginTop: '10px', fontSize: '11px', color: 'var(--warning)', fontFamily: 'var(--cv-font-mono, monospace)', letterSpacing: '0.04em' }}>
          ⚠ Breakdown exceeds total user count
        </p>
      )}
    </div>
  );
}

function LegendItem({ color, label, value, pct }: { color: string; label: string; value: number; pct: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: color, flexShrink: 0 }} />
      <span style={{ fontFamily: 'var(--cv-font-sans, system-ui)', fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--cv-font-mono, monospace)', fontSize: '10px', color: 'var(--text-secondary)' }}>
        {value}
      </span>
      <span style={{ fontFamily: 'var(--cv-font-mono, monospace)', fontSize: '10px', color: 'var(--text-muted)' }}>
        ({pct.toFixed(0)}%)
      </span>
    </div>
  );
}
