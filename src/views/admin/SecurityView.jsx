import { useState } from 'react';
import { CIQ_DATA } from '../../data/crowdiq';
import { Pill, Bar, Sparkline } from '../../components/Common';
import StadiumMap from '../../components/StadiumMap';
import Icon from '../../components/Icon';

const SecurityView = () => {
  const D = CIQ_DATA;
  const [selectedIncident, setSelectedIncident] = useState(null);

  const secIncidents = D.incidents.filter(i => i.type === "crowd" || i.type === "security");
  const secStaff = D.staff.filter(s => s.role === "Security");

  return (
    <div className="dash">
      {/* Metrics */}
      <div className="col-3 metric">
        <div className="lbl">Security Staff Active</div>
        <div className="val cyan">{secStaff.length}</div>
        <div className="delta">3 deployed · 1 standby</div>
        <Sparkline seed="sec" color="var(--cyan)" height={28} />
      </div>
      <div className="col-3 metric">
        <div className="lbl">Open Security Alerts</div>
        <div className="val warn">2</div>
        <div className="delta down">Gate 2 · E1 Premium zone</div>
      </div>
      <div className="col-3 metric">
        <div className="lbl">CV Cameras Live</div>
        <div className="val">28</div>
        <div className="delta up">↑ All feeds nominal</div>
      </div>
      <div className="col-3 metric">
        <div className="lbl">Gate 2 Queue</div>
        <div className="val crit">9<span style={{ fontSize: 18, color: "var(--ink-3)" }}>min</span></div>
        <div className="delta down">↑ Lane 3 reset in progress</div>
      </div>

      {/* Map */}
      <div className="card col-8" style={{ overflow: "hidden" }}>
        <div className="card-head">
          <Pill kind="live">CV Active</Pill>
          <span className="card-title">Security Operations Map</span>
          <div className="grow" />
          <Pill>28 cameras</Pill>
          <Pill>4 drones</Pill>
        </div>
        <div style={{ position: "relative", background: "linear-gradient(180deg, #08090c, #050608)" }}>
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
          <div style={{ padding: "20px 24px", position: "relative" }}>
            <StadiumMap width={720} height={340} showHeat showIncidents showCameras showDrones
              incidents={secIncidents} />
          </div>
        </div>
      </div>

      {/* Staff roster */}
      <div className="card col-4">
        <div className="card-head">
          <Icon name="shield" size={14} style={{ color: "var(--cyan)" }} />
          <span className="card-title">Security Roster</span>
        </div>
        <div>
          {secStaff.map((s, i) => (
            <div key={s.id} style={{ display: "grid", gridTemplateColumns: "36px 1fr auto", gap: 12, padding: "12px 16px", borderBottom: i < secStaff.length - 1 ? "1px solid var(--line-1)" : "none", alignItems: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(0,229,255,0.08)", border: "1px solid var(--line-2)", display: "grid", placeItems: "center" }}>
                <Icon name="shield" size={14} style={{ color: "var(--cyan)" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                <div className="annot" style={{ marginTop: 2 }}>{s.id} · Zone {s.zone}</div>
              </div>
              <span className={`pill ${s.status === "deployed" ? "live" : s.status === "en-route" ? "warn" : ""}`}>
                <span className="dot" />{s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gate monitoring */}
      <div className="card col-12">
        <div className="card-head">
          <span className="card-title">Gate Monitoring · Entry Control</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}>
          {D.gates.map((g, i) => (
            <div key={g.id} style={{ padding: "20px 20px", borderRight: i < D.gates.length - 1 ? "1px solid var(--line-1)" : "none" }}>
              <div className="annot">{g.id}</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>{g.name.replace(`Gate ${g.id.replace("G", "")} — `, "").replace("Gate ", "")}</div>
              <div className="mono" style={{ fontSize: 32, fontWeight: 700, marginTop: 12, color: parseInt(g.wait) >= 8 ? "var(--crit)" : parseInt(g.wait) >= 4 ? "var(--warn)" : "var(--ok)" }}>
                {g.wait}
              </div>
              <div className="annot">WAIT</div>
              <div style={{ marginTop: 12 }}>
                <Bar value={g.load} kind={g.load > 0.8 ? "crit" : g.load > 0.6 ? "warn" : "ok"} />
              </div>
              <div className="annot" style={{ marginTop: 4 }}>{Math.round(g.load * 100)}% load</div>
              {g.alert && <div style={{ marginTop: 8 }}><Pill kind="warn"><span className="dot" />alert</Pill></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityView;
