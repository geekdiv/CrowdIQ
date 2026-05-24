import { CIQ_DATA } from '../../data/crowdiq';
import { Pill, Sparkline } from '../../components/Common';
import StadiumMap from '../../components/StadiumMap';
import Icon from '../../components/Icon';

const StaffView = () => {
  const D = CIQ_DATA;

  const statusColor = {
    "deployed": "var(--cyan)",
    "en-route": "var(--warn)",
    "standby":  "var(--ink-3)",
    "command":  "var(--ok)",
  };

  const roleIcon = {
    "Security": "shield",
    "Medical":  "medical",
    "Steward":  "user",
    "Cleaner":  "wrench",
    "Ops Lead": "broadcast",
  };

  return (
    <div className="dash">
      <div className="col-3 metric">
        <div className="lbl">Total Staff On-Duty</div>
        <div className="val">{D.staff.length}</div>
        <div className="delta up">+ 3 on standby available</div>
      </div>
      <div className="col-3 metric">
        <div className="lbl">Deployed</div>
        <div className="val cyan">{D.staff.filter(s => s.status === "deployed").length}</div>
        <div className="delta">Across 6 zones</div>
        <Sparkline seed="staff" color="var(--cyan)" height={28} />
      </div>
      <div className="col-3 metric">
        <div className="lbl">En Route</div>
        <div className="val warn">{D.staff.filter(s => s.status === "en-route").length}</div>
        <div className="delta">Responding to INC-205</div>
      </div>
      <div className="col-3 metric">
        <div className="lbl">Unassigned Zones</div>
        <div className="val">3</div>
        <div className="delta down">AI recommends S2, W3, G3</div>
      </div>

      {/* Map */}
      <div className="card col-8" style={{ overflow: "hidden" }}>
        <div className="card-head">
          <Pill kind="live">Live positions</Pill>
          <span className="card-title">Staff Deployment Map</span>
        </div>
        <div style={{ position: "relative", background: "linear-gradient(180deg, #08090c, #050608)" }}>
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
          <div style={{ padding: "20px 24px", position: "relative" }}>
            <StadiumMap width={720} height={340} showHeat incidents={D.incidents.filter(i => i.sev === "crit")} showIncidents />
          </div>
        </div>
      </div>

      {/* Roster */}
      <div className="card col-4">
        <div className="card-head">
          <Icon name="user" size={14} style={{ color: "var(--cyan)" }} />
          <span className="card-title">Live Roster</span>
        </div>
        <div>
          {D.staff.map((s, i) => (
            <div key={s.id} style={{ display: "grid", gridTemplateColumns: "36px 1fr auto", gap: 12, padding: "12px 16px", borderBottom: i < D.staff.length - 1 ? "1px solid var(--line-1)" : "none", alignItems: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(0,229,255,0.06)", border: "1px solid var(--line-2)", display: "grid", placeItems: "center" }}>
                <Icon name={roleIcon[s.role] || "user"} size={14} style={{ color: "var(--cyan)" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                <div className="annot" style={{ marginTop: 2 }}>{s.role} · {s.id} · Zone {s.zone}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: statusColor[s.status] || "var(--ink-4)" }} />
                <div className="annot">{s.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI deployment recommendations */}
      <div className="card col-12">
        <div className="card-head">
          <Icon name="ai" size={14} style={{ color: "var(--cyan)" }} />
          <span className="card-title">AI Deployment Recommendations</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {[
            { zone: "E1 Premium",   action: "Deploy 2 additional stewards immediately", sev: "crit", reason: "Zone at 96% — crowd surge imminent" },
            { zone: "Gate 2",       action: "Open bag-check lane 4, redirect to G1/G4",  sev: "warn", reason: "9m wait exceeds 7m SLA" },
            { zone: "C1 Concourse", action: "Reroute 15% patrons to Concourse W",         sev: "warn", reason: "Vendor wait spike predicted at 20:10" },
          ].map((rec, i) => (
            <div key={i} style={{ padding: 20, borderRight: i < 2 ? "1px solid var(--line-1)" : "none" }}>
              <div className="annot" style={{ color: rec.sev === "crit" ? "var(--crit)" : "var(--warn)" }}>
                {rec.sev === "crit" ? "⚠ CRITICAL" : "⚑ RECOMMENDED"}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>{rec.zone}</div>
              <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>{rec.action}</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{rec.reason}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn primary" style={{ height: 30, padding: "0 12px", fontSize: 12 }}>Accept</button>
                <button className="btn ghost" style={{ height: 30, padding: "0 12px", fontSize: 12 }}>Modify</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffView;
