import { CIQ_DATA } from '../../data/crowdiq';
import { Pill, Bar, Sparkline } from '../../components/Common';
import Icon from '../../components/Icon';

const VendorView = () => {
  const D = CIQ_DATA;
  const totalRevenue = D.vendors.reduce((s, v) => s + v.revenue, 0);

  return (
    <div className="dash">
      <div className="col-3 metric">
        <div className="lbl">Total Revenue</div>
        <div className="val cyan">₹{(totalRevenue / 1000).toFixed(0)}<span style={{ fontSize: 18, color: "var(--ink-3)" }}>k</span></div>
        <div className="delta up">↑ ₹43k / 15 min</div>
        <Sparkline seed="revenue" color="var(--cyan)" height={28} />
      </div>
      <div className="col-3 metric">
        <div className="lbl">Avg Wait Time</div>
        <div className="val warn">6.4<span style={{ fontSize: 18, color: "var(--ink-3)" }}>min</span></div>
        <div className="delta down">↓ AI rerouted 12% traffic</div>
      </div>
      <div className="col-3 metric">
        <div className="lbl">Critical Vendors</div>
        <div className="val crit">2</div>
        <div className="delta">Wraps · Cold Drinks overloaded</div>
      </div>
      <div className="col-3 metric">
        <div className="lbl">Active Counters</div>
        <div className="val">{D.vendors.length}</div>
        <div className="delta up">All 8 operational</div>
      </div>

      {/* Vendor grid */}
      <div className="card col-12">
        <div className="card-head">
          <Pill kind="live">Live</Pill>
          <span className="card-title">Vendor Performance Dashboard</span>
          <div className="grow" />
          <Icon name="filter" size={14} style={{ color: "var(--ink-3)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {D.vendors.map((v, i) => (
            <div key={v.id} style={{ padding: "20px", borderRight: (i + 1) % 4 !== 0 ? "1px solid var(--line-1)" : "none", borderBottom: i < 4 ? "1px solid var(--line-1)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="annot">{v.zone}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{v.name}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{v.items}</div>
                </div>
                <div className={`pill ${v.load > 0.85 ? "crit" : v.load > 0.65 ? "warn" : "ok"}`}>
                  <span className="dot" />{Math.round(v.load * 100)}%
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span className="annot">QUEUE LOAD</span>
                  <span className="annot">{v.wait}m wait</span>
                </div>
                <Bar value={v.load} kind={v.load > 0.85 ? "crit" : v.load > 0.65 ? "warn" : "ok"} />
              </div>

              <div style={{ marginTop: 14 }}>
                <Sparkline seed={v.id} color={v.load > 0.85 ? "var(--crit)" : v.load > 0.65 ? "var(--warn)" : "var(--ok)"} height={32} />
              </div>

              <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="annot">REVENUE</span>
                <span className="mono" style={{ fontSize: 16, fontWeight: 600 }}>₹{(v.revenue / 1000).toFixed(0)}k</span>
              </div>

              {v.load > 0.85 && (
                <div style={{ marginTop: 10, padding: "8px 10px", background: "rgba(255,59,92,0.06)", border: "1px solid rgba(255,59,92,0.20)", borderRadius: 8, fontSize: 11, color: "var(--crit)" }}>
                  ⚠ Overloaded — AI suggests rerouting nearby traffic
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Queue analytics */}
      <div className="card col-6">
        <div className="card-head">
          <Icon name="queue" size={14} style={{ color: "var(--cyan)" }} />
          <span className="card-title">Queue Analytics · Real-time</span>
        </div>
        <table className="tbl">
          <thead>
            <tr><th>Counter</th><th>Zone</th><th>Wait</th><th>Trend</th><th>AI Suggestion</th></tr>
          </thead>
          <tbody>
            {D.queues.map(q => (
              <tr key={q.id}>
                <td style={{ fontWeight: 500 }}>{q.name}</td>
                <td className="annot">—</td>
                <td className="mono" style={{ color: q.wait >= 10 ? "var(--crit)" : q.wait >= 5 ? "var(--warn)" : "var(--ok)" }}>{q.wait}m</td>
                <td className="annot" style={{ color: q.trend === "up" ? "var(--crit)" : q.trend === "down" ? "var(--ok)" : "var(--ink-3)" }}>
                  {q.trend === "up" ? "↑" : q.trend === "down" ? "↓" : "→"}
                </td>
                <td style={{ fontSize: 11, color: "var(--cyan)" }}>{q.alt || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Concourse bars */}
      <div className="card col-6">
        <div className="card-head">
          <span className="card-title">Concourse Load Distribution</span>
        </div>
        <div className="card-body">
          {D.zones.filter(z => z.id.startsWith("C")).map((z, i) => (
            <div key={z.id} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{z.name}</span>
                <span className="mono" style={{ fontSize: 13, color: z.load > 0.85 ? "var(--crit)" : z.load > 0.65 ? "var(--warn)" : "var(--ok)" }}>
                  {Math.round(z.load * 100)}%
                </span>
              </div>
              <Bar value={z.load} kind={z.load > 0.85 ? "crit" : z.load > 0.65 ? "warn" : "ok"} />
              <div className="annot" style={{ marginTop: 4 }}>Trend: {z.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorView;
