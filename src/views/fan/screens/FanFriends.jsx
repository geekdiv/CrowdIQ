import { CIQ_DATA } from '../../../data/crowdiq';
import { Pill, SectionTitle } from '../../../components/Common';
import StadiumMap from '../../../components/StadiumMap';
import ScreenHeader from '../ScreenHeader';

const FanFriends = ({ go }) => {
  const D = CIQ_DATA;
  return (
    <div className="fade-in">
      <ScreenHeader title="Your group" sub="4 friends · location sharing on" go={go} />

      <div style={{ padding: "4px 14px 0" }}>
        <div style={{ background: "#08090c", border: "1px solid var(--line-1)", borderRadius: 16, padding: "10px 8px", position: "relative" }}>
          <StadiumMap width={340} height={170} showHeat showFriends friends={D.friends} />
          <div style={{ position: "absolute", left: 14, top: 14, display: "flex", gap: 6 }}>
            <Pill kind="live">Sharing for 2h 14m</Pill>
          </div>
        </div>
      </div>

      <SectionTitle action="+ Invite">In stadium</SectionTitle>
      <div style={{ padding: "0 14px" }}>
        {D.friends.map(f => (
          <div key={f.id} style={{ display: "grid", gridTemplateColumns: "36px 1fr auto", gap: 12, alignItems: "center", padding: 12, border: "1px solid var(--line-1)", borderRadius: 12, marginBottom: 8, background: "var(--bg-2)" }}>
            <div style={{ width: 32, height: 32, borderRadius: 99, display: "grid", placeItems: "center", background: f.color + "22", border: `1px solid ${f.color}55`, color: f.color, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600 }}>
              {f.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{f.name}</div>
              <div className="annot" style={{ marginTop: 2 }}>{f.section}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="mono" style={{ fontSize: 11, color: f.eta.includes("with you") ? "var(--ok)" : "var(--cyan)" }}>
                {f.eta.split("·")[0].trim()}
              </div>
              {f.eta.includes("·") && <div className="annot">{f.eta.split("·")[1]}</div>}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Smart meet-up</SectionTitle>
      <div style={{ padding: "0 14px 24px" }}>
        <div style={{ padding: 14, border: "1px solid var(--line-1)", borderRadius: 14, background: "var(--bg-2)" }}>
          <div className="annot">RECOMMENDED · LEAST CROWDED · CLOSEST</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 6 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Concourse C3 · Bay 4</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>Avg arrival 3 min · 32% density</div>
            </div>
            <button className="btn primary" style={{ height: 32, padding: "0 12px" }}>Propose</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanFriends;
