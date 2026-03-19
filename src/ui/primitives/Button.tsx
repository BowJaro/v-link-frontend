import { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "danger" | "success" | "soft";
  color?: string;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  full?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const Btn = ({
  children,
  onClick,
  variant = "primary",
  color,
  size = "md",
  icon,
  full,
  disabled,
  style: s = {},
}: ButtonProps) => {
  const [hov, setHov] = useState(false);
  const c = color || "#2563EB";
  const sz = {
    sm: { padding: "6px 14px", fontSize: 11 },
    md: { padding: "9px 20px", fontSize: 13 },
    lg: { padding: "13px 28px", fontSize: 14 },
  };

  const base = {
    borderRadius: 10,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "2px solid transparent",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    transition: "all 0.18s",
    fontFamily: "'DM Sans',sans-serif",
    width: full ? "100%" : "auto",
    justifyContent: full ? "center" : "flex-start",
    opacity: disabled ? 0.5 : 1,
    ...sz[size],
  };

  const variants = {
    primary: {
      background: hov ? `${c}CC` : c,
      color: "#fff",
      border: `2px solid ${c}`,
      boxShadow: hov ? `0 6px 18px ${c}44` : "none",
    },
    outline: {
      background: hov ? `${c}10` : "transparent",
      color: c,
      border: `2px solid ${c}`,
    },
    ghost: {
      background: hov ? "#F1F5F9" : "transparent",
      color: "#64748B",
      border: "2px solid transparent",
    },
    danger: {
      background: hov ? "#DC2626" : "#EF4444",
      color: "#fff",
      border: "2px solid #EF4444",
    },
    success: {
      background: hov ? "#059669" : "#10B981",
      color: "#fff",
      border: "2px solid #10B981",
    },
    soft: {
      background: hov ? `${c}22` : `${c}12`,
      color: c,
      border: `2px solid ${c}22`,
    },
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...base, ...variants[variant], ...s } as React.CSSProperties}
    >
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      {children}
    </button>
  );
};
