import Icon from '../../components/Icon';

const ScreenHeader = ({ title, sub, go }) => (
  <div style={{ padding: "14px 20px 8px", display: "flex", alignItems: "center", gap: 10 }}>
    <button onClick={() => go && go("home")} style={{
      width: 32, height: 32, borderRadius: 8, background: "var(--bg-2)",
      border: "1px solid var(--line-2)", color: "var(--ink-2)", cursor: "pointer",
      display: "grid", placeItems: "center"
    }}>
      <Icon name="chevL" size={16} />
    </button>
    <div>
      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{sub}</div>}
    </div>
  </div>
);

export default ScreenHeader;
