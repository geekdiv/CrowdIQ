import { useState, useEffect } from 'react';
import { CIQ_DATA } from './data/crowdiq';
import { LiveDot } from './components/Common';
import Icon from './components/Icon';

import Landing from './views/Landing';
import FanApp from './views/fan/FanApp';
import AdminDashboard from './views/admin/AdminDashboard';
import SecurityView from './views/admin/SecurityView';
import VendorView from './views/admin/VendorView';
import StaffView from './views/admin/StaffView';
import MedicalView from './views/admin/MedicalView';

const HEADERS = {
  fan:      { title: "Fan Experience",      crumb: "MOBILE APP · 11 SCREENS" },
  ops:      { title: "Command Center",       crumb: "EVENT ORGANIZERS · LIVE OPERATIONS" },
  security: { title: "Security Operations",  crumb: "SECURITY TEAM · CV-AUGMENTED" },
  vendor:   { title: "Vendor Management",    crumb: "F&B OPERATIONS · COUNTER LOAD" },
  staff:    { title: "Staff Coordination",   crumb: "OPS LEAD · LIVE ROSTER" },
  medical:  { title: "Medical & Emergency",  crumb: "MEDICAL TEAMS · DISPATCH" },
};

const ViewRouter = ({ view }) => {
  switch (view) {
    case "fan":      return <FanApp />;
    case "ops":      return <AdminDashboard />;
    case "security": return <SecurityView />;
    case "vendor":   return <VendorView />;
    case "staff":    return <StaffView />;
    case "medical":  return <MedicalView />;
    default:         return <FanApp />;
  }
};

const Sidebar = ({ view, go }) => {
  const D = CIQ_DATA;
  const groups = [
    {
      label: "Fan",
      items: [
        ["fan", "Fan Experience", "phone", "11 screens"],
      ],
    },
    {
      label: "Operations",
      items: [
        ["ops",      "Command Center",   "graph",   "live"],
        ["security", "Security Console", "shield",  null],
        ["vendor",   "Vendor Mgmt",      "food",    null],
        ["staff",    "Staff Coord.",     "user",    null],
        ["medical",  "Medical & SOS",    "medical", "1 act"],
      ],
    },
    {
      label: "Platform",
      items: [
        ["landing", "Landing Page", "rocket", null],
      ],
    },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" />
        <div>
          <div className="brand-name">Crowd<em>IQ</em></div>
          <div className="brand-sub">v1.0 · Match Night</div>
        </div>
      </div>

      {groups.map((g, gi) => (
        <div key={gi} className="nav-group">
          <div className="nav-label">{g.label}</div>
          {g.items.map(([k, l, ic, tag]) => (
            <div key={k} className={`nav-item ${view === k ? "active" : ""}`} onClick={() => go(k)}>
              <Icon name={ic} size={15} className="ico" />
              <span>{l}</span>
              {tag && <span className="tag">{tag}</span>}
            </div>
          ))}
        </div>
      ))}

      <div className="sidebar-foot">
        <div className="match-card">
          <div className="row">
            <span className="teams">MUM vs CHE</span>
            <span className="live-badge">LIVE</span>
          </div>
          <div className="row" style={{ marginTop: 6 }}>
            <span className="mono dim" style={{ fontSize: 11 }}>Over 12.4</span>
            <span className="mono" style={{ fontSize: 11 }}>118/3</span>
          </div>
          <div className="row" style={{ marginTop: 6 }}>
            <span className="mono dim" style={{ fontSize: 10 }}>Apex Stadium · 47.8k in</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

const MainHeader = ({ view }) => {
  const D = CIQ_DATA;
  const h = HEADERS[view] || HEADERS.fan;
  return (
    <div className="main-head">
      <div>
        <div className="crumb">{h.crumb}</div>
        <h1>{h.title}</h1>
      </div>
      <div className="grow" />
      <div className="head-stat">
        <span className="lbl">INSIDE</span>
        <span className="val">{D.realtime.inside.toLocaleString()}</span>
      </div>
      <div className="head-stat">
        <span className="lbl">CAPACITY</span>
        <span className="val">{Math.round(D.realtime.inside / D.match.capacity * 100)}%</span>
      </div>
      <div className="head-stat">
        <span className="lbl">INCIDENTS</span>
        <span className="val" style={{ color: "var(--crit)" }}>{D.realtime.incidents}</span>
      </div>
      <div className="head-stat">
        <span className="lbl">SENTIMENT</span>
        <span className="val" style={{ color: "var(--ok)" }}>{Math.round(D.realtime.sentiment * 100)}</span>
      </div>
      <div className="head-stat">
        <span className="lbl">LIVE</span>
        <span className="val live"><LiveDot /> CONNECTED</span>
      </div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState("landing");

  const go = (v) => setView(v);

  if (view === "landing") {
    return <Landing go={go} />;
  }

  return (
    <div className="app">
      <Sidebar view={view} go={go} />
      <main className="main">
        <MainHeader view={view} />
        <ViewRouter view={view} />
      </main>
    </div>
  );
};

export default App;
