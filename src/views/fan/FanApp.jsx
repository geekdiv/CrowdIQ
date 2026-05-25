import { useState, useEffect } from 'react';
import Icon from '../../components/Icon';
import FanHome from './screens/FanHome';
import FanNav from './screens/FanNav';
import FanQueue from './screens/FanQueue';
import FanFood from './screens/FanFood';
import FanFriends from './screens/FanFriends';
import FanNotifications from './screens/FanNotifications';
import FanSOS from './screens/FanSOS';
import FanAI from './screens/FanAI';
import FanParking from './screens/FanParking';
import FanDiscovery from './screens/FanDiscovery';
import FanTicket from './screens/FanTicket';

const ScreenRender = ({ screen, setScreen }) => {
  const go = setScreen;
  switch (screen) {
    case "home":          return <FanHome go={go} />;
    case "discovery":     return <FanDiscovery go={go} />;
    case "ticket":        return <FanTicket go={go} />;
    case "nav":           return <FanNav go={go} />;
    case "queue":         return <FanQueue go={go} />;
    case "food":          return <FanFood go={go} />;
    case "friends":       return <FanFriends go={go} />;
    case "notifications": return <FanNotifications go={go} />;
    case "sos":           return <FanSOS go={go} />;
    case "ai":            return <FanAI go={go} />;
    case "parking":       return <FanParking go={go} />;
    default:              return <FanHome go={go} />;
  }
};

const screenLabels = {
  home:          "Live Stadium · Home",
  discovery:     "Event Discovery",
  ticket:        "Ticket & NFC Entry",
  nav:           "Indoor Navigation · AR",
  queue:         "Queue Monitoring",
  food:          "Food Ordering",
  friends:       "Friend Tracking",
  notifications: "Notification Center",
  sos:           "Emergency SOS",
  ai:            "AI Copilot",
  parking:       "Smart Parking",
};

const screenDescriptions = {
  home:          "Match home with live heatmap, score, and AI-suggested actions specific to your seat.",
  discovery:     "Pre-event browse: event card, capacity forecast, and match-day timeline.",
  ticket:        "NFC tap-to-enter ticket. AI offers seat upgrades dynamically.",
  nav:           "Indoor wayfinding with fastest, least crowded, and accessible routes. Toggle AR view.",
  queue:         "Live concourse pressure and per-vendor wait times. AI suggests faster alternatives.",
  food:          "Order from any vendor. AI recommends items and delivers to your seat.",
  friends:       "Live group map with eta and smart meet-up points.",
  notifications: "Priority feed: surge alerts, friend movement, milestones.",
  sos:           "Tap-and-hold SOS with auto-routed medical / security response.",
  ai:            "Conversational copilot with on-device voice and stadium context awareness.",
  parking:       "Live IoT lot occupancy with AI-routed approach.",
};

const allScreens = [
  ["discovery", "Discovery", "stadium"],
  ["ticket",    "Ticket",    "ticket"],
  ["home",      "Heatmap",   "home"],
  ["nav",       "Navigate",  "nav"],
  ["queue",     "Queues",    "queue"],
  ["food",      "Food",      "food"],
  ["friends",   "Friends",   "friends"],
  ["notifications", "Updates", "bell"],
  ["sos",       "SOS",       "sos"],
  ["ai",        "Copilot",   "ai"],
  ["parking",   "Parking",   "car"],
];

const FanApp = () => {
  const [screen, setScreen] = useState("home");
  const [now, setNow] = useState("19:53");

  useEffect(() => {
    const t = setInterval(() => {
      const min = 53 + (Math.floor(Date.now() / 4000) % 6);
      setNow(`19:${String(min).padStart(2, "0")}`);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="phone-stage" style={{ paddingTop: 14 }}>
      {/* Left rail — screen picker */}
      <div style={{ width: 200 }}>
        <div className="annot" style={{ paddingLeft: 6, marginBottom: 10 }}>11 SCREENS · TAP TO JUMP</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {allScreens.map(([k, l, ic]) => (
            <button key={k} onClick={() => setScreen(k)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 8,
              background: screen === k ? "rgba(0,229,255,0.08)" : "transparent",
              border: `1px solid ${screen === k ? "rgba(0,229,255,0.30)" : "transparent"}`,
              color: screen === k ? "var(--cyan)" : "var(--ink-2)",
              fontSize: 12, fontWeight: 500, cursor: "pointer", textAlign: "left"
            }}>
              <Icon name={ic} size={14} />
              {l}
            </button>
          ))}
        </div>

        <div className="annot mt-5" style={{ paddingLeft: 6, marginTop: 18, marginBottom: 8 }}>OVERVIEW</div>
        <div style={{ background: "var(--bg-2)", border: "1px solid var(--line-1)", borderRadius: 10, padding: 12, fontSize: 11, color: "var(--ink-3)", lineHeight: 1.55 }}>
          The full match-day app for attendees. Wayfinding, queue intelligence, food ordering,
          friend coordination, AI copilot, and emergency response — all powered by live BLE,
          CV, and crowd analytics.
        </div>
      </div>

      {/* Phone frame */}
      <div className="phone">
        <div className="phone-status">
          <span>{now}</span>
          <span className="right">
            <Icon name="signal" size={11} />
            <Icon name="wifi" size={11} />
            <span className="mono" style={{ fontSize: 10 }}>78%</span>
            <Icon name="battery" size={14} />
          </span>
        </div>
        <div className="phone-body" key={screen}>
          <ScreenRender screen={screen} setScreen={setScreen} />
        </div>
        <div className="phone-tabbar">
          {[
            ["home", "Live", "home"],
            ["nav", "Map", "nav"],
            ["food", "Order", "food"],
            ["friends", "Group", "friends"],
            ["ai", "Copilot", "ai"],
          ].map(([k, l, ic]) => (
            <button key={k} onClick={() => setScreen(k)} className={screen === k ? "on" : ""}>
              <Icon name={ic} size={18} />
              <span>{l}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right info column */}
      <div style={{ width: 220 }}>
        <div className="annot" style={{ paddingLeft: 6, marginBottom: 10 }}>CURRENT SCREEN</div>
        <div style={{ padding: 14, border: "1px solid var(--line-1)", borderRadius: 12, background: "var(--bg-2)" }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{screenLabels[screen]}</div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6 }}>{screenDescriptions[screen]}</div>
        </div>

        <div className="annot mt-4" style={{ marginTop: 18, marginBottom: 8, paddingLeft: 6 }}>DATA FLOW</div>
        <div style={{ padding: 12, border: "1px solid var(--line-1)", borderRadius: 12, background: "var(--bg-2)" }}>
          {[
            ["BLE Beacons", "1.4m"],
            ["CV (28 cams)", "Live"],
            ["IoT sensors", "212"],
            ["Edge AI", "<50ms"],
          ].map(([k, v], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: i < 3 ? "1px solid var(--line-1)" : "none" }}>
              <span className="annot">{k}</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--cyan)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FanApp;
