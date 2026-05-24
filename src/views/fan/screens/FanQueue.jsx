import { CIQ_DATA } from '../../../data/crowdiq';
import { Pill } from '../../../components/Common';
import Icon from '../../../components/Icon';
import ScreenHeader from '../ScreenHeader';

const FanQueue = ({ go }) => {
  const D = CIQ_DATA;
  return (
    <div className="fade-in">
      <ScreenHeader title="Queues near you" sub="AI-balanced · updated every 6s" go={go} />

      <div style={{ padding: "4px 20px 14px" }}>
        <div style={{ background: "var(--bg-2)", border: "1px solid var(--line-1)", borderRadius: 14, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="annot">CONCOURSE PRESSURE</div>
            <Pill kind="warn">Elevated</Pill>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 12 }}>
            {[["C1", 0.94, "crit"], ["C2", 0.71, "warn"], ["C3", 0.32, "ok"], ["C4", 0.58, "warn"]].map(([k, v, kind]) => (
              <div key={k} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ height: 48, borderRadius: 6, position: "relative", background: "rgba(255,255,255,0.04)", overflow: "hidden", border: "1px solid var(--line-1)" }}>
                  <div style={{
                    position: "absolute", left: 0, right: 0, bottom: 0, height: `${v * 100}%`,
                    background: kind === "crit" ? "var(--crit)" : kind === "warn" ? "var(--warn)" : "var(--ok)", opacity: 0.8
                  }} />
                </div>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", textAlign: "center" }}>
                  {k} · {Math.round(v * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="annot" style={{ padding: "0 24px 8px" }}>WAIT TIMES · LIVE</div>
      <div style={{ padding: "0 14px" }}>
        {D.queues.map((q) => (
          <div key={q.id} style={{
            padding: "12px 14px", marginBottom: 8,
            border: "1px solid var(--line-1)", borderRadius: 12, background: "var(--bg-2)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{q.name}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-4)", marginTop: 2, letterSpacing: ".08em" }}>
                  {q.trend === "up" ? "↑ INCREASING" : q.trend === "down" ? "↓ DECREASING" : "→ STABLE"}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="mono" style={{
                  fontSize: 22, fontWeight: 600,
                  color: q.wait >= 10 ? "var(--crit)" : q.wait >= 5 ? "var(--warn)" : "var(--ok)"
                }}>
                  {q.wait}<span style={{ fontSize: 11, color: "var(--ink-3)" }}>m</span>
                </div>
              </div>
            </div>
            {q.alt && (
              <div style={{
                marginTop: 10, padding: "8px 10px",
                background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.20)", borderRadius: 8,
                display: "flex", alignItems: "center", gap: 8
              }}>
                <Icon name="ai" size={12} style={{ color: "var(--cyan)" }} />
                <div style={{ fontSize: 11, color: "var(--cyan)", flex: 1 }}>
                  CrowdIQ suggests <b>{q.alt}</b>
                </div>
                <Icon name="arrow-right" size={12} style={{ color: "var(--cyan)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
};

export default FanQueue;
