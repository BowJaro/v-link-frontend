import React, { useState } from "react";
import type { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  hover?: boolean;
  accent?: string;
}

export const Card: React.FC<CardProps> = ({ children, style = {}, onClick, hover = true, accent }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${hov && hover ? "#BFDBFE" : "#E8EDFB"}`,
        boxShadow:
          hov && hover
            ? "0 10px 36px rgba(37,99,235,0.12)"
            : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "all 0.2s",
        transform: hov && hover ? "translateY(-2px)" : "none",
        cursor: onClick ? "pointer" : "default",
        ...(accent ? { borderLeft: `4px solid ${accent}` } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
