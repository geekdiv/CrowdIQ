import { useState } from 'react';
import { seededRand } from '../../../components/Common';
import Icon from '../../../components/Icon';
import ScreenHeader from '../ScreenHeader';

const NFCorb = ({ scanning, admitted }) => (
  <div style={{ width: 140, height: 140, position: "relative" }}>
    <svg viewBox="0 0 140 140">
      <defs>
        <radialGradient id="nfc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={admitted ? "var(--ok)" : "var(--cyan)"} stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="70" r="60" fill="url(#nfc)" />
      {[24, 38, 52].map((r, i) => (
        <circle key={i} cx="70" cy="70" r={r} fill="none"
          stroke={admitted ? "var(--ok)" : "var(--cyan)"}
          strokeWidth="1" opacity={admitted ? 0.6 : 0.4}>
          {scanning && <animate attributeName="r" values={`${r};${r + 8};${r}`} dur="1.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />}
          {scanning && <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />}
        </circle>
      ))}
      <g transform="translate(54,54)">
        <rect width="32" height="32" rx="4" fill="rgba(0,0,0,0.6)" stroke={admitted ? "var(--ok)" : "var(--cyan)"} strokeWidth="0.5" />
        {[[0, 0], [24, 0], [0, 24]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x + 2},${y + 2})`}>
            <rect width="6" height="6" fill="none" stroke={admitted ? "var(--ok)" : "var(--cyan)"} strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill={admitted ? "var(--ok)" : "var(--cyan)"} />
          </g>
        ))}
        {Array.from({ length: 18 }).map((_, i) => {
          const r = seededRand("qr" + i)();
          if (r < 0.55) return null;
          const x = 10 + (i % 6) * 3;
          const y = 12 + Math.floor(i / 6) * 3;
          return <rect key={i} x={x} y={y} width="2" height="2" fill={admitted ? "var(--ok)" : "var(--cyan)"} />;
        })}
      </g>
    </svg>
    {admitted && (
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", animation: "fadeUp .3s ease-out" }}>
        <div style={{ width: 48, height: 48, borderRadius: 99, background: "var(--ok)", display: "grid", placeItems: "center" }}>
          <Icon name="check" size={26} style={{ color: "#001a12" }} />
        </div>
      </div>
    )}
  </div>
);

const FanTicket = ({ go }) => {
  const [scanning, setScanning] = useState(false);
  const [admitted, setAdmitted] = useState(false);

  const scan = () => {
    setScanning(true);
    setTimeout(() => { setScanning(false); setAdmitted(true); }, 2200);
  };

  return (
    <div className="fade-in">
      <ScreenHeader title="Your ticket" sub="NFC-secured · single use" go={go} />

      <div style={{ padding: "4px 14px" }}>
        <div style={{
          position: "relative", borderRadius: 20, padding: "22px 22px",
          background: `linear-gradient(180deg, rgba(0,229,255,0.06), rgba(0,0,0,0.0) 60%), linear-gradient(180deg, #0c1218, #0a0c10)`,
          border: "1px solid var(--line-2)", overflow: "hidden"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="annot" style={{ color: "var(--cyan)" }}>● MATCH PASS · LIVE</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>#A-204821</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 18 }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>MUM</div>
              <div className="annot">MUMBAI</div>
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-4)" }}>vs</div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>RR</div>
              <div className="annot">RAJASTHAN</div>
            </div>
          </div>

          <div className="rule mt-4" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 18 }}>
            <div><div className="annot">DATE</div><div style={{ fontSize: 13, fontWeight: 600 }}>12 May</div></div>
            <div><div className="annot">TIME</div><div style={{ fontSize: 13, fontWeight: 600 }}>19:30</div></div>
            <div><div className="annot">GATE</div><div style={{ fontSize: 13, fontWeight: 600, color: "var(--cyan)" }}>04</div></div>
          </div>
          <div className="rule mt-4" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 18 }}>
            <div><div className="annot">SECTION</div><div style={{ fontSize: 13, fontWeight: 600 }}>E2</div></div>
            <div><div className="annot">ROW</div><div style={{ fontSize: 13, fontWeight: 600 }}>12</div></div>
            <div><div className="annot">SEAT</div><div style={{ fontSize: 13, fontWeight: 600 }}>07</div></div>
          </div>

          <div style={{ marginTop: 24, padding: 20, border: "1px dashed var(--line-2)", borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, background: "rgba(0,229,255,0.02)" }}>
            <NFCorb scanning={scanning} admitted={admitted} />
            <div style={{ textAlign: "center" }}>
              <div className="mono" style={{ fontSize: 11, color: admitted ? "var(--ok)" : "var(--cyan)", letterSpacing: ".14em" }}>
                {admitted ? "● ADMITTED" : scanning ? "● SCANNING" : "● TAP TO REVEAL"}
              </div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>
                {admitted ? "Welcome, Aarav. Aisle to your seat lit blue." : "NFC · Face-ID · Beacon paired"}
              </div>
            </div>
            <button className={`btn ${admitted ? "" : "primary"}`} style={{ width: "100%" }}
              onClick={admitted ? () => { setAdmitted(false); setScanning(false); } : scan}>
              {admitted ? "Reset demo" : scanning ? "Hold steady…" : "Tap to enter Gate 4"}
            </button>
          </div>

          <div style={{ position: "absolute", left: -8, top: 160, width: 16, height: 16, borderRadius: 99, background: "var(--bg-0)" }} />
          <div style={{ position: "absolute", right: -8, top: 160, width: 16, height: 16, borderRadius: 99, background: "var(--bg-0)" }} />
        </div>

        <div style={{ marginTop: 14, padding: 14, background: "linear-gradient(135deg, rgba(0,229,255,0.06), rgba(0,229,255,0.02))", border: "1px solid rgba(0,229,255,0.20)", borderRadius: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="annot" style={{ color: "var(--cyan)" }}>● AI UPGRADE AVAILABLE</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>Move to West Premium · seat W2 · 18</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>Closer to action · ₹1,200 today only</div>
            </div>
            <button className="btn" style={{ height: 32, padding: "0 12px" }}>Upgrade</button>
          </div>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
};

export default FanTicket;
