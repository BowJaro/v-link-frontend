import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../ui/primitives/Badge";
import { Btn } from "../ui/primitives/Button";
import { Card } from "../ui/primitives/Card";
import { PageHeader } from "../ui/layout/PageHeader";
import { Tag } from "../ui/primitives/Tag";
import { Tabs } from "../ui/primitives/Tabs";
import { KokoBtn } from "../components/KokoBtn";
import { ARGONAUTS_STATUS } from "../config/constants";
import { ARGONAUTS_DATA_INIT } from "../data/mockData";

export const ArgonautsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const arg = useMemo(() => ARGONAUTS_DATA_INIT.find((a) => a.id === id), [id]);
  const [active, setActive] = useState("overview");
  const [comment, setComment] = useState("");
  const [mission, setMission] = useState(arg as NonNullable<typeof arg>);

  if (!arg) {
    return (
      <div style={{ padding: 32, textAlign: "center", color: "#64748B" }}>
        <h2>Argonauts mission not found</h2>
        <Btn onClick={() => navigate("/argonauts")}>Back to Argonauts</Btn>
      </div>
    );
  }

  const updateCandidateStatus = (cid: string, status: string) => {
    if (!mission) return;
    setMission({ ...mission, candidates: (mission.candidates || []).map((c: any) => (c.id === cid ? { ...c, status } : c)) });
  };

  const addChronicle = () => {
    if (!mission || !comment) return;
    setMission({
      ...mission,
      chronicle: [
        {
          id: `${Date.now()}`,
          author: "You",
          authorColor: "#2563EB",
          date: new Date().toLocaleDateString(),
          type: "update",
          title: "Update",
          body: comment,
          attachments: [],
          tags: [],
        },
        ...(mission.chronicle || []),
      ],
    });
    setComment("");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 960, margin: "0 auto" }}>
      <PageHeader title={mission.title} sub={`${mission.org} • ${mission.field}`} badge="🧭 ARGONAUTS" action={() => navigate("/argonauts")} actionLabel="Back" />
      <Card style={{ marginBottom: 16, padding: 16 }} hover={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <h3 style={{ margin: 0 }}>{mission.title}</h3>
            <p style={{ color: "#64748B", margin: "4px 0" }}>{mission.desc}</p>
            <div style={{ marginTop: 8, display: "flex", gap: 6 }}><Badge text={mission.status} color={ARGONAUTS_STATUS[mission.status as keyof typeof ARGONAUTS_STATUS]?.color || "#94A3B8"} /><Badge text={mission.field} color="#2563EB" /></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <KokoBtn type="argonauts" item={{ id: mission.id, title: mission.title }} />
            <Btn color="#7C3AED" onClick={() => navigate(`/argonauts/${id}/edit`)}>Edit</Btn>
          </div>
        </div>
      </Card>

      <Tabs tabs={[{ id: "overview", label: "Overview" }, { id: "chronicle", label: "Chronicle" }, { id: "candidates", label: "Candidates" }, { id: "team", label: "Team" }]} active={active} onChange={setActive} />

      {active === "overview" && <Card style={{ marginTop: 14, padding: 16 }} hover={false}><p>{mission.expectedImpact}</p></Card>}
      {active === "chronicle" && <Card style={{ marginTop: 14, padding: 16 }} hover={false}><div style={{ display: "grid", gap: 10 }}>{(mission.chronicle || []).map((entry: any) => <div key={entry.id} style={{ borderBottom: "1px solid #E2E8F0", padding: 8 }}><strong>{entry.title}</strong><p>{entry.body}</p></div>)}</div><div style={{ marginTop: 10 }}><textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: "100%", borderRadius: 8, border: "1px solid #E2E8F0", padding: 8 }} placeholder="Write update..." /><div style={{ marginTop: 8 }}><Btn onClick={addChronicle}>Post update</Btn></div></div></Card>}
      {active === "candidates" && <Card style={{ marginTop: 14, padding: 16 }} hover={false}><div style={{ display: "grid", gap: 10 }}>{(mission.candidates || []).map((cand: any) => <div key={cand.id} style={{ borderBottom: "1px solid #EEF2FF", padding: 8, display: "flex", justifyContent: "space-between" }}><div><strong>{cand.name}</strong><div style={{ color: "#64748B" }}>{cand.discipline}</div></div><div style={{ display: "flex", gap: 6 }}>{cand.status !== "approved" ? <Btn size="sm" color="#059669" onClick={() => updateCandidateStatus(cand.id, "approved")}>Approve</Btn> : null}</div></div>)}</div></Card>}
      {active === "team" && <Card style={{ marginTop: 14, padding: 16 }} hover={false}><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{(mission.disciplines || []).map((d: string) => <Tag key={d} text={d} />)}</div></Card>}
    </div>
  );
};
