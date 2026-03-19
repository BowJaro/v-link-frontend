import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../ui/primitives/Card";
import { Badge } from "../../ui/primitives/Badge";
import { PageHeader } from "../../ui/layout/PageHeader";
import { Input } from "../../ui/primitives/Input";
import { Sel } from "../../ui/primitives/Select";
import { ArgonautsCard } from "../../components/ArgonautsCard";
import { ARGONAUTS_STATUS, FIELDS_LIST } from "../../config/constants";

interface ArgonautsMarketplaceProps {
  argonautsList: any[];
  addNotif?: (n: any) => void;
}

export const ArgonautsMarketplace: FC<ArgonautsMarketplaceProps> = ({ argonautsList }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("All");

  const filtered = argonautsList.filter((a) => (fieldFilter === "All" || a.field === fieldFilter) && (!search || a.title.toLowerCase().includes(search.toLowerCase()) || a.org.toLowerCase().includes(search.toLowerCase())));

  return (
    <div style={{ padding: "1rem" }}>
      <PageHeader title="Argonauts" sub="Grand challenges requiring multidisciplinary teams." action={() => navigate("/argonauts/new")} actionLabel="+ Post Mission" actionColor="#7C3AED" actionIcon="?" />
      <Card style={{ padding: 16, marginBottom: 18 }} hover={false}>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <div style={{ flex: 2 }}><Input label="" value={search} onChange={setSearch} placeholder="Search missions..." /></div>
          <div style={{ flex: 1 }}><Sel label="Field" value={fieldFilter} onChange={setFieldFilter} options={["All", ...FIELDS_LIST]} /></div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{Object.entries(ARGONAUTS_STATUS).map(([k, v]) => <Badge key={k} text={v.label} color={v.color} />)}</div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
        {filtered.map((arg) => (
          <ArgonautsCard key={arg.id} arg={arg} onClick={() => navigate(`/argonauts/${arg.id}`)} />
        ))}
      </div>
    </div>
  );
};
