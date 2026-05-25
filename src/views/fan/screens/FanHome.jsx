import { useState, useEffect } from 'react';
import { CIQ_DATA } from '../../../data/crowdiq';
import { Pill, SectionTitle } from '../../../components/Common';
import StadiumMap from '../../../components/StadiumMap';
import Icon from '../../../components/Icon';

const ActionCard = ({ icon, tone = "cyan", title, sub, right, onClick }) => (
  <button onClick={onClick} style={{
    textAlign: "left", padding: "12px 12px 14px",
    border: "1px solid var(--line-1)", borderRadius: 12, background: "var(--bg-2)",
    color: "var(--ink-1)", cursor: "pointer", display: "flex", flexDirection: "column", gap: 10
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: tone === "warn" ? "rgba(255,184,0,0.10)" : "rgba(0,229,255,0.08)",
        border: `1px solid ${tone === "warn" ? "rgba(255,184,0,0.30)" : "rgba(0,229,255,0.25)"}`,
        color: tone === "warn" ? "var(--warn)" : "var(--cyan)",
        display: "grid", placeItems: "center"
      }}>
        <Icon name={icon} size={14} />
      </div>
      <span className="annot">{right}</span>
    </div>
    <div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{title}</div>
      <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{sub}</div>
    </div>
  </button>
);

const FanHome = ({ go }) => {
  const D = CIQ_DATA;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fade-in">
      <div className="f-top">
        <div className="greeting">Good evening, <b>Aarav</b></div>
        <div className="f-avatar">AS</div>
      </div>

      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--cyan)", letterSpacing: ".14em" }}>LIVE · OVER {D.match.over}</div>
          <span className="live-dot" />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 6 }}>
          <div>
            <div style={{ fontSize: 30, fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
              {D.match.score}
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>
              vs {D.match.away.name} · need {D.match.target - 118} from 44
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="annot">RR</div>
            <div style={{ fontSize: 22, fontFamily: "var(--font-mono)", fontWeight: 600 }}>{D.match.rr}</div>
          </div>
        </div>
      </div>

      {/* Stadium heatmap */}
      <div style={{ padding: "14px 14px 0" }}>
        <div style={{
          background: "linear-gradient(180deg, #08090c, #050608)",
          border: "1px solid var(--line-1)", borderRadius: 16, padding: "14px 10px 8px", position: "relative"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 6px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Pill kind="live">Live</Pill>
              <span className="annot">CROWD HEATMAP</span>
            </div>
            <span className="annot">{D.realtime.inside.toLocaleString()} INSIDE</span>
          </div>
          <StadiumMap width={340} height={170} showHeat showFlow showIncidents
            incidents={D.incidents.filter(i => i.sev !== "info")} highlightZone="E2" />
          <div style={{ display: "flex", gap: 4, padding: "10px 6px 2px", alignItems: "center" }}>
            <span className="annot" style={{ marginRight: 6 }}>DENSITY</span>
            {["var(--heat-1)", "var(--heat-2)", "var(--heat-3)", "var(--heat-4)", "var(--heat-5)", "var(--heat-6)"].map((c, i) => (
              <div key={i} style={{ flex: 1, height: 4, background: c }} />
            ))}
            <span className="annot" style={{ marginLeft: 6 }}>SURGE</span>
          </div>
        </div>
      </div>

      {/* Action chips */}
      <SectionTitle action="See all">Suggested for you</SectionTitle>
      <div style={{ padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <ActionCard icon="nav" tone="cyan" title="Walk to your seat" sub="E2 · Row 12 · Seat 7" right="6 min" onClick={() => go("nav")} />
        <ActionCard icon="warn" tone="warn" title="Reroute around E1" sub="Surge detected · 96%" right="View" onClick={() => go("nav")} />
        <ActionCard icon="food" tone="cyan" title="Order Cricket Curry" sub="Pickup C2 · 7 min wait" right="Order" onClick={() => go("food")} />
        <ActionCard icon="friends" tone="cyan" title="Vikram 6 min away" sub="Entering Gate 4" right="Track" onClick={() => go("friends")} />
      </div>

      {/* Live alerts */}
      <SectionTitle>Live alerts</SectionTitle>
      <div style={{ padding: "0 14px 24px" }}>
        {D.notifications.slice(0, 3).map(n => (
          <div key={n.id} style={{
            display: "grid", gridTemplateColumns: "3px 1fr auto", gap: 12,
            padding: "12px 14px", border: "1px solid var(--line-1)", borderRadius: 12,
            marginBottom: 8, background: "var(--bg-2)"
          }}>
            <div style={{
              borderRadius: 99,
              background: n.sev === "crit" ? "var(--crit)" : n.sev === "warn" ? "var(--warn)" : n.sev === "ok" ? "var(--ok)" : "var(--cyan)"
            }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{n.title}</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{n.body}</div>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-4)" }}>{n.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FanHome;
