import { useState } from 'react';
import { CIQ_DATA } from '../../../data/crowdiq';
import { Pill } from '../../../components/Common';
import Icon from '../../../components/Icon';
import ScreenHeader from '../ScreenHeader';

const OrderTracking = ({ state, vendor, cart, go, reset }) => {
  const steps = [
    { k: "placed", label: "Order placed", t: "now" },
    { k: "preparing", label: "Preparing", t: "+2m" },
    { k: "ready", label: "On the way to seat", t: "+7m" },
  ];
  const idx = steps.findIndex(s => s.k === state);
  const total = cart.reduce((s, c) => s + c.qty * c.price, 0);
  return (
    <div className="fade-in">
      <ScreenHeader title="Order #4821" sub={`${vendor.name} · ₹${total}`} go={go} />
      <div style={{ padding: "4px 20px 14px" }}>
        <div style={{ background: "var(--bg-2)", border: "1px solid var(--line-1)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", width: 140, height: 140 }}>
            <svg viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="var(--line-1)" strokeWidth="2" />
              <circle cx="70" cy="70" r="60" fill="none" stroke="var(--cyan)" strokeWidth="2"
                strokeDasharray={`${(idx + 1) / steps.length * 377} 377`}
                strokeLinecap="round" transform="rotate(-90 70 70)">
                <animate attributeName="stroke-dasharray" from="0 377" to={`${(idx + 1) / steps.length * 377} 377`} dur="0.6s" fill="freeze" />
              </circle>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div className="mono" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1 }}>
                  {state === "ready" ? "0" : state === "preparing" ? "4" : "7"}
                </div>
                <div className="annot" style={{ marginTop: 6 }}>MIN AWAY</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24, width: "100%" }}>
            {steps.map((s, i) => (
              <div key={s.k} style={{ display: "grid", gridTemplateColumns: "24px 1fr auto", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: i < steps.length - 1 ? "1px solid var(--line-1)" : "none" }}>
                <div style={{ width: 18, height: 18, borderRadius: 99, background: i <= idx ? "var(--cyan)" : "transparent", border: `1.5px solid ${i <= idx ? "var(--cyan)" : "var(--line-2)"}`, display: "grid", placeItems: "center" }}>
                  {i < idx && <Icon name="check" size={11} style={{ color: "#001016" }} />}
                  {i === idx && <div className="live-dot" style={{ background: "#001016", boxShadow: "none" }} />}
                </div>
                <div style={{ fontSize: 13, fontWeight: i === idx ? 600 : 400, color: i <= idx ? "var(--ink-1)" : "var(--ink-3)" }}>
                  {s.label}
                </div>
                <div className="annot">{s.t}</div>
              </div>
            ))}
          </div>
        </div>

        {state === "ready" && (
          <div style={{ marginTop: 12, padding: 14, background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.30)", borderRadius: 12, display: "flex", gap: 12, alignItems: "center" }}>
            <Icon name="user" size={16} style={{ color: "var(--cyan)" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Runner Sahil is at row 11</div>
              <div className="annot" style={{ marginTop: 2 }}>ARRIVING IN 30 SECONDS · TAP TO WAVE</div>
            </div>
          </div>
        )}

        <button className="btn ghost mt-3" style={{ width: "100%" }} onClick={reset}>← Back to menu</button>
      </div>
    </div>
  );
};

const FanFood = ({ go }) => {
  const D = CIQ_DATA;
  const [cart, setCart] = useState([...D.cart]);
  const [order, setOrder] = useState(null);
  const [vendor, setVendor] = useState(D.vendors[1]);
  const cartTotal = cart.reduce((s, c) => s + c.qty * c.price, 0);

  const place = () => {
    setOrder("placed");
    setTimeout(() => setOrder("preparing"), 1400);
    setTimeout(() => setOrder("ready"), 4400);
  };

  if (order) return <OrderTracking state={order} vendor={vendor} cart={cart} go={go} reset={() => setOrder(null)} />;

  return (
    <div className="fade-in">
      <ScreenHeader title="Order from seat" sub="E2 · Row 12 · delivered or pickup" go={go} />

      <div className="annot" style={{ padding: "0 24px 6px" }}>NEAREST · SORTED BY WAIT</div>
      <div style={{ padding: "0 14px 12px", display: "flex", gap: 8, overflowX: "auto" }}>
        {D.vendors.slice(0, 5).map(v => (
          <button key={v.id} onClick={() => setVendor(v)} style={{
            flex: "0 0 160px", padding: 12,
            background: vendor.id === v.id ? "rgba(0,229,255,0.06)" : "var(--bg-2)",
            border: `1px solid ${vendor.id === v.id ? "rgba(0,229,255,0.30)" : "var(--line-1)"}`,
            borderRadius: 12, textAlign: "left", cursor: "pointer", color: "var(--ink-1)"
          }}>
            <div style={{ height: 60, borderRadius: 8, marginBottom: 10, background: "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(0,0,0,0.4))", display: "grid", placeItems: "center", border: "1px solid var(--line-1)" }}>
              <Icon name="food" size={22} style={{ color: vendor.id === v.id ? "var(--cyan)" : "var(--ink-3)" }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{v.name}</div>
            <div style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 2, lineHeight: 1.3 }}>{v.items}</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--cyan)" }}>{v.zone}</span>
              <span className="mono" style={{ fontSize: 11, color: v.wait >= 10 ? "var(--crit)" : v.wait >= 5 ? "var(--warn)" : "var(--ok)" }}>{v.wait}m</span>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: "0 14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 6px" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{vendor.name}</div>
            <div className="annot">{vendor.zone} · {vendor.wait} min wait</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Pill>Pickup</Pill>
            <Pill kind="live">Seat Drop</Pill>
          </div>
        </div>

        {cart.map(c => (
          <div key={c.id} style={{ display: "grid", gridTemplateColumns: "40px 1fr auto auto", gap: 12, alignItems: "center", padding: "12px 12px", border: "1px solid var(--line-1)", borderRadius: 12, marginBottom: 8, background: "var(--bg-2)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg,#1a3a44,#0a0c10)", border: "1px solid var(--line-2)" }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>₹{c.price}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", background: "var(--bg-3)", borderRadius: 99, border: "1px solid var(--line-2)" }}>
              <button onClick={() => setCart(cart.map(x => x.id === c.id ? { ...x, qty: Math.max(0, x.qty - 1) } : x))}
                style={{ width: 22, height: 22, borderRadius: 99, border: 0, background: "transparent", color: "var(--ink-2)", cursor: "pointer" }}>−</button>
              <span className="mono" style={{ width: 14, textAlign: "center", fontSize: 12 }}>{c.qty}</span>
              <button onClick={() => setCart(cart.map(x => x.id === c.id ? { ...x, qty: x.qty + 1 } : x))}
                style={{ width: 22, height: 22, borderRadius: 99, border: 0, background: "transparent", color: "var(--cyan)", cursor: "pointer" }}>+</button>
            </div>
            <div className="mono" style={{ fontSize: 13, fontWeight: 600, minWidth: 48, textAlign: "right" }}>₹{c.price * c.qty}</div>
          </div>
        ))}

        <div style={{ marginTop: 6, padding: "10px 12px", background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.18)", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="ai" size={14} style={{ color: "var(--cyan)" }} />
          <div style={{ fontSize: 11, color: "var(--ink-2)", flex: 1 }}>
            <b style={{ color: "var(--ink-1)" }}>You usually add chai</b> after the innings break.
          </div>
          <button className="btn ghost" style={{ height: 26, padding: "0 10px", fontSize: 11 }}>+ Chai ₹60</button>
        </div>
      </div>

      <div style={{ padding: 14, position: "sticky", bottom: 0, background: "linear-gradient(180deg, transparent, #050608 30%)", marginTop: 8 }}>
        <div style={{ background: "var(--bg-3)", border: "1px solid var(--line-2)", borderRadius: 14, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div className="annot">TOTAL · {cart.length} ITEMS</div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 600 }}>₹{cartTotal}</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn" style={{ flex: 1 }}>Pickup at C2</button>
            <button className="btn primary" style={{ flex: 2 }} onClick={place}>Deliver to seat · 9 min</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanFood;
