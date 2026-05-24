// CrowdIQ — shared small components

export const Pill = ({ kind = "", children, dot = true }) => (
  <span className={`pill ${kind}`}>
    {dot && <span className="dot" />}
    {children}
  </span>
);

export const StatChip = ({ label, value, delta, kind }) => (
  <div className="f-stat">
    <div className="l">{label}</div>
    <div className={`v ${kind || ""}`}>{value}</div>
    {delta && <div className={`d ${delta.startsWith('-') ? 'bad' : ''}`}>{delta}</div>}
  </div>
);

export const Bar = ({ value = 0.5, kind = "" }) => (
  <div className={`bar ${kind}`}><i style={{ width: `${Math.round(value * 100)}%` }} /></div>
);

// Seeded deterministic random
export const seededRand = (seed) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return ((h >>> 0) / 4294967295);
  };
};

export const Sparkline = ({ seed = "x", points = 32, color = "var(--cyan)", height = 32, fill = true }) => {
  const r = seededRand(seed);
  const vals = Array.from({ length: points }, () => 0.3 + r() * 0.7);
  const W = 100, H = height;
  const pts = vals.map((v, i) => [i * (W / (points - 1)), H - v * (H - 4) - 2]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
  const dFill = `${d} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" width="100%" height={H} className="spark">
      {fill && <path d={dFill} fill={color} opacity="0.10" />}
      <path d={d} stroke={color} strokeWidth="1.4" fill="none" />
    </svg>
  );
};

export const LiveDot = () => <span className="live-dot" />;

export const SectionTitle = ({ children, action }) => (
  <div className="f-section-title">
    <h3>{children}</h3>
    {action && <a>{action}</a>}
  </div>
);

// Heatmap color from load
export const heatColor = (load) => {
  if (load >= 0.9) return "var(--heat-6)";
  if (load >= 0.8) return "var(--heat-5)";
  if (load >= 0.65) return "var(--heat-4)";
  if (load >= 0.5) return "var(--heat-3)";
  if (load >= 0.3) return "var(--heat-2)";
  return "var(--heat-1)";
};
