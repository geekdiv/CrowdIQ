import { useState } from 'react';
import { Pill } from '../../../components/Common';
import StadiumMap from '../../../components/StadiumMap';
import Icon from '../../../components/Icon';
import ScreenHeader from '../ScreenHeader';

const ARView = () => (
  <div style={{ padding: "14px 14px" }}>
    <div style={{
      height: 380, borderRadius: 16, overflow: "hidden", position: "relative",
      background: `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7)),
        radial-gradient(ellipse at 50% 30%, #1a3a44 0%, #0a0c10 60%, #050608 100%)`,
      border: "1px solid var(--line-2)"
    }}>
      <svg viewBox="0 0 340 380" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <line key={"l" + i} x1={20 - i * 60} y1={380} x2={170} y2={180} stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />
        ))}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <line key={"r" + i} x1={320 + i * 60} y1={380} x2={170} y2={180} stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />
        ))}
        {[0, 1, 2, 3, 4].map(i => {
          const y = 360 - i * 40;
          const w = 80 - i * 14;
          return (
            <path key={i}
              d={`M ${170 - w / 2} ${y} L 170 ${y - 14} L ${170 + w / 2} ${y} L 170 ${y - 6} Z`}
              fill="var(--cyan)" opacity={1 - i * 0.18}>
              <animate attributeName="opacity" values="0;1;0" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </path>
          );
        })}
        <g transform="translate(170,180)">
          <circle r="22" fill="none" stroke="var(--cyan)" strokeWidth="1" opacity="0.5" />
          <circle r="14" fill="rgba(0,229,255,0.10)" stroke="var(--cyan)" strokeWidth="1" />
          <text textAnchor="middle" y="-26" fill="var(--cyan)"
            style={{ font: "600 11px var(--font-mono)", letterSpacing: ".08em" }}>SEAT E2 · R12 · S7</text>
          <text textAnchor="middle" y="4" fill="var(--ink-1)"
            style={{ font: "600 12px var(--font-mono)" }}>72m</text>
        </g>
      </svg>
      <div style={{ position: "absolute", left: 14, top: 14, display: "flex", gap: 6 }}>
        <Pill kind="live">AR · Beacon Lock</Pill>
      </div>
      <div style={{ position: "absolute", right: 14, top: 14 }}>
        <Pill>BLE · 4 anchors</Pill>
      </div>
      <div style={{
        position: "absolute", left: 14, right: 14, bottom: 14,
        background: "rgba(8,9,12,0.85)", backdropFilter: "blur(12px)",
        border: "1px solid var(--line-2)", borderRadius: 12, padding: "12px 14px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <div className="annot">NEXT</div>
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>Continue 30m, then turn right</div>
        </div>
        <Icon name="arrow-up" size={20} style={{ color: "var(--cyan)" }} />
      </div>
    </div>

    <div className="mt-3" style={{ display: "flex", gap: 8, padding: "6px 4px" }}>
      {[["DISTANCE", "72 m"], ["HEADING", "NE · 32°"], ["ETA", "4m"]].map(([k, v], i) => (
        <div key={i} style={{ flex: 1, padding: "10px 12px", border: "1px solid var(--line-1)", borderRadius: 10, background: "var(--bg-2)" }}>
          <div className="annot">{k}</div>
          <div className="mono" style={{ fontSize: 18, fontWeight: 600, color: i === 2 ? "var(--cyan)" : "var(--ink-1)" }}>{v}</div>
        </div>
      ))}
    </div>
  </div>
);

const FanNav = ({ go }) => {
  const [view, setView] = useState("route");
  const [routeMode, setRouteMode] = useState("least");

  const routes = {
    fastest:    { time: "4 min", path: "M 60 110 Q 130 130, 230 100 T 360 90", congestion: "Heavy" },
    least:      { time: "6 min", path: "M 60 110 Q 130 60, 220 70 T 360 90",  congestion: "Light"  },
    accessible: { time: "8 min", path: "M 60 110 L 130 160 L 230 150 L 360 90", congestion: "Smooth" },
  };
  const route = routes[routeMode];

  return (
    <div className="fade-in">
      <ScreenHeader title="Wayfinding" sub="To Seat E2 · Row 12 · Seat 7" go={go} />

      <div style={{ padding: "4px 20px 10px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
          background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 12
        }}>
          <Icon name="search" size={14} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-4)", letterSpacing: ".10em" }}>FROM · YOUR LOCATION</div>
            <div style={{ fontSize: 13, marginTop: 2 }}>Gate 2 · Concourse Level</div>
          </div>
          <div className="kbd">⇄</div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginTop: 6, padding: "10px 12px",
          background: "var(--bg-2)", border: "1px solid rgba(0,229,255,0.30)", borderRadius: 12
        }}>
          <Icon name="pin" size={14} style={{ color: "var(--cyan)" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--cyan)", letterSpacing: ".10em" }}>TO · YOUR SEAT</div>
            <div style={{ fontSize: 13, marginTop: 2 }}>Section E2 · Row 12 · Seat 7</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 14px" }}>
        <div style={{ display: "flex", padding: 3, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 99 }}>
          {[["route", "Map"], ["ar", "AR View"]].map(([k, l]) => (
            <button key={k} onClick={() => setView(k)} style={{
              flex: 1, padding: "7px 0", border: 0, borderRadius: 99, cursor: "pointer",
              background: view === k ? "rgba(0,229,255,0.12)" : "transparent",
              color: view === k ? "var(--cyan)" : "var(--ink-3)",
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase"
            }}>{l}</button>
          ))}
        </div>
      </div>

      {view === "route" && (
        <div style={{ padding: "14px 14px 0" }}>
          <div style={{ background: "#08090c", border: "1px solid var(--line-1)", borderRadius: 16, padding: "10px 8px", position: "relative" }}>
            <StadiumMap width={340} height={170} showHeat showRoute
              routeDots={{ path: route.path, from: [60, 110], to: [360, 90] }} highlightZone="E2" />
            <div style={{ position: "absolute", left: 14, top: 14, display: "flex", gap: 6 }}>
              <Pill kind="live">Live</Pill>
              <Pill>ETA · {route.time}</Pill>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="annot" style={{ padding: "0 6px 8px" }}>ROUTE OPTIONS</div>
            {[
              ["fastest", "Fastest path", "4 min", "Heavy crowd", "var(--warn)"],
              ["least", "Least crowded", "6 min", "Recommended", "var(--cyan)"],
              ["accessible", "Step-free / accessible", "8 min", "Smooth", "var(--ok)"],
            ].map(([k, name, time, sub, col]) => (
              <button key={k} onClick={() => setRouteMode(k)} style={{
                width: "100%", textAlign: "left",
                display: "grid", gridTemplateColumns: "32px 1fr auto", gap: 12, padding: "12px 12px",
                background: routeMode === k ? "rgba(0,229,255,0.05)" : "var(--bg-2)",
                border: `1px solid ${routeMode === k ? "rgba(0,229,255,0.30)" : "var(--line-1)"}`,
                borderRadius: 12, marginBottom: 8, color: "var(--ink-1)", cursor: "pointer"
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(0,229,255,0.06)", border: "1px solid var(--line-2)", display: "grid", placeItems: "center" }}>
                  <Icon name={k === "accessible" ? "compass" : k === "fastest" ? "lightning" : "shield"} size={14} style={{ color: col }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{name}</div>
                  <div style={{ fontSize: 11, color: col, marginTop: 2 }}>{sub}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 600 }}>{time}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="annot" style={{ padding: "6px 6px 8px" }}>TURN-BY-TURN</div>
          {[
            ["Exit Concourse N", "Towards East stair"],
            ["Take Stair E-3 up", "1 flight"],
            ["Pass Premium Lounge", "Avoid surge zone E1"],
            ["Arrive at E2 · R12 · S7", "Your seat"],
          ].map(([n, s], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 12, padding: "10px 6px", borderBottom: "1px solid var(--line-1)" }}>
              <div className="mono" style={{ color: "var(--cyan)", fontSize: 11 }}>0{i + 1}</div>
              <div>
                <div style={{ fontSize: 13 }}>{n}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "ar" && <ARView />}
      <div style={{ height: 24 }} />
    </div>
  );
};

export default FanNav;
