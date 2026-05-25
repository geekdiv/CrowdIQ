import { useMemo } from 'react';
import { seededRand } from './Common';

const CameraFeed = ({ id, zone, anomaly, selected, onClick, width = "100%", height = 140 }) => {
  // Generate random dots using the camera ID as a seed so they stay consistent
  const { dots, boundingBoxes } = useMemo(() => {
    const r = seededRand(id);
    const numDots = Math.floor(r() * 20) + 15;
    const d = [];
    const boxes = [];
    for (let i = 0; i < numDots; i++) {
      // Create perspective distribution (more dots near the bottom, fewer at top)
      const yNorm = r() * r(); // biased towards bottom (0 is top, 1 is bottom)
      const xNorm = r();
      const x = 10 + xNorm * 280;
      const y = 20 + yNorm * 100;
      d.push({ x, y, size: 1.5 + yNorm * 2 }); // larger at bottom

      // Add bounding box if anomaly and some chance
      if (anomaly && r() > 0.6 && yNorm > 0.4) {
        boxes.push({ x: x - 4, y: y - 6, w: 8, h: 10 });
      }
    }
    return { dots: d, boundingBoxes: boxes };
  }, [id, anomaly]);

  return (
    <div 
      onClick={onClick}
      style={{
        position: "relative",
        background: anomaly && selected 
          ? "radial-gradient(ellipse at center, rgba(255,59,92,0.15) 0%, #050608 100%)" 
          : anomaly
          ? "radial-gradient(ellipse at center, rgba(255,59,92,0.1) 0%, #050608 100%)"
          : "linear-gradient(180deg, #08090c, #050608)",
        border: selected && anomaly
          ? "1px solid var(--crit)"
          : selected 
          ? "1px solid var(--cyan)" 
          : anomaly
          ? "1px solid rgba(255,59,92,0.4)"
          : "1px solid var(--line-1)",
        borderRadius: 12,
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        width,
        height
      }}
    >
      <svg viewBox="0 0 300 140" style={{ width: "100%", height: "100%", display: "block" }}>
        {/* Perspective lines */}
        <g stroke="rgba(0,229,255,0.06)" strokeWidth="1">
          <line x1="0" y1="140" x2="150" y2="40" />
          <line x1="75" y1="140" x2="150" y2="40" />
          <line x1="150" y1="140" x2="150" y2="40" />
          <line x1="225" y1="140" x2="150" y2="40" />
          <line x1="300" y1="140" x2="150" y2="40" />
          
          <path d="M 50 100 L 250 100" />
          <path d="M 90 70 L 210 70" />
          <path d="M 120 50 L 180 50" />
        </g>
        
        {/* Bounding boxes (only when anomaly) */}
        {anomaly && boundingBoxes.map((b, i) => (
          <rect key={`b-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} fill="none" stroke="var(--crit)" strokeWidth="1" strokeDasharray="1 1" />
        ))}
        
        {/* Person Dots */}
        {dots.map((d, i) => (
          <rect key={`d-${i}`} x={d.x - d.size/2} y={d.y - d.size/2} width={d.size} height={d.size} fill={anomaly ? "var(--crit)" : "rgba(255,255,255,0.7)"} />
        ))}
      </svg>
      
      {/* Top Overlay */}
      <div style={{ position: "absolute", top: 10, left: 12, right: 12, display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--cyan)", fontWeight: 600 }}>
          <span style={{ display: "inline-block", width: 4, height: 4, background: "var(--cyan)", marginRight: 6, verticalAlign: "middle" }}/>
          {id}
        </div>
        {anomaly && (
          <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--crit)", fontWeight: 600, letterSpacing: ".05em" }}>SURGE</div>
        )}
      </div>

      {/* Bottom Overlay */}
      <div style={{ position: "absolute", bottom: 10, left: 12, fontSize: 10, color: "var(--ink-4)", fontFamily: "var(--font-mono)" }}>
        {zone}
      </div>
    </div>
  );
};

export default CameraFeed;
