import { TRL_COLORS, TRL_LABELS } from "../../config/constants";

interface TRLBadgeProps {
  level: number;
  showLabel?: boolean;
}

export const TRLBadge = ({ level, showLabel }: TRLBadgeProps) => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 800,
      padding: "3px 10px",
      borderRadius: 20,
      background: TRL_COLORS[level as keyof typeof TRL_COLORS] || "#94A3B8",
      color: "#fff",
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
    }}
  >
    <span>TRL {level}</span>
    {showLabel && (
      <span style={{ fontWeight: 500, opacity: 0.85 }}>
        · {TRL_LABELS[level as keyof typeof TRL_LABELS]}
      </span>
    )}
  </span>
);

interface TRLMeterProps {
  level: number;
}

export const TRLMeter = ({ level }: TRLMeterProps) => (
  <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
    {[...Array(9)].map((_, i) => (
      <div
        key={i}
        style={{
          width: 14,
          height: 5,
          borderRadius: 2,
          background: i < level ? TRL_COLORS[level as keyof typeof TRL_COLORS] : "#E2E8F0",
        }}
      />
    ))}
    <span style={{ fontSize: 10, color: "#94A3B8", marginLeft: 5, fontFamily: "'DM Sans',sans-serif" }}>
      TRL {level}/9
    </span>
  </div>
);
