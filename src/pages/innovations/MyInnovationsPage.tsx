import type { FC } from "react";

// UI Components
import { Card } from "../../ui/primitives/Card";
import { Badge } from "../../ui/primitives/Badge";
import { Btn } from "../../ui/primitives/Button";
import { PageHeader } from "../../ui/layout/PageHeader";
import { TRLBadge } from "../../components/ip/TRLBadge";
import { StatusBadge } from "../../components/StatusBadge";

// Data & Constants
import { IP_DATA, PROJECTS } from "../../config/mockData";
import { CAT_COLORS } from "../../config/constants";

interface MyInnovationsPageProps {
  setPage: (page: string) => void;
}

export const MyInnovationsPage: FC<MyInnovationsPageProps> = ({ setPage }) => (
  <div>
    <PageHeader
      title="My Innovations"
      action={() => setPage("create-ip")}
      actionLabel="+ Create IP"
      actionColor="#2563EB"
      actionIcon="+"
    />
    {IP_DATA.filter((i) => i.innovatorId === "u1").map((ip) => (
      <Card
        key={ip.id}
        style={{ padding: 20, marginBottom: 12 }}
        hover={false}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                gap: 7,
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              <Badge
                text={ip.field}
                color={CAT_COLORS[ip.field as keyof typeof CAT_COLORS] || "#2563EB"}
              />
              <TRLBadge level={ip.trl} />
              <StatusBadge
                status={PROJECTS.find((p) => p.ipId === ip.id) ? "active" : ip.status}
              />
            </div>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1E293B",
                margin: "0 0 4px",
                fontFamily: "'Syne',sans-serif",
              }}
            >
              {ip.title}
            </h3>
            <p
              style={{
                fontSize: 12,
                color: "#64748B",
                margin: "0 0 8px",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {ip.desc}
            </p>
          </div>
          <Btn
            size="sm"
            color="#2563EB"
            onClick={() => setPage("ip-" + ip.id)}
          >
            View
          </Btn>
        </div>
      </Card>
    ))}
  </div>
);
