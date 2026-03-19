import React, { useState } from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Tag } from "./Tag";
import { Avatar } from "./Avatar";
import { Btn } from "./Btn";

interface ChronicleEntryData {
  id: string;
  type: string;
  title: string;
  body: string;
  author: string;
  authorColor?: string;
  date: string;
  tags?: string[];
  attachments?: string[];
}

interface ChronicleEntryProps {
  entry: ChronicleEntryData;
  canEdit?: boolean;
  onDelete?: (id: string) => void;
}

const NEWS_TYPE_COLORS: { [key: string]: string } = {
  update: "#2563EB",
  research: "#7C3AED",
  funding: "#10B981",
  milestone: "#D97706",
  announcement: "#0891B2",
  general: "#94A3B8",
};

export const ChronicleEntry: React.FC<ChronicleEntryProps> = ({ entry, canEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(true);
  const tc = NEWS_TYPE_COLORS[entry.type] || "#94A3B8";

  return (
    <Card style={{ padding: 0, overflow: "hidden" }} hover={false} accent={tc}>
      <div style={{ padding: "18px 22px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
            <Badge text={entry.type} color={tc} />
            {entry.tags?.map((t, i) => (
              <Tag key={i} text={t} color={tc} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 7, alignItems: "center", flexShrink: 0, marginLeft: 10 }}>
            <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: "'DM Sans',sans-serif" }}>{entry.date}</span>
            {canEdit && (
              <Btn size="sm" variant="danger" onClick={() => onDelete?.(entry.id)}>
                ✕
              </Btn>
            )}
          </div>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", margin: "0 0 10px", fontFamily: "'Syne',sans-serif", lineHeight: 1.3 }}>
          {entry.title}
        </h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <Avatar name={entry.author} size={26} color={entry.authorColor || tc} />
          <span style={{ fontSize: 11, color: "#64748B", fontFamily: "'DM Sans',sans-serif" }}>
            <strong>{entry.author}</strong>
          </span>
        </div>
        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, fontFamily: "'DM Sans',sans-serif" }}>
          {expanded ? entry.body : (entry.body || "").slice(0, 200) + "…"}
        </div>
        {(entry.body || "").length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none",
              border: "none",
              color: "#2563EB",
              fontSize: 11,
              cursor: "pointer",
              marginTop: 5,
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 600,
            }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
        {entry.attachments?.length ? (
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #F1F5F9" }}>
            {entry.attachments.map((a, i) => (
              <div
                key={i}
                style={{
                  display: "inline-flex",
                  gap: 6,
                  alignItems: "center",
                  background: "#F8FAFC",
                  borderRadius: 7,
                  padding: "5px 10px",
                  marginRight: 7,
                  fontSize: 11,
                  color: "#2563EB",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                📎 {a}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
};
