import React from "react";

interface TagProps {
  text: string;
  color?: string;
}

export const Tag: React.FC<TagProps> = ({ text, color }) => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 600,
      padding: "3px 9px",
      borderRadius: 6,
      background: color ? `${color}14` : "#F1F5F9",
      color: color || "#64748B",
      border: `1px solid ${color ? color + "25" : "#E2E8F0"}`,
      fontFamily: "'DM Sans',sans-serif",
    }}
  >
    {text}
  </span>
);
