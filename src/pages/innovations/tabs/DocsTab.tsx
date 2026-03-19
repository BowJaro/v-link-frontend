import type { FC } from "react";
import { Card } from "../../../ui/primitives/Card";
import { SectionTitle } from "../../../ui/layout/PageHeader";
import { Btn } from "../../../ui/primitives/Button";

interface DocsTabProps {
  ip: any;
  ndaOk: boolean;
  onRequestAccess: () => void;
}

export const DocsTab: FC<DocsTabProps> = ({ ip, ndaOk, onRequestAccess }) => {
  return (
    <Card style={{ padding: 24 }} hover={false}>
      <SectionTitle title="Documents" />
      {ip.docs.map((d: any, i: number) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "11px 0",
            borderBottom: i < ip.docs.length - 1 ? "1px solid #F1F5F9" : "none",
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: d.confidential ? "#FFF7ED" : "#F0FDF4",
                border: `1px solid ${d.confidential ? "#FDE68A" : "#A7F3D0"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              {d.confidential ? "🔒" : "📄"}
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1E293B",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                {d.name}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#94A3B8",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                {d.type?.toUpperCase()} · {d.size}
              </div>
            </div>
          </div>
          {d.confidential ? (
            ndaOk ? (
              <Btn size="sm" color="#2563EB">
                ↓ Download
              </Btn>
            ) : (
              <Btn size="sm" color="#7C3AED" onClick={onRequestAccess}>
                Request Access
              </Btn>
            )
          ) : (
            <Btn size="sm" color="#10B981">
              ↓ Download
            </Btn>
          )}
        </div>
      ))}
    </Card>
  );
};
