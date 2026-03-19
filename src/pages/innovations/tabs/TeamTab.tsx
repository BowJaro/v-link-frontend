import type { FC } from "react";
import { Card } from "../../../ui/primitives/Card";
import { SectionTitle } from "../../../ui/layout/PageHeader";
import { Avatar } from "../../../ui/primitives/Avatar";
import { CAT_COLORS } from "../../../config/constants";

interface TeamTabProps {
  ip: any;
}

export const TeamTab: FC<TeamTabProps> = ({ ip }) => {
  return (
    <Card style={{ padding: 24 }} hover={false}>
      <SectionTitle title="Research Team" />
      {ip.authors.map((a: any, i: number) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: "13px 0",
            borderBottom:
              i < ip.authors.length - 1 ? "1px solid #F1F5F9" : "none",
          }}
        >
          <Avatar
            name={a.name}
            size={40}
            color={CAT_COLORS[ip.field as keyof typeof CAT_COLORS] || "#2563EB"}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1E293B",
                fontFamily: "'Syne',sans-serif",
              }}
            >
              {a.name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#64748B",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {a.role} · {a.org}
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};
