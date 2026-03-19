import type React from "react";
import { useMemo, useState } from "react";
import { Badge } from "../ui/primitives/Badge";
import { Btn } from "../ui/primitives/Button";
import { Card } from "../ui/primitives/Card";
import { PageHeader } from "../ui/layout/PageHeader";
import { Tag } from "../ui/primitives/Tag";
import { Tabs } from "../ui/primitives/Tabs";
import { KokoBtn } from "../components/KokoBtn";
import { ARGONAUTS_STATUS, DISCIPLINES_LIST } from "../config/constants";

interface ArgonautsDetailPageProps {
  arg: any;
  setPage: (page: string) => void;
  role?: string;
  addNotif?: (notif: any) => void;
  updateArgonauts?: (data: any) => void;
}

const getTeamFormation = (arg: any) => {
  const required = arg.disciplines || [];
  const covered = new Set<string>();
  (arg.candidates || []).forEach((c: any) => {
    if (c.status === "approved") covered.add(c.discipline);
  });
  const pct = required.length === 0 ? 0 : Math.round((covered.size / required.length) * 100);
  return { required, covered: Array.from(covered), pct };
};

export const ArgonautsDetailPage: React.FC<ArgonautsDetailPageProps> = ({ arg, setPage, role = "innovator", addNotif, updateArgonauts }) => {
  const [active, setActive] = useState("overview");
  const [comment, setComment] = useState("");
  const [attachment, setAttachment] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateDiscipline, setCandidateDiscipline] = useState<string>(DISCIPLINES_LIST[0] || "");
  const [mission, setMission] = useState(arg);

  const formation = useMemo(() => getTeamFormation(mission), [mission]);
  const approvedCount = (mission.candidates || []).filter((c: any) => c.status === "approved").length;

  const addChronicle = () => {
    if (!comment) return;
    const next = { id: `ch-${Date.now()}`, author: "You", authorColor: "#2563EB", date: new Date().toISOString().slice(0, 10), type: "update", title: "Update", body: comment, attachments: attachment ? [attachment] : [], tags: [] };
    const nextMission = { ...mission, chronicle: [next, ...(mission.chronicle || [])] };
    setMission(nextMission);
    addNotif?.({ type: "update", text: `New update posted for ${mission.title}` });
    setComment("");
    setAttachment("");
    updateArgonauts?.(nextMission);
  };

  const applyCandidate = () => {
    if (!candidateName) return;
    const newCandidate = { id: `cand-${Date.now()}`, name: candidateName, userId: null, discipline: candidateDiscipline, type: "applicant", status: "pending", motivation: "I want to contribute.", expertise: "Expert", date: new Date().toISOString().slice(0, 10) };
    const next = { ...mission, candidates: [...(mission.candidates || []), newCandidate] };
    setMission(next);
    updateArgonauts?.(next);
    addNotif?.({ type: "candidate", text: `${candidateName} applied to ${mission.title}` });
    setCandidateName("");
  };

  const updateCandidateStatus = (id: string, status: string) => {
    const next = { ...mission, candidates: (mission.candidates || []).map((c: any) => (c.id === id ? { ...c, status } : c)) };
    setMission(next);
    updateArgonauts?.(next);
  };

  const inviteExpert = (expert: any) => {
    const already = (mission.candidates || []).some((c: any) => c.name === expert.name);
    if (already) return;
    const nextExpert = { id: `cand-${Date.now()}`, name: expert.name, userId: expert.id || null, discipline: mission.disciplines[0] || "Other", type: "invited", status: "pending", motivation: "Invited expert", expertise: expert.expertise, date: new Date().toISOString().slice(0, 10) };
    const next = { ...mission, candidates: [...(mission.candidates || []), nextExpert] };
    setMission(next);
    updateArgonauts?.(next);
  };

  const formProject = () => {
    const next = { ...mission, status: "forming" };
    setMission(next);
    updateArgonauts?.(next);
    addNotif?.({ type: "project", text: `Team formation started for ${mission.title}` });
  };

  return (
    <div>
      <PageHeader
        title={mission.title}
        sub={`${mission.org} · ${mission.field} · ${mission.status.toUpperCase()}`}
        badge="⚔ ARGONAUTS"
        action={() => setPage("argonauts")}
        actionLabel="Back to missions"
      />
      <Card style={{ marginBottom: 16, padding: 16 }} hover={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontFamily: "'Syne',sans-serif" }}>{mission.title}</h3>
            <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{mission.desc}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Badge text={mission.status} color={ARGONAUTS_STATUS[mission.status as keyof typeof ARGONAUTS_STATUS]?.color || "#94A3B8"} />
              <Badge text={`${approvedCount}/${mission.teamSize} approved`} color="#10B981" />
              <Badge text={`${formation.pct}% coverage`} color="#2563EB" />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <KokoBtn type="argonauts" item={mission} />
            <Btn onClick={() => setPage(`arg-${mission.id}/edit`)} variant="outline" color="#7C3AED">Edit</Btn>
          </div>
        </div>
      </Card>

      <Tabs
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "chronicle", label: "Chronicle" },
          { id: "candidates", label: "Candidates" },
          { id: "team", label: "Team Formation" },
          { id: "experts", label: "Suggested Experts" },
        ]}
        active={active}
        onChange={setActive}
      />

      {active === "overview" && (
        <Card style={{ marginTop: 14, padding: 16 }} hover={false}>
          <h3 style={{ marginTop: 0 }}>Mission Summary</h3>
          <p style={{ margin: 0 }}>{mission.expectedImpact}</p>
          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {mission.tags?.map((tag: string) => <Tag key={tag} text={tag} color="#7C3AED" />)}
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge text={`Funding ${mission.fundingCommitment}`} color="#059669" />
            <Badge text={`Team size ${mission.teamSize}`} color="#7C3AED" />
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {mission.disciplines?.map((d: string) => <Badge key={d} text={d} color="#94A3B8" />)}
          </div>
        </Card>
      )}

      {active === "chronicle" && (
        <Card style={{ marginTop: 14, padding: 16 }} hover={false}>
          <h3>Chronicle</h3>
          {(mission.chronicle || []).map((entry: any) => (
            <div key={entry.id} style={{ borderBottom: "1px solid #EEF2FF", padding: "10px 0" }}>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>{entry.date} • {entry.author}</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{entry.title}</div>
              <p style={{ margin: "4px 0", color: "#334155" }}>{entry.body}</p>
              {role === "admin" || role === "innovator" ? (
                <Btn variant="outline" size="sm" color="#EF4444" onClick={() => {
                  const next = { ...mission, chronicle: (mission.chronicle || []).filter((c: any) => c.id !== entry.id) };
                  setMission(next);
                  updateArgonauts?.(next);
                }}>Delete</Btn>
              ) : null}
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <div style={{ marginBottom: 6 }}>Post update</div>
            <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: "100%", borderRadius: 8, border: "1px solid #E2E8F0", padding: 8 }} placeholder="Write update..." />
            <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
              <input value={attachment} onChange={(e) => setAttachment(e.target.value)} placeholder="Attachment URL" style={{ flex: 1, borderRadius: 8, border: "1px solid #E2E8F0", padding: 8 }} />
              <Btn onClick={addChronicle} size="sm">Post</Btn>
            </div>
          </div>
        </Card>
      )}

      {active === "candidates" && (
        <Card style={{ marginTop: 14, padding: 16 }} hover={false}>
          <h3>Candidates</h3>
          {(mission.candidates || []).map((cand: any) => (
            <div key={cand.id} style={{ borderBottom: "1px solid #EEF2FF", padding: "8px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{cand.name}</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>{cand.discipline} • {cand.status}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {role === "admin" || role === "innovator" ? (
                  <>
                    <Btn size="sm" variant="success" color="#059669" onClick={() => updateCandidateStatus(cand.id, "approved")}>Approve</Btn>
                    <Btn size="sm" variant="danger" color="#EF4444" onClick={() => updateCandidateStatus(cand.id, "rejected")}>Reject</Btn>
                  </>
                ) : null}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input value={candidateName} onChange={(e) => setCandidateName(e.target.value)} placeholder="Candidate Name" style={{ padding: 7, borderRadius: 8, border: "1px solid #E2E8F0", flex: 1 }} />
            <select value={candidateDiscipline} onChange={(e) => setCandidateDiscipline(e.target.value)} style={{ padding: 7, borderRadius: 8, border: "1px solid #E2E8F0" }}>
              {DISCIPLINES_LIST.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <Btn size="sm" onClick={applyCandidate}>Apply</Btn>
          </div>
        </Card>
      )}

      {active === "team" && (
        <Card style={{ marginTop: 14, padding: 16 }} hover={false}>
          <h3>Team Formation</h3>
          <div style={{ marginBottom: 8 }}>Discipline coverage: {formation.covered.length}/{formation.required.length}</div>
          <div style={{ marginBottom: 10, height: 10, borderRadius: 999, background: "#E2E8F0" }}>
            <div style={{ width: `${formation.pct}%`, height: 10, borderRadius: 999, background: formation.pct > 80 ? "#059669" : "#7C3AED" }} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {formation.required.map((d: string) => (
              <Badge key={d} text={`${formation.covered.includes(d) ? "✔" : "○"} ${d}`} color={formation.covered.includes(d) ? "#059669" : "#94A3B8"} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Status:</span>
            <Badge text={mission.status} color={ARGONAUTS_STATUS[mission.status as keyof typeof ARGONAUTS_STATUS]?.color || "#94A3B8"} />
          </div>
          {(role === "admin" || role === "innovator") && formation.pct >= 70 && mission.status !== "forming" && (
            <div style={{ marginTop: 10 }}><Btn onClick={formProject}>Form Project</Btn></div>
          )}
        </Card>
      )}

      {active === "experts" && (
        <Card style={{ marginTop: 14, padding: 16 }} hover={false}>
          <h3>Suggested Experts</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {(mission.suggestedExperts || []).map((e: any) => (
              <Card key={e.id} style={{ padding: 12, border: "1px solid #E2E8F0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{e.name}</div>
                    <div style={{ fontSize: 11, color: "#64748B" }}>{e.dept}</div>
                  </div>
                  <KokoBtn type="roles" item={{ id: e.id, title: e.name }} size="sm" />
                </div>
                <div style={{ fontSize: 11, color: "#475569", marginBottom: 6 }}>{e.expertise}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                  {e.tags?.map((t: string) => <Badge key={t} text={t} color="#E2E8F0" />)}
                </div>
                <Btn size="sm" onClick={() => inviteExpert(e)}>Invite</Btn>
              </Card>
            ))}
          </div>
        </Card>
      )}

      <div style={{ marginTop: 14 }}>
        <Btn onClick={() => setPage("argonauts")}>Back to Argonauts</Btn>
      </div>
    </div>
  );
};
