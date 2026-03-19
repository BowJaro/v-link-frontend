import React, { useState } from "react";
import { Badge } from "./Badge";
import { ProgressBar } from "./ProgressBar";
import { Btn } from "./Btn";

interface Milestone {
  id: string;
  title: string;
  stage: "Research" | "Prototype" | "Testing" | "Pilot" | "Commercialization";
  done: boolean;
  current?: boolean;
  date: string;
  pct: number;
  desc: string;
}

interface MilestoneCardProps {
  ms: Milestone;
  isLast: boolean;
  isOwner?: boolean;
  onComplete?: () => void;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ ms, isLast, isOwner, onComplete }) => {
  const [expanded, setExpanded] = useState(ms.current || false);
  const stageColor = {
    Research: "#7C3AED",
    Prototype: "#2563EB",
    Testing: "#D97706",
    Pilot: "#10B981",
    Commercialization: "#0891B2",
  } as const;
  const sc = stageColor[ms.stage] || "#94A3B8";

  return (
    <div style={{ display: "flex", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: ms.done ? "#2563EB" : ms.current ? "#F59E0B" : "#F1F5F9",
            border: `2.5px solid ${ms.done ? "#2563EB" : ms.current ? "#F59E0B" : "#CBD5E1"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {ms.done && (
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 900 }}>✓</span>
          )}
          {ms.current && !ms.done && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#fff" }} />}
        </div>
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 18,
              background: ms.done ? "#BFDBFE" : "#E2E8F0",
              margin: "3px 0",
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 16 }}>
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            cursor: "pointer",
            background: expanded ? "#F8FAFF" : "transparent",
            borderRadius: 10,
            padding: "10px 14px",
            border: expanded ? "1px solid #BFDBFE" : "1px solid transparent",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
                <Badge text={ms.stage} color={sc} sm />
                <Badge
                  text={ms.done ? "Done" : ms.current ? "In Progress" : "Upcoming"}
                  color={ms.done ? "#10B981" : ms.current ? "#F59E0B" : "#94A3B8"}
                  sm
                />
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: ms.done ? "#1E293B" : ms.current ? "#D97706" : "#94A3B8",
                  fontFamily: "'Syne',sans-serif",
                }}
              >
                {ms.title}
              </div>
            </div>
            <div style={{ textAlign: "right", marginLeft: 12, flexShrink: 0 }}>
              <div style={{ fontSize: 11, color: "#94A3B8", fontFamily: "'DM Sans',sans-serif" }}>{ms.date}</div>
              {ms.pct > 0 && (
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: ms.done ? "#10B981" : ms.current ? "#D97706" : "#94A3B8",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  {ms.pct}%
                </div>
              )}
            </div>
          </div>
          {ms.pct > 0 && ms.pct < 100 && (
            <ProgressBar value={ms.pct} color={ms.current ? "#F59E0B" : "#E2E8F0"} h={4} />
          )}
        </div>
        {expanded && (
          <div
            style={{
              background: "#F8FAFF",
              borderRadius: 10,
              padding: 14,
              border: "1px solid #BFDBFE",
              marginBottom: 8,
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#64748B",
                lineHeight: 1.7,
                margin: "0 0 10px",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {ms.desc}
            </p>
            {isOwner && ms.current && (
              <div style={{ marginTop: 10 }}>
                <Btn size="sm" variant="success" onClick={onComplete}>
                  ✓ Mark Complete
                </Btn>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
