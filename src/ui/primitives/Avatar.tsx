interface AvatarProps {
  name?: string;
  size?: number;
  color?: string;
}

export const Avatar = ({ name = "?", size = 34, color = "#2563EB" }: AvatarProps) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `linear-gradient(135deg,${color},${color}88)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.38,
      fontWeight: 900,
      color: "#fff",
      flexShrink: 0,
      fontFamily: "'DM Sans',sans-serif",
    }}
  >
    {(name || "?")[0].toUpperCase()}
  </div>
);

interface AvatarStackProps {
  members?: Array<{ name: string; color?: string }>;
  max?: number;
}

export const AvatarStack = ({ members = [], max = 4 }: AvatarStackProps) => (
  <div style={{ display: "flex" }}>
    {members.slice(0, max).map((m, i) => (
      <div
        key={i}
        title={m.name}
        style={{
          marginLeft: i === 0 ? 0 : -9,
          border: "2.5px solid #fff",
          borderRadius: "50%",
          zIndex: max - i,
        }}
      >
        <Avatar name={m.name} size={28} color={m.color || "#2563EB"} />
      </div>
    ))}
    {members.length > max && (
      <div
        style={{
          marginLeft: -9,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#E2E8F0",
          border: "2.5px solid #fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 9,
          fontWeight: 700,
          color: "#64748B",
        }}
      >
        +{members.length - max}
      </div>
    )}
  </div>
);
