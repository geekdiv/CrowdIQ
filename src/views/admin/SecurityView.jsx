import { useState } from 'react';
import { CIQ_DATA } from '../../data/crowdiq';
import { Pill, Sparkline } from '../../components/Common';
import CameraFeed from '../../components/CameraFeed';

const SecurityView = () => {
  const D = CIQ_DATA;
  const secStaff = D.staff.filter(s => s.role === "Security");
  
  // Define 12 mock cameras for the grid
  const cameras = [
    { id: "CAM-01", zone: "N1", anomaly: false },
    { id: "CAM-02", zone: "N2", anomaly: false },
    { id: "CAM-03", zone: "E1", anomaly: false },
    { id: "CAM-04", zone: "E2", anomaly: true, detail: "EAST PREMIUM" },
    { id: "CAM-05", zone: "E3", anomaly: false },
    { id: "CAM-06", zone: "S1", anomaly: false },
    { id: "CAM-07", zone: "S2", anomaly: false },
    { id: "CAM-08", zone: "W1", anomaly: true, detail: "WEST LOWER" },
    { id: "CAM-09", zone: "W2", anomaly: false },
    { id: "CAM-10", zone: "W3", anomaly: false },
    { id: "CAM-11", zone: "C1", anomaly: false },
    { id: "CAM-12", zone: "C2", anomaly: false },
  ];

  const [selectedCamId, setSelectedCamId] = useState("CAM-04");
  const selectedCam = cameras.find(c => c.id === selectedCamId) || cameras[0];

  return (
    <div className="dash">
      {/* Metrics */}
      <div className="col-3 metric">
        <div className="annot" style={{ color: "var(--ink-4)", letterSpacing: ".05em", marginBottom: 6 }}>ACTIVE THREATS</div>
        <div className="val ok">0</div>
        <div className="delta">No CV anomalies in last 6 min</div>
      </div>
      <div className="col-3 metric" style={{ position: "relative", overflow: "hidden" }}>
        <div className="annot" style={{ color: "var(--ink-4)", letterSpacing: ".05em", marginBottom: 6 }}>BAG CHECK PASS RATE</div>
        <div className="val cyan">98.4<span style={{ fontSize: 18, color: "var(--ink-3)" }}>%</span></div>
        <div className="delta">38 secondary checks</div>
        <div style={{ position: "absolute", bottom: -4, left: 0, right: 0 }}>
          <Sparkline seed="pass" color="var(--cyan)" height={28} />
        </div>
      </div>
      <div className="col-3 metric">
        <div className="annot" style={{ color: "var(--ink-4)", letterSpacing: ".05em", marginBottom: 6 }}>SURGE DETECTIONS</div>
        <div className="val warn">2</div>
        <div className="delta">E1 Premium, G2 lane 3</div>
      </div>
      <div className="col-3 metric">
        <div className="annot" style={{ color: "var(--ink-4)", letterSpacing: ".05em", marginBottom: 6 }}>OFFICERS DEPLOYED</div>
        <div className="val">142<span style={{ fontSize: 18, color: "var(--ink-3)" }}>/156</span></div>
        <div className="delta">14 on standby</div>
      </div>

      {/* CCTV / CV WALL Container */}
      <div className="card col-12" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
          <Pill kind="live">28 CAMERAS</Pill>
          <span style={{ fontWeight: 600, fontSize: 13, letterSpacing: ".05em", color: "var(--ink-1)", marginRight: 16 }}>CCTV / CV WALL</span>
          <Pill>PERSON DETECT</Pill>
          <Pill>ANOMALY</Pill>
          <Pill>CROWD DENSITY</Pill>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
          {/* Left Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {cameras.map(c => (
              <CameraFeed 
                key={c.id} 
                id={c.id} 
                zone={c.zone} 
                anomaly={c.anomaly} 
                selected={selectedCamId === c.id}
                onClick={() => setSelectedCamId(c.id)}
              />
            ))}
          </div>

          {/* Right Detail Panel */}
          <div style={{ background: "linear-gradient(180deg, #0a0c10, #050608)", border: "1px solid var(--line-1)", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
              <Pill kind="live" dot={false}><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 99, background: "var(--cyan)", marginRight: 6 }}/>RECORDING</Pill>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--ink-2)", fontWeight: 600, letterSpacing: ".05em" }}>
                {selectedCam.id} - {selectedCam.detail || selectedCam.zone}
              </div>
            </div>

            <div style={{ position: "relative", marginBottom: 16, borderRadius: 8, overflow: "hidden", border: "1px solid var(--line-2)" }}>
              <CameraFeed 
                id={selectedCam.id} 
                zone={selectedCam.zone} 
                anomaly={selectedCam.anomaly} 
                height={200}
                selected={false}
              />
              {selectedCam.anomaly && (
                <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,59,92,0.15)", border: "1px solid rgba(255,59,92,0.4)", borderRadius: 99, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 99, background: "var(--crit)" }} />
                  <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--crit)", fontWeight: 600 }}>CROWD SURGE</span>
                </div>
              )}
              <div style={{ position: "absolute", top: 16, right: 16, fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-4)" }}>
                19:55:08 · 4K
              </div>
              <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, display: "flex", justifyContent: "space-between" }}>
                 <div style={{ background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: 99, fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-3)", border: "1px solid var(--line-2)" }}>
                   ● DENSITY 96%
                 </div>
                 <div style={{ background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: 99, fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-3)", border: "1px solid var(--line-2)" }}>
                   ● {selectedCam.anomaly ? "284" : "112"} PERSONS
                 </div>
              </div>
            </div>

            <div className="annot" style={{ marginBottom: 12 }}>CV DETECTIONS - 30S</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {[
                { label: "Crowd surge", status: "ACK", color: "var(--crit)" },
                { label: "Unattended bag", status: "FALSE-POS", color: "var(--warn)" },
                { label: "Trip hazard", status: "LOGGED", color: "var(--cyan)" },
              ].map((d, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-1)" }}>
                    <span style={{ display: "inline-block", width: 4, height: 4, borderRadius: 99, background: d.color }} />
                    {d.label}
                  </div>
                  <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-4)" }}>{d.status}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button className="btn primary" style={{ width: "100%", background: "var(--crit)", borderColor: "var(--crit)", color: "#fff" }}>
                Dispatch officers
              </button>
              <button className="btn" style={{ width: "100%" }}>
                Broadcast
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Officer Deployment and Broadcast */}
      <div className="col-12" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="card" style={{ padding: "16px 20px 20px" }}>
           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
             <span className="annot" style={{ letterSpacing: ".05em", color: "var(--ink-2)" }}>OFFICER DEPLOYMENT</span>
             <Pill>156 STAFF</Pill>
           </div>
           {/* Roster table */}
           <table style={{ width: "100%", fontSize: 12, textAlign: "left", color: "var(--ink-3)", borderCollapse: "collapse" }}>
             <thead>
               <tr style={{ color: "var(--ink-4)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                 <th style={{ paddingBottom: 12, fontWeight: 500 }}>ID</th>
                 <th style={{ paddingBottom: 12, fontWeight: 500 }}>OFFICER</th>
                 <th style={{ paddingBottom: 12, fontWeight: 500 }}>ROLE</th>
                 <th style={{ paddingBottom: 12, fontWeight: 500 }}>ZONE</th>
                 <th style={{ paddingBottom: 12, fontWeight: 500 }}>STATUS</th>
               </tr>
             </thead>
             <tbody>
               {secStaff.slice(0, 4).map((s) => (
                 <tr key={s.id} style={{ borderTop: "1px solid var(--line-1)", color: "var(--ink-1)" }}>
                   <td style={{ padding: "12px 0", fontFamily: "var(--font-mono)", color: "var(--cyan)" }}>{s.id}</td>
                   <td>{s.name}</td>
                   <td>{s.role}</td>
                   <td className="annot">{s.zone}</td>
                   <td>
                      <span style={{ color: s.status === "deployed" ? "var(--ok)" : "var(--warn)", fontFamily: "var(--font-mono)", fontSize: 10 }}>
                        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 99, background: s.status === "deployed" ? "var(--ok)" : "var(--warn)", marginRight: 6 }} />
                        {s.status.toUpperCase()}
                      </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

        <div className="card" style={{ padding: "16px 20px 20px" }}>
           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
             <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 99, border: "2px solid var(--cyan)", opacity: 0.8 }} />
             <span className="annot" style={{ letterSpacing: ".05em", color: "var(--ink-2)" }}>MASS BROADCAST</span>
           </div>
           <div className="annot" style={{ marginBottom: 12 }}>AUDIENCE</div>
           <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
             <Pill kind="live">ALL 47.8K ATTENDEES</Pill>
             <Pill>E STAND ONLY</Pill>
             <Pill>STAFF ONLY</Pill>
           </div>
           
           <div className="annot" style={{ marginBottom: 12 }}>MESSAGE OVERRIDE</div>
           <textarea 
             style={{ width: "100%", height: 60, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line-2)", borderRadius: 8, padding: 12, color: "var(--ink-1)", resize: "none", fontSize: 13, fontFamily: "inherit" }}
             placeholder="Type custom emergency broadcast message..."
             defaultValue="Please proceed calmly to the nearest exits. Staff are on hand to assist."
           />
           <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
             <button className="btn primary" style={{ background: "var(--warn)", borderColor: "var(--warn)", color: "#000" }}>
               Send Broadcast
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityView;
