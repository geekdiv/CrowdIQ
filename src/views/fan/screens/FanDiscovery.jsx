import { CIQ_DATA } from '../../../data/crowdiq';
import { Pill, StatChip, SectionTitle } from '../../../components/Common';

const FanDiscovery = ({ go }) => {
  const D = CIQ_DATA;
  return (
    <div className="fade-in">
      <div className="f-top">
        <div className="greeting">Tonight, <b>Mumbai</b></div>
        <div className="f-avatar">AS</div>
      </div>

      <div style={{ padding: "6px 16px 12px" }}>
        <div style={{
          height: 240, position: "relative", borderRadius: 18, overflow: "hidden",
          background: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 100%),
            radial-gradient(ellipse at 20% 30%, rgba(0,229,255,0.30), transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(255,209,102,0.20), transparent 60%),
            linear-gradient(135deg, #0a1a24, #050608)`,
          border: "1px solid var(--line-2)"
        }}>
          <svg viewBox="0 0 380 240" style={{ position: "absolute", inset: 0 }}>
            <ellipse cx="190" cy="190" rx="170" ry="40" fill="rgba(255,255,255,0.04)" stroke="rgba(0,229,255,0.20)" />
            <ellipse cx="190" cy="190" rx="110" ry="20" fill="rgba(43,227,139,0.06)" stroke="rgba(43,227,139,0.30)" />
            <text x="190" y="194" textAnchor="middle" fill="rgba(255,255,255,0.20)" style={{ font: "600 8px var(--font-mono)" }}>APEX</text>
          </svg>
          <div style={{ position: "absolute", left: 18, top: 18, display: "flex", gap: 6 }}>
            <Pill kind="live">Tonight · 19:30</Pill>
          </div>
          <div style={{ position: "absolute", left: 18, right: 18, bottom: 18 }}>
            <div className="annot" style={{ color: "var(--cyan)" }}>IPL 2026 · MATCH 32</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6, letterSpacing: "-0.02em" }}>
              Mumbai Royals <span style={{ color: "var(--ink-3)" }}>vs</span> Chennai Titans
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>
              Apex Cricket Stadium · 52,400 seats · Roof open
            </div>
          </div>
        </div>
      </div>

      <div className="f-stats">
        <StatChip label="Capacity" value="91%" />
        <StatChip label="Avg arrival" value="32m" kind="cyan" />
        <StatChip label="Weather" value="28°C" />
      </div>

      <SectionTitle>Match day timeline</SectionTitle>
      <div style={{ padding: "0 20px 14px" }}>
        {[
          ["17:00", "Gates open", "Express entry · use Gate 4"],
          ["19:00", "Toss & national anthem", "Get to your seat by 18:45"],
          ["19:30", "First ball", "MUM batting · live AI commentary"],
          ["20:50", "Innings break", "20 min · perfect time to order food"],
        ].map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 14, padding: "10px 0", borderBottom: "1px solid var(--line-1)" }}>
            <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: i < 2 ? "var(--ink-3)" : "var(--cyan)" }}>{row[0]}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{row[1]}</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{row[2]}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "4px 20px 24px" }}>
        <button className="btn primary" style={{ width: "100%", height: 48 }} onClick={() => go("ticket")}>
          Open your ticket → Gate 4
        </button>
      </div>
    </div>
  );
};

export default FanDiscovery;
