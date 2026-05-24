import { useState } from 'react';
import { CIQ_DATA } from '../../data/crowdiq';
import { Pill, Sparkline, Bar } from '../../components/Common';
import StadiumMap from '../../components/StadiumMap';
import Icon from '../../components/Icon';

const AdminDashboard = () => {
  const D = CIQ_DATA;
  const [selectedZone, setSelectedZone] = useState(null);

  return (
    <div className="dash">
      {/* Top row metrics */}
      <div className="col-3 metric">
        <div className="lbl">People Inside</div>
        <div className="val">{(D.realtime.inside / 1000).toFixed(1)}<span style={{ fontSize: 18, color: "var(--ink-3)" }}>k</span></div>
        <div className="delta up">↑ 2,140 / 5 min · 91% capacity</div>
        <Sparkline seed="inside" height={28} />
      </div>
      <div className="col-3 metric">
        <div className="lbl">Active Incidents</div>
        <div className="val crit">{D.realtime.incidents}</div>
        <div className="delta">2 warn · 1 crit · 1 resolved 4m ago</div>
        <div style={{ display: "flex", gap: 4, marginTop: "auto" }}>
          {[1, 1, 1, 2, 2, 3, 2, 3, 1, 1, 2, 1].map((v, i) => (
            <div key={i} style={{ flex: 1, height: 18, borderRadius: 2, background: v === 3 ? "var(--crit)" : v === 2 ? "var(--warn)" : "rgba(43,227,139,0.4)" }} />
          ))}
        </div>
      </div>
      <div className="col-3 metric">
        <div className="lbl">Avg Queue Wait</div>
        <div className="val warn">7.2<span style={{ fontSize: 18, color: "var(--ink-3)" }}>min</span></div>
        <div className="delta down">↓ 1.4 min after AI reroute</div>
        <Sparkline seed="qwait" color="var(--warn)" height={28} />
      </div>
      <div className="col-3 metric">
        <div className="lbl">Crowd Sentiment</div>
        <div className="val ok">{Math.round(D.realtime.sentiment * 100)}<span style={{ fontSize: 18, color: "var(--ink-3)" }}>/100</span></div>
        <div className="delta up">↑ 4 pts · "Elevated, positive"</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto" }}>
          {[0.8, 0.18, 0.06].map((op, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i === 0 ? "var(--ok)" : i === 1 ? "var(--warn)" : "var(--crit)", opacity: op }} />
          ))}
        </div>
      </div>

      {/* Main map */}
      <div className="card col-8" style={{ overflow: "hidden" }}>
        <div className="card-head" style={{ paddingRight: 10 }}>
          <Pill kind="live">Live</Pill>
          <span className="card-title">Stadium Operations Map</span>
          <div className="grow" />
          <Pill>Heat</Pill>
          <Pill>Flow</Pill>
          <Pill>Incidents</Pill>
          <Pill>Cameras</Pill>
          <Pill>Drones</Pill>
        </div>
        <div style={{ position: "relative", background: "linear-gradient(180deg, #08090c, #050608)" }}>
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
          <div style={{ padding: "20px 24px", position: "relative" }}>
            <StadiumMap width={720} height={340} showHeat showFlow showIncidents showCameras showDrones
              incidents={D.incidents.filter(i => i.sev !== "info")}
              onZoneClick={setSelectedZone}
              highlightZone={selectedZone?.id} />

            <div style={{ position: "absolute", left: 24, top: 24, display: "flex", flexDirection: "column", gap: 8 }}>
              <Pill kind="crit">2 critical zones</Pill>
              <Pill kind="warn">3 high-load zones</Pill>
            </div>

            <div style={{ position: "absolute", right: 24, top: 24, width: 200, background: "rgba(8,9,12,0.85)", backdropFilter: "blur(12px)", border: "1px solid var(--line-2)", borderRadius: 12, padding: "12px 14px" }}>
              {selectedZone ? (
                <>
                  <div className="annot">SELECTED ZONE</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{selectedZone.name}</div>
                  <div className="annot" style={{ marginTop: 8 }}>OCCUPANCY</div>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 600, color: selectedZone.load > 0.9 ? "var(--crit)" : selectedZone.load > 0.75 ? "var(--warn)" : "var(--ok)" }}>
                    {Math.round(selectedZone.load * 100)}%
                  </div>
                  <div className="mt-2"><Bar value={selectedZone.load} kind={selectedZone.load > 0.9 ? "crit" : selectedZone.load > 0.75 ? "warn" : "ok"} /></div>
                  <div className="annot mt-3">TREND · 5min</div>
                  <div className="mono" style={{ fontSize: 13, color: selectedZone.trend.startsWith("-") ? "var(--ok)" : "var(--warn)" }}>{selectedZone.trend}</div>
                  <div className="annot mt-3">FLOW DIRECTION</div>
                  <div className="mono" style={{ fontSize: 13 }}>{selectedZone.flow.toUpperCase()}</div>
                  <button className="btn primary mt-3" style={{ width: "100%", height: 30 }}>Deploy staff</button>
                </>
              ) : (
                <>
                  <div className="annot">VIEW</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>All zones</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 8, lineHeight: 1.5 }}>
                    Click any zone to drill in. AI is monitoring 14 zones and 5 gates in real time.
                  </div>
                  <div className="annot mt-3">LIVE FEEDS</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 6 }}>
                    <Pill>● 28 cams</Pill>
                    <Pill>● 4 drones</Pill>
                    <Pill>● 212 IoT</Pill>
                    <Pill>● 14 beacons</Pill>
                  </div>
                </>
              )}
            </div>

            <div style={{ position: "absolute", left: 24, bottom: 24, padding: "8px 12px", background: "rgba(8,9,12,0.85)", backdropFilter: "blur(12px)", border: "1px solid var(--line-2)", borderRadius: 99, display: "flex", alignItems: "center", gap: 8 }}>
              <span className="annot">DENSITY</span>
              {["var(--heat-1)", "var(--heat-2)", "var(--heat-3)", "var(--heat-4)", "var(--heat-5)", "var(--heat-6)"].map((c, i) => (
                <div key={i} style={{ width: 18, height: 4, background: c }} />
              ))}
              <span className="annot">SURGE</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Predictions */}
      <div className="card col-4">
        <div className="card-head">
          <Icon name="ai" size={14} style={{ color: "var(--cyan)" }} />
          <span className="card-title">AI Predictions · <span className="accent">+15min</span></span>
        </div>
        <div className="card-body">
          {[
            { z: "E1 Premium",    risk: 0.92, msg: "Will reach 100% in 6 min · open overflow",         sev: "crit" },
            { z: "Gate 2",        risk: 0.74, msg: "Lane 3 bottleneck forming · stage 2 staff",         sev: "warn" },
            { z: "C1 Concourse",  risk: 0.68, msg: "Vendor wait will spike 11→18m · suggest reroute",   sev: "warn" },
            { z: "N2 Upper",      risk: 0.31, msg: "Recovery expected · monitor heat exposure",          sev: "info" },
          ].map((p, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--line-1)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 99, background: p.sev === "crit" ? "var(--crit)" : p.sev === "warn" ? "var(--warn)" : "var(--cyan)" }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{p.z}</span>
                </div>
                <span className="mono" style={{ fontSize: 13, color: p.sev === "crit" ? "var(--crit)" : p.sev === "warn" ? "var(--warn)" : "var(--cyan)" }}>{Math.round(p.risk * 100)}%</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4, paddingLeft: 14 }}>{p.msg}</div>
              <div style={{ paddingLeft: 14, marginTop: 6 }}><Bar value={p.risk} kind={p.sev === "crit" ? "crit" : p.sev === "warn" ? "warn" : ""} /></div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone table */}
      <div className="card col-7">
        <div className="card-head">
          <Pill kind="live">Live</Pill>
          <span className="card-title">Zone Status · 14 zones</span>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Zone</th>
              <th>Capacity</th>
              <th>Load</th>
              <th>5min trend</th>
              <th>Flow</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {D.zones.map(z => (
              <tr key={z.id} style={{ background: selectedZone?.id === z.id ? "rgba(0,229,255,0.04)" : "transparent" }}>
                <td><span className="mono">{z.id}</span> <span style={{ color: "var(--ink-2)" }}>{z.name}</span></td>
                <td className="mono">{z.cap.toLocaleString()}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 60 }}><Bar value={z.load} kind={z.load > 0.9 ? "crit" : z.load > 0.75 ? "warn" : "ok"} /></div>
                    <span className="mono" style={{ fontSize: 11, color: z.load > 0.9 ? "var(--crit)" : z.load > 0.75 ? "var(--warn)" : "var(--ok)" }}>{Math.round(z.load * 100)}%</span>
                  </div>
                </td>
                <td className="mono" style={{ color: z.trend.startsWith("-") ? "var(--ok)" : "var(--warn)", fontSize: 11 }}>{z.trend}</td>
                <td className="mono" style={{ fontSize: 11 }}>{z.flow}</td>
                <td>
                  {z.alert ? (
                    <span className={`pill ${z.alert === "surge" ? "crit" : "warn"}`}><span className="dot" />{z.alert}</span>
                  ) : (
                    <span className="pill ok"><span className="dot" />normal</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Incidents */}
      <div className="card col-5">
        <div className="card-head">
          <Icon name="warn" size={14} style={{ color: "var(--warn)" }} />
          <span className="card-title">Active Incidents</span>
          <div className="grow" />
          <Pill kind="crit">1 critical</Pill>
        </div>
        <div>
          {D.incidents.map((inc, i) => (
            <div key={inc.id} style={{ padding: "12px 16px", borderBottom: i < D.incidents.length - 1 ? "1px solid var(--line-1)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 10, flex: 1 }}>
                  <div style={{ width: 3, borderRadius: 99, background: inc.sev === "crit" ? "var(--crit)" : inc.sev === "warn" ? "var(--warn)" : "var(--cyan)", alignSelf: "stretch" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span className="mono" style={{ fontSize: 10, color: "var(--ink-4)" }}>{inc.id}</span>
                      <span className="mono" style={{ fontSize: 10, color: "var(--ink-4)" }}>·</span>
                      <span className="mono" style={{ fontSize: 10, color: "var(--ink-4)" }}>{inc.t}</span>
                      <span className="mono" style={{ fontSize: 10, color: inc.sev === "crit" ? "var(--crit)" : inc.sev === "warn" ? "var(--warn)" : "var(--cyan)" }}>{inc.zone}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 4, lineHeight: 1.4 }}>{inc.msg}</div>
                  </div>
                </div>
                <button className="btn ghost" style={{ height: 26, padding: "0 8px", fontSize: 11, marginLeft: 8 }}>Ack</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gate status */}
      <div className="card col-6">
        <div className="card-head">
          <span className="card-title">Gate Status</span>
        </div>
        <table className="tbl">
          <thead>
            <tr><th>Gate</th><th>Load</th><th>Wait</th><th>Status</th></tr>
          </thead>
          <tbody>
            {D.gates.map(g => (
              <tr key={g.id}>
                <td><span className="mono" style={{ color: "var(--ink-1)" }}>{g.name}</span></td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 60 }}><Bar value={g.load} kind={g.load > 0.8 ? "crit" : g.load > 0.6 ? "warn" : "ok"} /></div>
                    <span className="mono" style={{ fontSize: 11 }}>{Math.round(g.load * 100)}%</span>
                  </div>
                </td>
                <td className="mono" style={{ color: parseInt(g.wait) >= 8 ? "var(--crit)" : parseInt(g.wait) >= 4 ? "var(--warn)" : "var(--ok)" }}>{g.wait}</td>
                <td>
                  {g.alert
                    ? <span className="pill warn"><span className="dot" />alert</span>
                    : <span className="pill ok"><span className="dot" />open</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Revenue */}
      <div className="card col-6">
        <div className="card-head">
          <Icon name="graph" size={14} style={{ color: "var(--cyan)" }} />
          <span className="card-title">Vendor Revenue · Live</span>
        </div>
        <div>
          {D.vendors.map((v, i) => (
            <div key={v.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: i < D.vendors.length - 1 ? "1px solid var(--line-1)" : "none" }}>
              <div style={{ width: 28, fontSize: 10, color: "var(--ink-4)", fontFamily: "var(--font-mono)" }}>{v.zone}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{v.name}</div>
                <div style={{ marginTop: 4 }}><Bar value={v.load} kind={v.load > 0.85 ? "crit" : v.load > 0.65 ? "warn" : "ok"} /></div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="mono" style={{ fontSize: 12, fontWeight: 600 }}>₹{(v.revenue / 1000).toFixed(0)}k</div>
                <div className="annot">{v.wait}m wait</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
