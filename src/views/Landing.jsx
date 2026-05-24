import Icon from '../components/Icon';
import { Pill, LiveDot } from '../components/Common';

const Landing = ({ go }) => {
  return (
    <div className="landing" style={{ overflowY: "auto" }}>
      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid var(--line-1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="brand-mark" />
          <div>
            <div className="brand-name">Crowd<em>IQ</em></div>
            <div className="brand-sub">Smart Stadium Platform</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Pill kind="live"><span className="dot" />Live Demo</Pill>
          <button className="btn" onClick={() => go("fan")}>Fan App</button>
          <button className="btn primary" onClick={() => go("ops")}>Command Center</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", padding: "100px 40px 80px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.12), transparent 60%)" }} />
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

        {/* Stadium SVG bg */}
        <svg viewBox="0 0 800 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }}>
          <ellipse cx="400" cy="200" rx="380" ry="180" fill="none" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="4 4" />
          <ellipse cx="400" cy="200" rx="260" ry="120" fill="none" stroke="var(--cyan)" strokeWidth="0.8" />
          <ellipse cx="400" cy="200" rx="140" ry="60" fill="rgba(0,229,255,0.2)" stroke="var(--cyan)" strokeWidth="0.6" />
        </svg>

        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, border: "1px solid rgba(0,229,255,0.30)", background: "rgba(0,229,255,0.06)", marginBottom: 24 }}>
            <LiveDot />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--cyan)", letterSpacing: ".12em" }}>MATCH LIVE · OVER 12.4 · MUM 118/3</span>
          </div>

          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 auto 20px", maxWidth: 800 }}>
            The intelligent stadium<br />
            <span style={{ color: "var(--cyan)" }}>experience platform</span>
          </h1>

          <p style={{ fontSize: 18, color: "var(--ink-3)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Real-time crowd intelligence, AI-powered navigation, and seamless operations for 50k+ attendees.
            Built for IPL, concerts, and world-class venues.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn primary" style={{ height: 48, padding: "0 28px", fontSize: 15 }} onClick={() => go("fan")}>
              <Icon name="phone" size={16} /> Open Fan App
            </button>
            <button className="btn" style={{ height: 48, padding: "0 28px", fontSize: 15 }} onClick={() => go("ops")}>
              <Icon name="graph" size={16} /> Command Center
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: "flex", borderTop: "1px solid var(--line-1)", borderBottom: "1px solid var(--line-1)" }}>
        {[
          ["47,820", "People inside right now"],
          ["52,400", "Total stadium capacity"],
          ["<50ms", "AI response latency"],
          ["28", "CV cameras live"],
          ["212", "IoT sensors active"],
          ["1.4m", "BLE beacon accuracy"],
        ].map(([v, l], i) => (
          <div key={i} style={{ flex: 1, padding: "24px 20px", borderRight: i < 5 ? "1px solid var(--line-1)" : "none", textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: i === 0 ? "var(--cyan)" : "var(--ink-1)" }}>{v}</div>
            <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 4, fontFamily: "var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Feature grid */}
      <div style={{ padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="annot" style={{ color: "var(--cyan)" }}>PLATFORM FEATURES</div>
          <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 12 }}>Everything in one place</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { icon: "stadium", title: "Live Crowd Heatmap", desc: "Real-time density visualization with AI congestion prediction, zone occupancy, and surge detection across 14 zones.", color: "var(--cyan)" },
            { icon: "nav", title: "Smart Indoor Navigation", desc: "GPS-accurate indoor routing with fastest, least crowded, and accessible path options. Toggle AR view with BLE beacon lock.", color: "var(--cyan)" },
            { icon: "queue", title: "AI Queue Management", desc: "Live wait time predictions per vendor. Smart alternative suggestions. Dynamic rerouting to balance concourse traffic.", color: "var(--warn)" },
            { icon: "food", title: "Seat-Side Food Ordering", desc: "Order from 8+ vendors directly to your seat. Live order tracking, AI recommendations, and runner GPS.", color: "var(--ok)" },
            { icon: "friends", title: "Friend Tracking", desc: "Real-time group map with ETAs. Smart meet-up point suggestions based on density and proximity.", color: "var(--cyan)" },
            { icon: "sos", title: "Emergency SOS", desc: "One-tap SOS with auto-broadcast BLE location to medical and security teams. <90s response target.", color: "var(--crit)" },
            { icon: "ai", title: "AI Copilot", desc: "On-device conversational assistant with full stadium context awareness. Voice-enabled, personalized to your seat.", color: "var(--cyan)" },
            { icon: "graph", title: "Command Center", desc: "Mission-control dashboard for organizers. AI predictions, incident management, staff coordination, vendor analytics.", color: "var(--cyan)" },
            { icon: "shield", title: "Security Operations", desc: "CV-augmented security console with 28 camera feeds, drone monitoring, and real-time threat detection.", color: "var(--warn)" },
          ].map((f, i) => (
            <div key={i} style={{ padding: 24, background: "var(--bg-2)", border: "1px solid var(--line-1)", borderRadius: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${f.color === "var(--cyan)" ? "rgba(0,229,255,0.08)" : f.color === "var(--warn)" ? "rgba(255,184,0,0.08)" : f.color === "var(--ok)" ? "rgba(43,227,139,0.08)" : "rgba(255,59,92,0.08)"}`, border: `1px solid ${f.color === "var(--cyan)" ? "rgba(0,229,255,0.20)" : f.color === "var(--warn)" ? "rgba(255,184,0,0.20)" : f.color === "var(--ok)" ? "rgba(43,227,139,0.20)" : "rgba(255,59,92,0.20)"}`, display: "grid", placeItems: "center", color: f.color, marginBottom: 16 }}>
                <Icon name={f.icon} size={20} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "80px 40px", textAlign: "center", borderTop: "1px solid var(--line-1)", background: "linear-gradient(180deg, transparent, rgba(0,229,255,0.03))" }}>
        <div className="annot" style={{ color: "var(--cyan)" }}>EXPERIENCE IT NOW</div>
        <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 12 }}>
          Explore the full prototype
        </h2>
        <p style={{ fontSize: 15, color: "var(--ink-3)", marginTop: 12, maxWidth: 500, margin: "12px auto 32px" }}>
          11 fan screens · Admin command center · Security ops · Vendor management · Staff coordination · Medical dispatch
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            ["fan", "phone", "Fan Experience", "11 screens"],
            ["ops", "graph", "Command Center", "Admin view"],
            ["security", "shield", "Security Console", "CV-augmented"],
            ["vendor", "food", "Vendor Mgmt", "F&B analytics"],
          ].map(([k, ic, l, sub]) => (
            <button key={k} onClick={() => go(k)} style={{ padding: "14px 20px", background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 12, color: "var(--ink-1)", cursor: "pointer", textAlign: "left", minWidth: 160 }}>
              <Icon name={ic} size={18} style={{ color: "var(--cyan)", marginBottom: 8, display: "block" }} />
              <div style={{ fontSize: 14, fontWeight: 600 }}>{l}</div>
              <div className="annot" style={{ marginTop: 2 }}>{sub}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
