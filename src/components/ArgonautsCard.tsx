import React from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Tag } from "./Tag";
import { KokoBtn } from "./KokoBtn";

interface Argonaut {
  id: string;
  title: string;
  org: string;
  field: string;
  status: string;
  fundingCommitment: string;
  teamSize: number;
  desc: string;
  disciplines: string[];
  candidates: Array<{ id: string; status: string }>;
}

interface ArgonautsCardProps {
  arg: Argonaut;
  onClick?: () => void;
}

const ARGONAUTS_STATUS: { [key: string]: { label: string; color: string; icon: string } } = {
  open: { label: "Open", color: "#10B981", icon: "🟢" },
  forming: { label: "Team Forming", color: "#F59E0B", icon: "🟡" },
  launched: { label: "Project Launched", color: "#2563EB", icon: "🚀" },
  closed: { label: "Closed", color: "#94A3B8", icon: "⚫" },
};

const CAT_COLORS: { [key: string]: string } = {
  AgriTech: "#16A34A",
  FinTech: "#2563EB",
  CleanTech: "#0891B2",
  HealthTech: "#DB2777",
  Logistics: "#EA580C",
  EnergyTech: "#CA8A04",
  Manufacturing: "#7C3AED",
  GovTech: "#475569",
  EdTech: "#9333EA",
  BioTech: "#059669",
};

export const ArgonautsCard: React.FC<ArgonautsCardProps> = ({ arg, onClick }) => {
  const sc = ARGONAUTS_STATUS[arg.status] || ARGONAUTS_STATUS.open;
  const approved = arg.candidates.filter((c) => c.status === "approved").length;

  return (
    <Card onClick={onClick} style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}>
      <div style={{ background: "linear-gradient(135deg,#0F172A,#1E3A8A)", padding: "18px 20px 14px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            transform: "translate(30%,-30%)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "3px 10px" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.85)", fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>⚔ ARGONAUTS</span>
          </div>
          <KokoBtn type="argonauts" item={arg} size="sm" />
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: "0 0 5px", fontFamily: "'Syne',sans-serif", lineHeight: 1.3 }}>
          {arg.title}
        </h3>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans',sans-serif" }}>{arg.org}</div>
      </div>
      <div style={{ padding: "14px 20px" }}>
        <div style={{ display: "flex", gap: 7, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Badge text={sc.label} color={sc.color} />
          <Badge text={arg.field} color={CAT_COLORS[arg.field] || "#7C3AED"} />
        </div>
        <p style={{ fontSize: 11, color: "#64748B", lineHeight: 1.6, margin: "0 0 12px", fontFamily: "'DM Sans',sans-serif" }}>
          {arg.desc.slice(0, 110)}…
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { l: "Funding", v: arg.fundingCommitment, c: "#059669" },
            { l: "Team", v: `${approved}/${arg.teamSize}`, c: "#7C3AED" },
            { l: "Applicants", v: arg.candidates.length, c: "#D97706" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#F8FAFC", borderRadius: 9, padding: "8px 10px", textAlign: "center", border: "1px solid #F1F5F9" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: s.c, fontFamily: "'Syne',sans-serif" }}>{s.v}</div>
              <div style={{ fontSize: 8, color: "#94A3B8", fontFamily: "'DM Sans',sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {arg.disciplines.slice(0, 3).map((d, i) => (
            <Tag key={i} text={d} color="#7C3AED" />
          ))}
          {arg.disciplines.length > 3 && <Tag text={`+${arg.disciplines.length - 3} more`} color="#94A3B8" />}
        </div>
      </div>
    </Card>
  );
};
