import type { FC } from "react";
import { Card } from "../../../ui/primitives/Card";
import { SectionTitle } from "../../../ui/layout/PageHeader";

interface TechTabProps {
  ip: any;
}

export const TechTab: FC<TechTabProps> = ({ ip }) => {
  const specs = [
    { l: "Asset Type", v: ip.assetType },
    { l: "Legal Ref", v: ip.legalRef },
    { l: "Stage", v: ip.stage },
    { l: "Field", v: ip.field },
    { l: "Views", v: ip.views?.toLocaleString() },
    { l: "Interests", v: ip.interests },
  ];

  return (
    <Card style={{ padding: 24 }} hover={false}>
      <SectionTitle title="Technology Details" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 10,
          marginBottom: 18,
        }}
      >
        {specs.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#F8FAFC",
              borderRadius: 10,
              padding: "11px 14px",
              border: "1px solid #F1F5F9",
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: "#94A3B8",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                marginBottom: 3,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {s.l}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1E293B",
                fontFamily: "'Syne',sans-serif",
              }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
