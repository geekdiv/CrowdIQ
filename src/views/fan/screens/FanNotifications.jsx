import { useState } from 'react';
import { CIQ_DATA } from '../../../data/crowdiq';
import ScreenHeader from '../ScreenHeader';

const FanNotifications = ({ go }) => {
  const D = CIQ_DATA;
  const [filter, setFilter] = useState("all");
  const filtered = D.notifications.filter(n => filter === "all" ? true : n.sev === filter);

  return (
    <div className="fade-in">
      <ScreenHeader title="Live updates" sub="All AI-prioritized for your seat" go={go} />
      <div style={{ padding: "4px 14px 8px", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {[["all", "All"], ["crit", "Critical"], ["warn", "Alerts"], ["info", "Updates"], ["ok", "Friends"]].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: "6px 10px", borderRadius: 99,
            background: filter === k ? "rgba(0,229,255,0.08)" : "transparent",
            border: `1px solid ${filter === k ? "rgba(0,229,255,0.30)" : "var(--line-2)"}`,
            color: filter === k ? "var(--cyan)" : "var(--ink-2)",
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", cursor: "pointer"
          }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: "0 14px 20px" }}>
        {filtered.map(n => (
          <div key={n.id} style={{ display: "grid", gridTemplateColumns: "3px 1fr", gap: 12, padding: 14, border: "1px solid var(--line-1)", borderRadius: 12, marginBottom: 8, background: "var(--bg-2)" }}>
            <div style={{ borderRadius: 99, background: n.sev === "crit" ? "var(--crit)" : n.sev === "warn" ? "var(--warn)" : n.sev === "ok" ? "var(--ok)" : "var(--cyan)" }} />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
                <div className="annot">{n.t}</div>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>{n.body}</div>
              <button style={{ marginTop: 10, padding: "6px 10px", borderRadius: 8, background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.30)", color: "var(--cyan)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".06em", cursor: "pointer", textTransform: "uppercase" }}>
                {n.action} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FanNotifications;
