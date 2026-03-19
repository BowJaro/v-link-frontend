import React from "react";

interface BadgeProps {
  text: string;
  color?: string;
  sm?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ text, color = "#2563EB", sm }) => (
  <span
    style={{
      fontSize: sm ? 8.5 : 10,
      fontWeight: 700,
      padding: sm ? "2px 7px" : "3px 10px",
      borderRadius: 20,
      background: `${color}18`,
      color,
      border: `1px solid ${color}2E`,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      display: "inline-block",
      whiteSpace: "nowrap",
      fontFamily: "'DM Sans',sans-serif",
    }}
  >
    {text}
  </span>
);
