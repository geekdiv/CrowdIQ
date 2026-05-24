// CrowdIQ — Icon library
// Geometric, minimal, 1.5px stroke, currentColor.

const Icon = ({ name, size = 16, strokeWidth = 1.6, style, className }) => {
  const S = size;
  const P = {
    width: S, height: S, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round",
    style, className
  };

  switch (name) {
    case "home": return <svg {...P}><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-7h-6v7H5a1 1 0 0 1-1-1z"/></svg>;
    case "nav": return <svg {...P}><path d="M3 11l18-8-8 18-2-8z"/></svg>;
    case "ticket": return <svg {...P}><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M12 7v10" strokeDasharray="2 3"/></svg>;
    case "food": return <svg {...P}><path d="M4 11h16M5 11l1 8h12l1-8M9 11V7a3 3 0 1 1 6 0v4"/></svg>;
    case "friends": return <svg {...P}><circle cx="9" cy="9" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="8" r="2.5"/><path d="M15 14a5 5 0 0 1 6 5"/></svg>;
    case "bell": return <svg {...P}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>;
    case "sos": return <svg {...P}><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/></svg>;
    case "ai": return <svg {...P}><path d="M12 3l2.6 5.4L20 11l-5.4 2.6L12 19l-2.6-5.4L4 11l5.4-2.6z"/></svg>;
    case "car": return <svg {...P}><path d="M5 16V11l2-5h10l2 5v5"/><rect x="3" y="14" width="18" height="6" rx="2"/><circle cx="8" cy="20" r="1.5"/><circle cx="16" cy="20" r="1.5"/></svg>;
    case "queue": return <svg {...P}><circle cx="6" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><path d="M11 6h10M11 12h10M11 18h10"/></svg>;
    case "search": return <svg {...P}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.4-4.4"/></svg>;
    case "chevR": return <svg {...P}><path d="M9 6l6 6-6 6"/></svg>;
    case "chevL": return <svg {...P}><path d="M15 6l-6 6 6 6"/></svg>;
    case "chevD": return <svg {...P}><path d="M6 9l6 6 6-6"/></svg>;
    case "plus": return <svg {...P}><path d="M12 5v14M5 12h14"/></svg>;
    case "x": return <svg {...P}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case "check": return <svg {...P}><path d="M5 12l4 4 10-10"/></svg>;
    case "arrow-up": return <svg {...P}><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
    case "arrow-right": return <svg {...P}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case "info": return <svg {...P}><circle cx="12" cy="12" r="9"/><path d="M12 8v.5M12 11v5"/></svg>;
    case "warn": return <svg {...P}><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/></svg>;
    case "shield": return <svg {...P}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/></svg>;
    case "stadium": return <svg {...P}><ellipse cx="12" cy="12" rx="9" ry="5"/><ellipse cx="12" cy="12" rx="5" ry="2.5"/><path d="M3 12c0 3 4 5 9 5s9-2 9-5"/></svg>;
    case "wifi": return <svg {...P}><path d="M3 9a14 14 0 0 1 18 0M6 12a10 10 0 0 1 12 0M9 15a6 6 0 0 1 6 0"/><circle cx="12" cy="18" r=".5" fill="currentColor"/></svg>;
    case "battery": return <svg {...P}><rect x="3" y="8" width="16" height="8" rx="1.5"/><rect x="20" y="10.5" width="1.5" height="3" rx=".5" fill="currentColor"/><rect x="5" y="10" width="10" height="4" rx=".5" fill="currentColor"/></svg>;
    case "signal": return <svg {...P}><rect x="3" y="14" width="3" height="6"/><rect x="8" y="11" width="3" height="9"/><rect x="13" y="8" width="3" height="12"/><rect x="18" y="5" width="3" height="15"/></svg>;
    case "mic": return <svg {...P}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>;
    case "medical": return <svg {...P}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M12 10v5M9.5 12.5h5M8 6V4h8v2"/></svg>;
    case "lightning": return <svg {...P}><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>;
    case "compass": return <svg {...P}><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>;
    case "phone": return <svg {...P}><path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>;
    case "pin": return <svg {...P}><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "user": return <svg {...P}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>;
    case "graph": return <svg {...P}><path d="M3 20h18M5 16l4-4 3 3 7-8"/></svg>;
    case "graph-up": return <svg {...P}><path d="M3 20h18M5 16l4-4 3 3 7-8"/></svg>;
    case "rocket": return <svg {...P}><path d="M5 19l5-2-3-3zM14 6c4 0 6 2 6 6 0 4-2 6-6 6l-5-5c0-4 2-7 5-7z"/><circle cx="14" cy="11" r="1.5"/></svg>;
    case "fire": return <svg {...P}><path d="M12 3s4 4 4 8a4 4 0 1 1-8 0c0-2 2-3 2-5s-1-2 0-3z"/></svg>;
    case "drone": return <svg {...P}><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 8l3 3M16 8l-3 3M8 16l3-3M16 16l-3-3"/><rect x="10" y="10" width="4" height="4" rx="1"/></svg>;
    case "camera": return <svg {...P}><rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="12" cy="12.5" r="3.5"/><path d="M8 6l1.5-2h5L16 6"/></svg>;
    case "broadcast": return <svg {...P}><circle cx="12" cy="12" r="2"/><path d="M8 8a5 5 0 0 0 0 8M16 8a5 5 0 0 1 0 8M5 5a9 9 0 0 0 0 14M19 5a9 9 0 0 1 0 14"/></svg>;
    case "more": return <svg {...P}><circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/></svg>;
    case "filter": return <svg {...P}><path d="M3 5h18l-7 8v5l-4 2v-7z"/></svg>;
    case "weather": return <svg {...P}><path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 20 11a4 4 0 0 1-1 7z"/></svg>;
    case "wrench": return <svg {...P}><path d="M14 6a4 4 0 0 1 5 5l-9 9-4-4 9-9a4 4 0 0 1-1-1z"/></svg>;
    case "clock": return <svg {...P}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "map": return <svg {...P}><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v16M15 6v16"/></svg>;
    default: return <svg {...P}><rect x="4" y="4" width="16" height="16" rx="2"/></svg>;
  }
};

export default Icon;
