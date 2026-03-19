import { useEffect, useState } from "react";
import { Btn } from "../ui/primitives/Button";
import { Card } from "../ui/primitives/Card";
import { Input } from "../ui/primitives/Input";
import { Sel } from "../ui/primitives/Select";
import { PageHeader } from "../ui/layout/PageHeader";

interface PostArgonautsPageProps {
  setPage: (page: string) => void;
  addNotif?: (notif: any) => void;
  addArgonauts?: (arg: any) => void;
  editData?: any;
  onUpdate?: (data: any) => void;
}

export const PostArgonautsPage: React.FC<PostArgonautsPageProps> = ({ setPage, addNotif, addArgonauts, editData, onUpdate }) => {
  const [title, setTitle] = useState(editData?.title || "");
  const [org, setOrg] = useState(editData?.org || "");
  const [desc, setDesc] = useState(editData?.desc || "");
  const [field, setField] = useState(editData?.field || "CleanTech");
  const [status, setStatus] = useState(editData?.status || "open");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setOrg(editData.org || "");
      setDesc(editData.desc || "");
      setField(editData.field || "CleanTech");
      setStatus(editData.status || "open");
    }
  }, [editData]);

  const onSubmit = () => {
    const payload = {
      id: editData?.id || `arg${Date.now()}`,
      title,
      org,
      field,
      desc,
      status,
      fundingCommitment: "$500,000",
      teamSize: 8,
      applicantsCount: 0,
      disciplines: ["AI & Machine Learning", "Software Engineering"],
      tags: [field],
      chronicle: [],
      candidates: [],
      suggestedExperts: [],
      createdBy: "u1",
    };
    if (editData && onUpdate) {
      onUpdate(payload);
      addNotif?.({ type: "update", text: `${payload.title} updated` });
    } else {
      addArgonauts?.(payload);
      addNotif?.({ type: "project", text: `${payload.title} posted` });
    }
    setPage("argonauts");
  };

  return (
    <div>
      <PageHeader title={editData ? "Edit Argonauts Mission" : "Post Argonauts Mission"} sub="Create mission details and launch recruitment." action={() => setPage("argonauts")} actionLabel="Back" />
      <Card style={{ padding: 16 }} hover={false}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Input label="Mission Title" value={title} onChange={setTitle} placeholder="e.g., Urban Net-Zero Infrastructure" />
          <Input label="Organization" value={org} onChange={setOrg} placeholder="e.g., Ministry of Industry" />
          <Sel label="Field" value={field} onChange={setField} options={["CleanTech", "HealthTech", "FinTech", "AgriTech", "GovTech"]} />
          <Sel label="Status" value={status} onChange={setStatus} options={["open", "forming", "launched"]} />
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 12, color: "#64748B", fontWeight: 700 }}>Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} style={{ width: "100%", border: "1px solid #E2E8F0", borderRadius: 10, minHeight: 110, marginTop: 6, padding: 10 }} />
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <Btn onClick={onSubmit} color="#2563EB">{editData ? "Save Mission" : "Post Mission"}</Btn>
          <Btn variant="outline" color="#6B7280" onClick={() => setPage("argonauts")}>Cancel</Btn>
        </div>
      </Card>
    </div>
  );
};
