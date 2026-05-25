import { useState, useEffect } from 'react';
import Icon from '../../../components/Icon';
import ScreenHeader from '../ScreenHeader';

const FanSOS = ({ go }) => {
  const [stage, setStage] = useState("idle");
  const [type, setType] = useState(null);
  const [hold, setHold] = useState(0);

  useEffect(() => {
    if (stage !== "confirming") return;
    const t = setInterval(() => setHold(h => h + 4), 40);
    return () => clearInterval(t);
  }, [stage]);

  useEffect(() => {
    if (hold >= 100) { setStage("dispatched"); setHold(0); }
  }, [hold]);

  const reset = () => { setStage("idle"); setType(null); setHold(0); };

  if (stage === "dispatched") {
    return (
      <div className="fade-in" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(43,227,139,0.10), transparent 60%)" }}>
        <ScreenHeader title="Help is on the way" sub="Stay where you are. We'll guide you." go={go} />
        <div style={{ padding: "4px 20px 20px" }}>
          <div style={{ background: "linear-gradient(180deg, rgba(43,227,139,0.08), var(--bg-2))", border: "1px solid rgba(43,227,139,0.30)", borderRadius: 18, padding: 24, textAlign: "center" }}>
            <div style={{ width: 72, height: 72, margin: "0 auto", borderRadius: 99, background: "rgba(43,227,139,0.10)", border: "2px solid var(--ok)", display: "grid", placeItems: "center" }}>
              <Icon name="check" size={32} style={{ color: "var(--ok)" }} />
            </div>
            <div style={{ marginTop: 18, fontSize: 18, fontWeight: 600 }}>
              {type === "medical" ? "Medical responder dispatched" : type === "security" ? "Security en route" : "Help dispatched"}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
              Incident ID <span className="mono">INC-209</span> · {type === "medical" ? "Dr. Iyer" : "Officer Khan"} en route
            </div>
            <div className="mono" style={{ fontSize: 42, fontWeight: 600, marginTop: 18, color: "var(--cyan)" }}>01:24</div>
            <div className="annot">ESTIMATED ARRIVAL</div>
          </div>

          <div style={{ marginTop: 14, padding: 14, border: "1px solid var(--line-1)", borderRadius: 14, background: "var(--bg-2)", display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 42, height: 42, borderRadius: 99, background: "rgba(0,229,255,0.10)", border: "1px solid rgba(0,229,255,0.30)", display: "grid", placeItems: "center" }}>
              <Icon name={type === "medical" ? "medical" : "shield"} size={18} style={{ color: "var(--cyan)" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{type === "medical" ? "Dr. Iyer · Medical" : "Officer Khan · Security"}</div>
              <div className="annot" style={{ marginTop: 2 }}>EN-ROUTE · 40m · STAIR W-2</div>
            </div>
            <button style={{ width: 36, height: 36, borderRadius: 99, border: "1px solid var(--line-2)", background: "transparent", color: "var(--ink-1)", cursor: "pointer", display: "grid", placeItems: "center" }}>
              <Icon name="phone" size={14} />
            </button>
          </div>

          <button className="btn ghost mt-4" style={{ width: "100%" }} onClick={reset}>Cancel request</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,59,92,0.10), transparent 60%)" }}>
      <ScreenHeader title="Emergency assist" sub="Tap-and-hold to confirm" go={go} />

      <div style={{ padding: "4px 20px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            ["medical", "medical", "Medical", "var(--crit)"],
            ["security", "shield", "Security", "var(--warn)"],
            ["lost", "compass", "I'm lost", "var(--cyan)"],
            ["fire", "fire", "Fire / Smoke", "var(--crit)"],
          ].map(([k, ic, l, col]) => (
            <button key={k} onClick={() => { setType(k); setStage("confirming"); setHold(0); }} style={{
              padding: "22px 16px", borderRadius: 14,
              background: type === k && stage === "confirming" ? `${col.replace("var(--", "rgba(").replace(")", ",0.13)")}` : "var(--bg-2)",
              border: `1px solid ${type === k && stage === "confirming" ? col : "var(--line-1)"}`,
              color: "var(--ink-1)", cursor: "pointer", textAlign: "left",
              display: "flex", flexDirection: "column", gap: 10
            }}>
              <Icon name={ic} size={26} style={{ color: col }} />
              <div style={{ fontSize: 14, fontWeight: 600 }}>{l}</div>
              <div className="annot" style={{ color: col, opacity: 0.7 }}>{k.toUpperCase()}</div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
          <button
            onMouseDown={() => { if (stage === "idle") { setType("medical"); setStage("confirming"); setHold(0); } }}
            onMouseUp={() => { if (stage === "confirming") { setStage("idle"); setHold(0); } }}
            onMouseLeave={() => { if (stage === "confirming") { setStage("idle"); setHold(0); } }}
            style={{
              width: 200, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, #ff5a78 0%, #ff3b5c 50%, #b30024 100%)",
              border: "3px solid rgba(255,255,255,0.18)",
              boxShadow: "0 0 0 6px rgba(255,59,92,0.18), 0 0 60px rgba(255,59,92,0.45)",
              color: "#fff", cursor: "pointer", position: "relative", overflow: "hidden"
            }}>
            <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }}>
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="3"
                strokeDasharray={`${hold * 2.89} 289`} transform="rotate(-90 50 50)" />
            </svg>
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "0.16em" }}>SOS</div>
              <div className="annot" style={{ color: "rgba(255,255,255,0.9)", marginTop: 4 }}>HOLD TO SEND</div>
            </div>
          </button>
        </div>

        <div style={{ marginTop: 18, padding: "12px 14px", border: "1px solid var(--line-1)", background: "var(--bg-2)", borderRadius: 12 }}>
          <div className="annot">YOUR LOCATION · BROADCAST ON DISPATCH</div>
          <div style={{ fontSize: 13, marginTop: 4, fontWeight: 500 }}>Section E2 · Row 12 · Seat 7</div>
          <div className="annot" style={{ marginTop: 2 }}>BLE BEACON LOCK · 1.4m ACCURACY</div>
        </div>

        <div style={{ marginTop: 10, padding: "12px 14px", border: "1px solid var(--line-1)", background: "var(--bg-2)", borderRadius: 12, display: "flex", gap: 10, alignItems: "center" }}>
          <Icon name="info" size={14} style={{ color: "var(--ink-3)" }} />
          <div style={{ fontSize: 11, color: "var(--ink-3)", flex: 1 }}>
            Tapping SOS shares your live location with stadium medical and ops. AI detects crowd surge automatically.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanSOS;
