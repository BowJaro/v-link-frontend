import React, { useState } from "react";
import { useKoko } from "../context/KokoContext";

interface KokoBtnProps {
  type: "innovations" | "argonauts" | "challenges" | "projects" | "roles";
  item: { id: string; title?: string; role?: string };
  size?: "sm" | "md";
}

export const KokoBtn: React.FC<KokoBtnProps> = ({ type, item, size = "md" }) => {
  const { isKoko, toggleKoko } = useKoko();
  const saved = isKoko(type, item.id);
  const [pop, setPop] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleKoko(type, item);
    setPop(true);
    setTimeout(() => setPop(false), 600);
  };

  const sz = size === "sm" ? 28 : 34;
  const iconSz = size === "sm" ? 13 : 15;

  return (
    <div style={{ position: "relative", display: "inline-flex", flexShrink: 0 }} title={saved ? "Remove from Koko" : "Add to Koko"}>
      <button
        onClick={handleClick}
        style={{
          width: sz,
          height: sz,
          borderRadius: 8,
          background: saved ? "#FEF3C7" : "#F8FAFC",
          border: `1.5px solid ${saved ? "#F59E0B" : "#E2E8F0"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.18s",
          transform: pop ? "scale(1.28)" : "scale(1)",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = saved ? "#D97706" : "#93C5FD";
          (e.currentTarget as HTMLButtonElement).style.background = saved ? "#FDE68A" : "#EFF6FF";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = saved ? "#F59E0B" : "#E2E8F0";
          (e.currentTarget as HTMLButtonElement).style.background = saved ? "#FEF3C7" : "#F8FAFC";
        }}
      >
        <span style={{ fontSize: iconSz, lineHeight: 1 }}>{saved ? "⭐" : "☆"}</span>
      </button>
      {pop && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1E293B",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            whiteSpace: "nowrap",
            padding: "4px 9px",
            borderRadius: 7,
            pointerEvents: "none",
            zIndex: 999,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {saved ? "⭐ Koko'd!" : "Removed"}
        </div>
      )}
    </div>
  );
};
