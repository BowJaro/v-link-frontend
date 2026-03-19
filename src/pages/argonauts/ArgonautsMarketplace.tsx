import type { FC } from "react";
import { useState } from "react";

// UI Components
import { Card } from "../../ui/primitives/Card";
import { Badge } from "../../ui/primitives/Badge";
import { Btn } from "../../ui/primitives/Button";
import { PageHeader } from "../../ui/layout/PageHeader";
import { Input } from "../../ui/primitives/Input";
import { Sel } from "../../ui/primitives/Select";

// Cards
import { ArgonautsCard } from "../../components/ArgonautsCard";

// Data & Constants
import { ARGONAUTS_STATUS, FIELDS_LIST } from "../../config/constants";

interface ArgonautsMarketplaceProps {
  setPage: (page: string) => void;
  argonautsList: any[];
  addNotif?: (n: any) => void;
}

export const ArgonautsMarketplace: FC<ArgonautsMarketplaceProps> = ({
  setPage,
  argonautsList,
}) => {
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("All");

  const filtered = argonautsList.filter(
    (a) =>
      (fieldFilter === "All" || a.field === fieldFilter) &&
      (!search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.org.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <PageHeader
        title="Argonauts"
        sub="Grand Challenges requiring multidisciplinary teams."
        badge="⚔ ARGONAUTS"
        action={() => setPage("post-argonauts")}
        actionLabel="+ Post Mission"
        actionColor="#7C3AED"
        actionIcon="⚔"
      />
      <Card style={{ padding: 16, marginBottom: 18 }} hover={false}>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <div style={{ flex: 2 }}>
            <Input
              label=""
              value={search}
              onChange={setSearch}
              placeholder="🔍  Search Argonauts missions…"
            />
          </div>
          <div style={{ flex: 1 }}>
            <Sel
              label="Field"
              value={fieldFilter}
              onChange={setFieldFilter}
              options={["All", ...FIELDS_LIST]}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {Object.entries(ARGONAUTS_STATUS).map(([k, v]) => (
            <Badge key={k} text={v.label} color={v.color} />
          ))}
        </div>
      </Card>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
        }}
      >
        {filtered.map((arg) => (
          <ArgonautsCard
            key={arg.id}
            arg={arg}
            onClick={() => setPage("arg-" + arg.id)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <Card style={{ padding: 48, textAlign: "center" }} hover={false}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⚔</div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#1E293B",
              fontFamily: "'Syne',sans-serif",
              marginBottom: 12,
            }}
          >
            No missions found
          </div>
          <Btn color="#7C3AED" onClick={() => setPage("post-argonauts")}>
            Post Argonauts Mission
          </Btn>
        </Card>
      )}
    </div>
  );
};
