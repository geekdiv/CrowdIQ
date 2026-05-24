import { useState } from 'react';
import { CIQ_DATA } from '../../data/crowdiq';
import { Pill, Sparkline } from '../../components/Common';
import StadiumMap from '../../components/StadiumMap';
import Icon from '../../components/Icon';

const MedicalView = () => {
  const D = CIQ_DATA;
  const [sosActive, setSosActive] = useState(true);

  const medStaff = D.staff.filter(s => s.role === "Medical");
  const medIncidents = D.incidents.filter(i => i.type === "medical");

  return (
    <div className="dash">
      <div className="col-3 metric">
        <div className="lbl">Active Medical Cases</div>
        <div className="val crit">{D.realtime.medical}</div>
        <div className="delta down">INC-205 dispatched 90s ago</div>
      </div>
      <div className="col-3 metric">
        <div className="lbl">Medical Staff On Duty</div>
        <div className="val">{medStaff.length + 4}</div>
        <div className="delta">2 paramedics · 3 first aid</div>
        <Sparkline seed="med" color="var(--ok)" height={28} />
      </div>
      <div className="col-3 metric">
        <div className="lbl">Avg Response Time</div>
        <div className="val ok">1:24<span style={{ fontSize: 18, color: "var(--ink-3)" }}>m</span></div>
        <div className="delta up">↑ 12s faster than avg</div>
      </div>
      <div className="col-3 metric">
        <div className="lbl">Temp Alert Zones</div>
        <div className="val warn">2</div>
        <div className="delta">N2 · W1 heat exposure risk</div>
      </div>

      {/* Active SOS incident */}
      {sosActive && (
        <div className="col-12" style={{ background: "linear-gradient(135deg, rgba(255,59,92,0.08), rgba(255,59,92,0.02))", border: "1px solid rgba(255,59,92,0.30)", borderRadius: 14, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Pill kind="crit">● ACTIVE CASE</Pill>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>INC-205 · 19:48</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>Heat exhaustion — Section N2, Row 14</div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>Patient conscious, complaining of dizziness. Seat neighbours providing water. Temperature 38.2°C.</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="annot">RESPONDER ETA</div>
              <div className="mono" style={{ fontSize: 42, fontWeight: 700, color: "var(--ok)" }}>0:42</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Dr. Iyer · En route via Stair N-1</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="btn crit">Escalate to hospital</button>
            <button className="btn" style={{ borderColor: "rgba(43,227,139,0.3)", color: "var(--ok)" }}>Mark resolved</button>
            <button className="btn ghost" onClick={() => setSosActive(false)}>Dismiss</button>
          </div>
        </div>
      )}

      {/* Map */}
      <div className="card col-8" style={{ overflow: "hidden" }}>
        <div className="card-head">
          <Pill kind="live">Medical Layer</Pill>
          <span className="card-title">Medical Response Map</span>
        </div>
        <div style={{ position: "relative", background: "linear-gradient(180deg, #08090c, #050608)" }}>
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
          <div style={{ padding: "20px 24px", position: "relative" }}>
            <StadiumMap width={720} height={340} showHeat showIncidents incidents={medIncidents} highlightZone="N2" />
          </div>
        </div>
      </div>

      {/* Response teams */}
      <div className="card col-4">
        <div className="card-head">
          <Icon name="medical" size={14} style={{ color: "var(--crit)" }} />
          <span className="card-title">Response Teams</span>
        </div>
        <div>
          {[...medStaff,
            { id: "S-090", role: "Paramedic", zone: "MED-1", status: "standby", name: "P. Sharma" },
            { id: "S-091", role: "First Aid", zone: "MED-2", status: "standby", name: "T. Kumar" },
            { id: "S-092", role: "First Aid", zone: "C2",    status: "deployed", name: "R. Patel" },
          ].map((s, i, arr) => (
            <div key={s.id} style={{ display: "grid", gridTemplateColumns: "36px 1fr auto", gap: 12, padding: "12px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--line-1)" : "none", alignItems: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,59,92,0.08)", border: "1px solid rgba(255,59,92,0.20)", display: "grid", placeItems: "center" }}>
                <Icon name="medical" size={14} style={{ color: "var(--crit)" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                <div className="annot" style={{ marginTop: 2 }}>{s.role} · Zone {s.zone}</div>
              </div>
              <span className={`pill ${s.status === "deployed" || s.status === "en-route" ? (s.status === "en-route" ? "warn" : "live") : ""}`}>
                <span className="dot" />{s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Medical stations */}
      <div className="card col-6">
        <div className="card-head">
          <span className="card-title">Medical Aid Stations</span>
        </div>
        <table className="tbl">
          <thead>
            <tr><th>Station</th><th>Zone</th><th>Staff</th><th>Status</th></tr>
          </thead>
          <tbody>
            {[
              { name: "Med Post Alpha", zone: "Concourse N", staff: 2, status: "active" },
              { name: "Med Post Beta",  zone: "Concourse S", staff: 2, status: "active" },
              { name: "Field Medic",    zone: "N2 Section",  staff: 1, status: "responding" },
              { name: "First Aid Kiosk", zone: "Gate 4",     staff: 1, status: "active" },
            ].map((m, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{m.name}</td>
                <td className="annot">{m.zone}</td>
                <td className="mono">{m.staff} staff</td>
                <td>
                  <span className={`pill ${m.status === "responding" ? "warn" : "ok"}`}>
                    <span className="dot" />{m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Weather risk */}
      <div className="card col-6">
        <div className="card-head">
          <Icon name="weather" size={14} style={{ color: "var(--warn)" }} />
          <span className="card-title">Environmental Health Risk</span>
        </div>
        <div className="card-body">
          {[
            { label: "Temperature", value: "28°C", risk: 0.45, status: "Moderate" },
            { label: "Humidity", value: "71%", risk: 0.65, status: "High" },
            { label: "UV Index", value: "3 (Low)", risk: 0.20, status: "Low" },
            { label: "Crowd Temp (avg)", value: "32.1°C", risk: 0.72, status: "Monitor" },
          ].map((r, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{r.label}</span>
                <span className="mono" style={{ fontSize: 12, color: r.risk > 0.6 ? "var(--warn)" : "var(--ink-2)" }}>{r.value}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div className="bar">
                    <i style={{ width: `${Math.round(r.risk * 100)}%`, background: r.risk > 0.6 ? "var(--warn)" : "var(--ok)" }} />
                  </div>
                </div>
                <span className="annot">{r.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalView;
