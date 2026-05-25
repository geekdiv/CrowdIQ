import { useState } from 'react';
import { CIQ_DATA } from '../../../data/crowdiq';
import { Pill, SectionTitle, Bar } from '../../../components/Common';
import Icon from '../../../components/Icon';
import ScreenHeader from '../ScreenHeader';

const FanParking = ({ go }) => {
  const D = CIQ_DATA;
  const [chosen, setChosen] = useState("P3");

  return (
    <div className="fade-in">
      <ScreenHeader title="Parking" sub="AI-routed · live availability" go={go} />

      <div style={{ padding: "4px 14px 0" }}>
        <div style={{ height: 200, position: "relative", borderRadius: 14, overflow: "hidden", background: "linear-gradient(180deg, #060709, #0a0c10)", border: "1px solid var(--line-1)" }}>
          <svg viewBox="0 0 340 200" width="100%" height="100%">
            <ellipse cx="170" cy="100" rx="40" ry="22" fill="#0a1a14" stroke="rgba(43,227,139,0.20)" strokeWidth="1" />
            <ellipse cx="170" cy="100" rx="50" ry="32" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="2 3" />
            <path d="M 0 30 Q 80 30, 120 80" stroke="rgba(255,255,255,0.10)" strokeWidth="2" fill="none" />
            <path d="M 340 50 Q 260 50, 220 90" stroke="rgba(255,255,255,0.10)" strokeWidth="2" fill="none" />
            <path d="M 0 180 Q 100 180, 140 130" stroke="rgba(255,255,255,0.10)" strokeWidth="2" fill="none" />
            <path d="M 340 170 Q 240 170, 200 130" stroke="rgba(255,255,255,0.10)" strokeWidth="2" fill="none" />
            <path d="M 60 180 Q 100 180, 140 130" stroke="var(--cyan)" strokeWidth="2" fill="none" strokeDasharray="6 4" filter="url(#glow)">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite" />
            </path>
            {[
              { id: "P1", x: 30, y: 30, color: "var(--crit)" },
              { id: "P2", x: 300, y: 50, color: "var(--crit)" },
              { id: "P3", x: 60, y: 180, color: "var(--ok)" },
              { id: "P4", x: 300, y: 170, color: "var(--warn)" },
            ].map(p => (
              <g key={p.id}>
                <rect x={p.x - 12} y={p.y - 10} width="24" height="20" rx="3"
                  fill={p.id === chosen ? "var(--cyan)" : "rgba(255,255,255,0.04)"}
                  stroke={p.id === chosen ? "var(--cyan)" : p.color} strokeWidth="1.2" />
                <text x={p.x} y={p.y + 4} textAnchor="middle"
                  fill={p.id === chosen ? "#001016" : "var(--ink-1)"} style={{ font: "600 10px var(--font-mono)" }}>{p.id}</text>
              </g>
            ))}
            <g transform="translate(20,180)">
              <circle r="6" fill="rgba(0,229,255,0.20)" />
              <circle r="3" fill="var(--cyan)" />
            </g>
          </svg>
          <div style={{ position: "absolute", left: 14, top: 14 }}>
            <Pill kind="live">Live · 14 sensors</Pill>
          </div>
          <div style={{ position: "absolute", right: 14, top: 14 }}>
            <Pill>You · 8 min from gate</Pill>
          </div>
        </div>
      </div>

      <SectionTitle>Lots</SectionTitle>
      <div style={{ padding: "0 14px 12px" }}>
        {D.parking.map(p => {
          const avail = p.total - p.used;
          const pct = avail / p.total;
          const status = avail < 50 ? "Full" : avail < 200 ? "Filling" : "Available";
          const col = avail < 50 ? "var(--crit)" : avail < 200 ? "var(--warn)" : "var(--ok)";
          return (
            <button key={p.id} onClick={() => setChosen(p.id)} style={{
              width: "100%", textAlign: "left", padding: 14,
              background: chosen === p.id ? "rgba(0,229,255,0.05)" : "var(--bg-2)",
              border: `1px solid ${chosen === p.id ? "rgba(0,229,255,0.30)" : "var(--line-1)"}`,
              borderRadius: 12, marginBottom: 8, cursor: "pointer", color: "var(--ink-1)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div className="annot" style={{ marginTop: 2 }}>VIA {p.route.toUpperCase()}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 600, color: col }}>
                    {avail.toLocaleString()}<span style={{ fontSize: 11, color: "var(--ink-3)" }}> / {p.total.toLocaleString()}</span>
                  </div>
                  <div className="annot" style={{ color: col, marginTop: 2 }}>{status}</div>
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <Bar value={pct} kind={avail < 50 ? "crit" : avail < 200 ? "warn" : "ok"} />
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ padding: "0 14px 24px" }}>
        <button className="btn primary" style={{ width: "100%", height: 44 }}>
          <Icon name="nav" size={14} /> Navigate to Lot C · 12 min
        </button>
      </div>
    </div>
  );
};

export default FanParking;
