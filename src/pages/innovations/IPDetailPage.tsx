import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../ui/primitives/Card";
import { Badge } from "../../ui/primitives/Badge";
import { Btn } from "../../ui/primitives/Button";
import { BackBtn } from "../../ui/layout/BackButton";
import { Tabs } from "../../ui/primitives/Tabs";
import { TRLBadge } from "../../components/ip/TRLBadge";
import { StatusBadge } from "../../components/StatusBadge";
import { SectionTitle } from "../../ui/layout/PageHeader";
import { MilestoneCard } from "../../components/MilestoneCard";
import { ChronicleEntry } from "../../components/ChronicleEntry";
import { IP_DATA, PROJECTS } from "../../data/mockData";
import { CAT_COLORS } from "../../config/constants";

export const IPDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ip = IP_DATA.find((item) => item.id === id);
  const project = ip ? PROJECTS.find((p) => p.ipId === ip.id) : undefined;
  const [tab, setTab] = useState("overview");
  const [chronicle, setChronicle] = useState(project?.chronicle || []);

  useEffect(() => {
    setChronicle(project?.chronicle || []);
  }, [project]);

  if (!ip) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#64748B" }}>
        <h2>IP not found</h2>
        <p>Innovation ID "{id}" not found.</p>
        <Btn onClick={() => navigate("/museion")}>Back to Museion</Btn>
      </div>
    );
  }

  const role = "innovator" as "innovator" | "seeker" | "investor" | "admin";
  const uid = { innovator: "u1", seeker: "u2", investor: "u3", admin: "u4" }[role];
  const myMember = project?.members?.find((m: any) => m.userId === uid);
  const isOwner = project?.ownerId === uid || role === "admin";
  const canPost = isOwner || myMember?.permission === "editor" || myMember?.permission === "contributor";

  const baseTabs = [
    { id: "overview", label: "Overview" },
    { id: "tech", label: "Technology" },
    { id: "milestones", label: "Chronicle" },
    { id: "team", label: "Team" },
    { id: "docs", label: "Docs", count: ip.docs.length },
  ];
  const projectTabs = project
    ? [
      { id: "proj-chronicle", label: "Project Chronicle", count: chronicle.length },
      { id: "proj-discuss", label: "Discussion", count: 1 },
    ]
    : [];

  return (
    <div style={{ padding: "1rem", maxWidth: 980, margin: "0 auto" }}>
      <BackBtn onClick={() => navigate("/museion")} label="? Back to Museion" />
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Badge text={ip.field} color={CAT_COLORS[ip.field as keyof typeof CAT_COLORS] || "#2563EB"} />
          <TRLBadge level={ip.trl} showLabel />
          <StatusBadge status={project ? "active" : ip.status} />
          <Badge text={ip.assetType} color="#7C3AED" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0 }}>{ip.title}</h1>
            <p style={{ color: "#64748B", margin: "6px 0" }}>By {ip.innovator} � {ip.legalRef}</p>
          </div>
          <Btn color="#2563EB" onClick={() => navigate(`/museion/${id}/edit`)}>Edit</Btn>
        </div>
      </div>

      <Tabs tabs={[...baseTabs, ...projectTabs]} active={tab} onChange={setTab} />

      {tab === "overview" && (
        <Card style={{ padding: 20, marginTop: 16 }} hover={false}>
          <SectionTitle title="Abstract" />
          <p style={{ color: "#64748B", lineHeight: 1.7 }}>{ip.overview}</p>
        </Card>
      )}
      {tab === "tech" && (
        <Card style={{ padding: 20, marginTop: 16 }} hover={false}>
          <SectionTitle title="Technology" />
          <p style={{ color: "#64748B", lineHeight: 1.7 }}>{ip.desc}</p>
        </Card>
      )}
      {tab === "milestones" && (
        <Card style={{ padding: 20, marginTop: 16 }} hover={false}>
          <SectionTitle title="Milestones" />
          {ip.timeline.map((ms: any) => <MilestoneCard key={ms.id} ms={ms} isLast={false} isOwner={canPost} />)}
        </Card>
      )}
      {tab === "team" && (
        <Card style={{ padding: 20, marginTop: 16 }} hover={false}>
          <SectionTitle title="Team" />
          <ul style={{ color: "#334155" }}>
            {ip.authors.map((a: any) => <li key={a.name}><strong>{a.name}</strong> � {a.role}</li>)}
          </ul>
        </Card>
      )}
      {tab === "docs" && (
        <Card style={{ padding: 20, marginTop: 16 }} hover={false}>
          <SectionTitle title="Documents" />
          <div style={{ display: "grid", gap: 10 }}>
            {ip.docs.map((d: any) => <div key={d.name} style={{ padding: 8, border: "1px solid #E2E8F0", borderRadius: 8 }}><strong>{d.name}</strong><div style={{ color: "#64748B" }}>{d.size}</div></div>)}
          </div>
        </Card>
      )}
      {project && tab === "proj-chronicle" && (
        <Card style={{ padding: 20, marginTop: 16 }} hover={false}>
          <SectionTitle title="Project Chronicle" />
          {chronicle.map((entry: any) => <ChronicleEntry key={entry.id} entry={entry} canEdit={canPost} onDelete={() => setChronicle((prev) => prev.filter((x: any) => x.id !== entry.id))} />)}
        </Card>
      )}
    </div>
  );
};
