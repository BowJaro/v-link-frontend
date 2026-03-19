import React from "react";

interface AvatarProps {
  name?: string;
  size?: number;
  color?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name = "?", size = 34, color = "#2563EB" }) => (
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
