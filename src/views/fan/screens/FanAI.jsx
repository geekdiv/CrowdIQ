import { useState } from 'react';
import { Pill } from '../../../components/Common';
import Icon from '../../../components/Icon';
import ScreenHeader from '../ScreenHeader';

const FanAI = ({ go }) => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi Aarav — I'm watching the stadium for you. What's up?", time: "now" },
    { role: "u", text: "Where can I get biryani with the shortest wait?", time: "19:47" },
    { role: "ai", text: "Cricket Curry Co. at C2 — 7 min wait, 80m from your seat. I can pre-order so it's ready when you arrive.", time: "19:47", chips: ["Order biryani", "Show route", "Try another"] },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const send = (t) => {
    if (!t.trim()) return;
    setMessages(m => [...m, { role: "u", text: t, time: "now" }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { role: "ai", text: "I rerouted you around the East Premium surge — your new ETA to seat is 5 min. Tap to view.", time: "now", chips: ["Show route", "Hold", "Cancel"] }]);
    }, 700);
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ScreenHeader title="CrowdIQ Copilot" sub="On-device · personalized to your seat" go={go} />
      <div style={{ padding: "4px 20px 8px", display: "flex", gap: 6 }}>
        <Pill kind="live">Listening</Pill>
        <Pill>AI · v4.2</Pill>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 4px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "u" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            <div style={{
              maxWidth: "82%", padding: "10px 12px",
              borderRadius: m.role === "u" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: m.role === "u" ? "rgba(0,229,255,0.10)" : "var(--bg-2)",
              border: `1px solid ${m.role === "u" ? "rgba(0,229,255,0.30)" : "var(--line-1)"}`
            }}>
              {m.role === "ai" && (
                <div className="annot" style={{ color: "var(--cyan)", marginBottom: 4 }}>● COPILOT</div>
              )}
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>{m.text}</div>
              {m.chips && (
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {m.chips.map(c => (
                    <button key={c} onClick={() => send(c)} style={{
                      padding: "6px 10px", borderRadius: 99, background: "transparent", border: "1px solid var(--line-2)",
                      color: "var(--ink-2)", fontSize: 11, cursor: "pointer", fontFamily: "var(--font-mono)", letterSpacing: ".04em"
                    }}>{c}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "4px 16px 8px", display: "flex", gap: 6, overflowX: "auto" }}>
        {["What's the wait for chai?", "Avoid crowds", "Meet at gate", "Bathroom near me"].map(s => (
          <button key={s} onClick={() => send(s)} style={{
            whiteSpace: "nowrap", padding: "7px 10px", borderRadius: 99,
            background: "var(--bg-2)", border: "1px solid var(--line-2)",
            color: "var(--ink-2)", fontSize: 11, cursor: "pointer"
          }}>{s}</button>
        ))}
      </div>

      <div style={{ padding: "8px 14px 16px", display: "flex", gap: 8 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", border: "1px solid var(--line-2)", borderRadius: 99, background: "var(--bg-2)" }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") send(input); }}
            placeholder="Ask anything about the stadium…"
            style={{ flex: 1, background: "transparent", border: 0, outline: 0, color: "var(--ink-1)", fontSize: 13 }} />
        </div>
        <button onClick={() => setListening(!listening)} style={{
          width: 40, height: 40, borderRadius: 99, cursor: "pointer",
          background: listening ? "var(--cyan)" : "var(--bg-2)",
          color: listening ? "#001016" : "var(--ink-2)",
          display: "grid", placeItems: "center", border: "1px solid var(--line-2)"
        }}>
          <Icon name="mic" size={16} />
        </button>
      </div>
    </div>
  );
};

export default FanAI;
