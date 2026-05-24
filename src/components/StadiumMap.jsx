// CrowdIQ — Stadium oval visualization
import { heatColor, seededRand } from './Common';
import { CIQ_DATA } from '../data/crowdiq';

const StadiumMap = ({
  width = 460,
  height = 220,
  showHeat = true,
  showSeats = false,
  showFlow = false,
  showFriends = false,
  showRoute = false,
  showIncidents = false,
  showCameras = false,
  showDrones = false,
  showLabels = true,
  highlightZone = null,
  onZoneClick = null,
  friends = [],
  incidents = [],
  routeDots = null,
  compact = false,
}) => {
  const zones = CIQ_DATA.zones;

  const zoneGeom = {
    N1: { ring:2, a:[260, 340] },
    N2: { ring:1, a:[260, 340] },
    E1: { ring:2, a:[340, 30]  },
    E2: { ring:2, a:[20,  60]  },
    E3: { ring:1, a:[340, 60]  },
    S1: { ring:2, a:[60,  120] },
    S2: { ring:1, a:[60,  120] },
    W1: { ring:2, a:[200, 260] },
    W2: { ring:2, a:[120, 200] },
    W3: { ring:1, a:[120, 260] },
    C1: { ring:3, a:[300, 60]  },
    C2: { ring:3, a:[60,  120] },
    C3: { ring:3, a:[120, 240] },
    C4: { ring:3, a:[240, 300] },
  };

  const cx = width / 2, cy = height / 2;
  const rx1 = width * 0.30, ry1 = height * 0.30;
  const rx2 = width * 0.42, ry2 = height * 0.42;
  const rx3 = width * 0.49, ry3 = height * 0.49;

  const wedgePath = (rxIn, ryIn, rxOut, ryOut, aDeg1, aDeg2) => {
    const toRad = (d) => (d - 90) * Math.PI / 180;
    let a1 = toRad(aDeg1), a2 = toRad(aDeg2);
    if (a2 < a1) a2 += Math.PI * 2;
    const p = (rx, ry, a) => [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
    const [x1i, y1i] = p(rxIn, ryIn, a1);
    const [x2i, y2i] = p(rxIn, ryIn, a2);
    const [x1o, y1o] = p(rxOut, ryOut, a1);
    const [x2o, y2o] = p(rxOut, ryOut, a2);
    const large = Math.abs(a2 - a1) > Math.PI ? 1 : 0;
    return `M ${x1i} ${y1i} L ${x1o} ${y1o} A ${rxOut} ${ryOut} 0 ${large} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${rxIn} ${ryIn} 0 ${large} 0 ${x1i} ${y1i} Z`;
  };

  const ringRadii = {
    1: [rx2, ry2, rx3, ry3],
    2: [rx1, ry1, rx2, ry2],
    3: [rx3, ry3, rx3 * 1.06, ry3 * 1.06],
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", overflow: "visible" }}>

      <defs>
        <radialGradient id="pitchGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0a1a14" />
          <stop offset="60%" stopColor="#061010" />
          <stop offset="100%" stopColor="#04060a" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <ellipse cx={cx} cy={cy} rx={rx3 * 1.04} ry={ry3 * 1.04}
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 3" />

      {/* Heat/seat wedges */}
      {zones.map((z) => {
        const geom = zoneGeom[z.id]; if (!geom) return null;
        const [rxi, ryi, rxo, ryo] = ringRadii[geom.ring];
        const [a1, a2] = geom.a;
        const path = wedgePath(rxi, ryi, rxo, ryo, a1, a2);
        const isHi = highlightZone === z.id;
        const fill = showHeat ? heatColor(z.load) : (isHi ? "rgba(0,229,255,0.22)" : "rgba(255,255,255,0.04)");
        const stroke = isHi ? "var(--cyan)" : "rgba(0,0,0,0.5)";
        return (
          <g key={z.id} onClick={() => onZoneClick && onZoneClick(z)} style={{ cursor: onZoneClick ? "pointer" : "default" }}>
            <path d={path} fill={fill} stroke={stroke} strokeWidth={isHi ? 1.5 : 0.8} opacity={showHeat ? 0.92 : 1} />
            {z.alert === "surge" && (
              <path d={path} fill="none" stroke="var(--crit)" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.9">
                <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.8s" repeatCount="indefinite" />
              </path>
            )}
          </g>
        );
      })}

      {/* Pitch */}
      <ellipse cx={cx} cy={cy} rx={rx1 * 0.92} ry={ry1 * 0.88}
        fill="url(#pitchGrad)" stroke="rgba(43,227,139,0.18)" strokeWidth="0.8" />
      <line x1={cx - rx1 * 0.25} y1={cy} x2={cx + rx1 * 0.25} y2={cy}
        stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" />
      <circle cx={cx} cy={cy} r="3" fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
      <rect x={cx - 2} y={cy - 0.6} width="4" height="1.2" fill="rgba(255,255,255,0.30)" />

      {/* Seat dots */}
      {showSeats && Array.from({ length: 80 }).map((_, i) => {
        const r = seededRand("seats" + i);
        const t = r() * Math.PI * 2;
        const ring = 0.9 + r() * 0.18;
        const x = cx + rx3 * ring * Math.cos(t);
        const y = cy + ry3 * ring * Math.sin(t);
        return <circle key={i} cx={x} cy={y} r="0.7" fill="rgba(255,255,255,0.20)" />;
      })}

      {/* Flow arrows */}
      {showFlow && zones.filter(z => z.flow === "in" && z.load > 0.7).slice(0, 5).map((z, i) => {
        const geom = zoneGeom[z.id]; if (!geom) return null;
        const a = (geom.a[0] + geom.a[1]) / 2;
        const aRad = (a - 90) * Math.PI / 180;
        const [rxi, ryi] = ringRadii[geom.ring];
        const x1 = cx + (rxi * 1.05) * Math.cos(aRad);
        const y1 = cy + (ryi * 1.05) * Math.sin(aRad);
        const x2 = cx + (rxi * 0.85) * Math.cos(aRad);
        const y2 = cy + (ryi * 0.85) * Math.sin(aRad);
        return (
          <g key={"flow" + i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--cyan)" strokeWidth="1.4" opacity="0.7">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
            </line>
            <circle cx={x2} cy={y2} r="1.6" fill="var(--cyan)" />
          </g>
        );
      })}

      {/* Incidents */}
      {showIncidents && incidents.map((inc, i) => {
        const z = zones.find(z => z.id === inc.zone);
        if (!z) return null;
        const geom = zoneGeom[z.id]; if (!geom) return null;
        const a = (geom.a[0] + geom.a[1]) / 2;
        const aRad = (a - 90) * Math.PI / 180;
        const [rxi, ryi, rxo, ryo] = ringRadii[geom.ring];
        const x = cx + ((rxi + rxo) / 2) * Math.cos(aRad);
        const y = cy + ((ryi + ryo) / 2) * Math.sin(aRad);
        const col = inc.sev === "crit" ? "var(--crit)" : inc.sev === "warn" ? "var(--warn)" : "var(--cyan)";
        return (
          <g key={inc.id}>
            <circle cx={x} cy={y} r="6" fill="none" stroke={col} strokeWidth="1">
              <animate attributeName="r" values="3;10;3" dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
            <circle cx={x} cy={y} r="2.4" fill={col} />
          </g>
        );
      })}

      {/* Cameras */}
      {showCameras && [
        [cx - rx3 * 0.95, cy], [cx + rx3 * 0.95, cy], [cx, cy - ry3 * 0.95], [cx, cy + ry3 * 0.95],
      ].map((p, i) => (
        <g key={"cam" + i}>
          <circle cx={p[0]} cy={p[1]} r="2.4" fill="var(--cyan)" opacity="0.9" />
          <circle cx={p[0]} cy={p[1]} r="5" fill="none" stroke="var(--cyan)" strokeOpacity="0.3" />
        </g>
      ))}

      {/* Drones */}
      {showDrones && [
        [cx - rx3 * 0.4, cy - ry3 * 0.65], [cx + rx3 * 0.5, cy + ry3 * 0.45],
      ].map((p, i) => (
        <g key={"drn" + i}>
          <rect x={p[0] - 3} y={p[1] - 3} width="6" height="6" fill="none" stroke="var(--cyan)" strokeWidth="1">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
          </rect>
          <circle cx={p[0]} cy={p[1]} r="1.2" fill="var(--cyan)" />
        </g>
      ))}

      {/* Route */}
      {showRoute && routeDots && (
        <g>
          <path d={routeDots.path} stroke="var(--cyan)" strokeWidth="2" fill="none"
            strokeDasharray="4 4" filter="url(#glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="0.8s" repeatCount="indefinite" />
          </path>
          <circle cx={routeDots.from[0]} cy={routeDots.from[1]} r="3" fill="var(--cyan)" />
          <circle cx={routeDots.to[0]} cy={routeDots.to[1]} r="4" fill="none" stroke="var(--cyan)" strokeWidth="1.5" />
          <circle cx={routeDots.to[0]} cy={routeDots.to[1]} r="6" fill="none" stroke="var(--cyan)" strokeWidth="0.8" opacity="0.5" />
        </g>
      )}

      {/* Friends */}
      {showFriends && friends.map((f) => (
        <g key={f.id}>
          <circle cx={cx - rx3 + f.x * (rx3 * 2)} cy={cy - ry3 + f.y * (ry3 * 2)} r="5" fill={f.color} opacity="0.18" />
          <circle cx={cx - rx3 + f.x * (rx3 * 2)} cy={cy - ry3 + f.y * (ry3 * 2)} r="2.4" fill={f.color} />
        </g>
      ))}

      {/* Compass labels */}
      {showLabels && !compact && (
        <g style={{ font: "9px var(--font-mono)", fill: "var(--ink-4)", letterSpacing: "0.10em" }}>
          <text x={cx} y={12} textAnchor="middle">N</text>
          <text x={width - 8} y={cy + 3} textAnchor="end">E</text>
          <text x={cx} y={height - 4} textAnchor="middle">S</text>
          <text x={8} y={cy + 3}>W</text>
        </g>
      )}
    </svg>
  );
};

export default StadiumMap;
