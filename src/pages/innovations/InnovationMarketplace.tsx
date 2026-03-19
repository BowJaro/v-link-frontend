import type { FC } from "react";
import { useState } from "react";

// UI Components
import { Card } from "../../ui/primitives/Card";
import { Badge } from "../../ui/primitives/Badge";
import { TRLBadge, TRLMeter } from "../../components/ip/TRLBadge";
import { KokoBtn } from "../../components/KokoBtn";
import { PageHeader } from "../../ui/layout/PageHeader";
import { Input } from "../../ui/primitives/Input";
import { Sel } from "../../ui/primitives/Select";
import { Tag } from "../../ui/primitives/Tag";
import { StatusBadge } from "../../components/StatusBadge";

// Data & Constants
import { IP_DATA, PROJECTS } from "../../data/mockData";
import { FIELDS_LIST, CAT_COLORS } from "../../config/constants";

interface InnovationMarketplaceProps {
  setPage: (page: string) => void;
}

export const InnovationMarketplace: FC<InnovationMarketplaceProps> = ({
  setPage,
}) => {
  const [search, setSearch] = useState("");
  const [field, setField] = useState("All");
  const filtered = IP_DATA.filter(
    (i) =>
      i.status !== "draft" &&
      (field === "All" || i.field === field) &&
      (!search || i.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <PageHeader
        title="Innovation Marketplace"
        sub={`${IP_DATA.filter((i) => i.status !== "draft").length} IPs`}
      />
      <Card style={{ padding: 18, marginBottom: 18 }} hover={false}>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 2 }}>
            <Input
              label=""
              value={search}
              onChange={setSearch}
              placeholder="🔍  Search IPs…"
            />
          </div>
          <div style={{ flex: 1 }}>
            <Sel
              label="Field"
              value={field}
              onChange={setField}
              options={["All", ...FIELDS_LIST]}
            />
          </div>
        </div>
      </Card>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
        }}
      >
        {filtered.map((ip) => (
          <Card
            key={ip.id}
            onClick={() => setPage("ip-" + ip.id)}
            style={{ padding: 20, cursor: "pointer" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 8,
              }}
            >
              <Badge
                text={ip.field}
                color={CAT_COLORS[ip.field as keyof typeof CAT_COLORS] || "#2563EB"}
              />
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                }}
              >
                <TRLBadge level={ip.trl} />
                <KokoBtn type="innovations" item={ip} size="sm" />
              </div>
            </div>
            <h3
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1E293B",
                margin: "0 0 5px",
                lineHeight: 1.4,
                fontFamily: "'Syne',sans-serif",
              }}
            >
              {ip.title}
            </h3>
            <p
              style={{
                fontSize: 11,
                color: "#64748B",
                lineHeight: 1.6,
                margin: "0 0 10px",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {ip.desc}
            </p>
            <TRLMeter level={ip.trl} />
            <div
              style={{ height: 1, background: "#F1F5F9", margin: "10px 0" }}
            />
            <div
              style={{
                display: "flex",
                gap: 4,
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {ip.tags.slice(0, 3).map((t, i) => (
                <Tag key={i} text={t} />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: "#94A3B8",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                {ip.innovator}
              </span>
              <StatusBadge
                status={PROJECTS.find((p) => p.ipId === ip.id) ? "active" : ip.status}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
