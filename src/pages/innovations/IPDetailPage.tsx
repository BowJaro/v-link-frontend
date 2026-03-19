import type { FC } from "react";
import { useState } from "react";

// UI Components
import { Card } from "../../ui/primitives/Card";
import { Badge } from "../../ui/primitives/Badge";
import { Btn } from "../../ui/primitives/Button";
import { BackBtn } from "../../ui/layout/BackButton";
import { Tabs } from "../../ui/primitives/Tabs";
import { TRLBadge } from "../../components/ip/TRLBadge";
import { StatusBadge } from "../../components/StatusBadge";
import { KokoBtn } from "../../components/KokoBtn";
import { SectionTitle } from "../../ui/layout/PageHeader";
import { Avatar, AvatarStack } from "../../ui/primitives/Avatar";
import { ProgressBar } from "../../ui/primitives/ProgressBar";
import { Modal } from "../../ui/primitives/Modal";
import { Input } from "../../ui/primitives/Input";
import { Sel } from "../../ui/primitives/Select";
import { Tag } from "../../ui/primitives/Tag";

// Cards
import { MilestoneCard } from "../../components/MilestoneCard";
import { ChronicleEntry } from "../../components/ChronicleEntry";

// Data & Constants
import {
  CAT_COLORS,
  ROLE_CFG,
} from "../../config/constants";
import { USERS } from "../../config/mockData";

interface IPDetailPageProps {
  ip: any;
  project?: any;
  setPage: (page: string) => void;
  role: string;
  addNotif: (notif: any) => void;
}

export const IPDetailPage: FC<IPDetailPageProps> = ({
  ip,
  project,
  setPage,
  role,
  addNotif,
}) => {
  const [tab, setTab] = useState("overview");
  const [ndaOk, setNdaOk] = useState(false);
  const [ndaOpen, setNdaOpen] = useState(false);
  const [interested, setInterested] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [discussions, setDiscussions] = useState([
    {
      id: "d1",
      from: "Project Team",
      text: "Welcome to the project workspace!",
      time: "1d ago",
      color: "#2563EB",
    },
  ]);
  const [chatMsg, setChatMsg] = useState("");
  const [chronicle, setChronicle] = useState(project?.chronicle || []);
  const [chronicleOpen, setChronicleOpen] = useState(false);
  const [chronicleForm, setChronicleForm] = useState({
    type: "update",
    title: "",
    body: "",
  });

  if (!ip)
    return (
      <div
        style={{
          padding: 60,
          textAlign: "center",
          color: "#94A3B8",
        }}
      >
        IP not found.
      </div>
    );

  const uid = {
    innovator: "u1",
    seeker: "u2",
    investor: "u3",
    admin: "u4",
  }[role];
  const myMember = project?.members?.find((m: any) => m.userId === uid);
  const isOwner = project?.ownerId === uid || role === "admin";
  const canPost =
    isOwner ||
    myMember?.permission === "editor" ||
    myMember?.permission === "contributor";
  const pct = Math.round((ip.fundingRaised / ip.fundingTarget) * 100);

  const baseTabs = [
    { id: "overview", label: "Overview", icon: "◈" },
    { id: "tech", label: "Technology", icon: "⚗" },
    { id: "milestones", label: "Chronicle", icon: "📜" },
    { id: "team", label: "Team", icon: "👥" },
    { id: "docs", label: "Docs", icon: "📄", count: ip.docs.length },
  ];
  const projectTabs = project
    ? [
      {
        id: "proj-chronicle",
        label: "Project Chronicle",
        icon: "📜",
        count: chronicle.length,
        badge: "Live",
      },
      {
        id: "proj-discuss",
        label: "Discussion",
        icon: "💬",
        count: discussions.length,
      },
    ]
    : [];

  return (
    <div>
      <BackBtn
        onClick={() => setPage("innovations")}
        label="← Innovation Marketplace"
      />
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Badge
            text={ip.field}
            color={CAT_COLORS[ip.field as keyof typeof CAT_COLORS] || "#2563EB"}
          />
          <TRLBadge level={ip.trl} showLabel />
          <StatusBadge status={project ? "active" : ip.status} />
          <Badge text={ip.assetType} color="#7C3AED" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <h1
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: "#1E293B",
              margin: 0,
              fontFamily: "'Syne',sans-serif",
              lineHeight: 1.2,
              flex: 1,
            }}
          >
            {ip.title}
          </h1>
          <KokoBtn type="innovations" item={ip} size="md" />
        </div>
        <p
          style={{
            fontSize: 13,
            color: "#64748B",
            margin: "0 0 10px",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          By {ip.innovator} · {ip.legalRef}
        </p>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {ip.tags.map((t: string, i: number) => (
            <Tag
              key={i}
              text={t}
              color={CAT_COLORS[ip.field as keyof typeof CAT_COLORS] || "#2563EB"}
            />
          ))}
        </div>
      </div>

      {project && (
        <div
          onClick={() => setTab("proj-chronicle")}
          style={{
            background: "linear-gradient(135deg,#1E3A8A,#2563EB)",
            borderRadius: 14,
            padding: "14px 20px",
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              🤝
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#7DD3FC",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 3,
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                Active Project
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'Syne',sans-serif",
                }}
              >
                {project.title}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                {project.ownerName} · {project.progress}% complete
              </div>
            </div>
          </div>
          <AvatarStack members={project.members} />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 20,
        }}
      >
        <div>
          <div style={{ marginBottom: 20 }}>
            <Tabs
              tabs={[...baseTabs, ...projectTabs]}
              active={tab}
              onChange={setTab}
            />
          </div>

          {tab === "overview" && (
            <Card style={{ padding: 24 }} hover={false}>
              <SectionTitle title="Abstract" />
              <p
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  lineHeight: 1.85,
                  fontFamily: "'DM Sans',sans-serif",
                  marginBottom: 16,
                }}
              >
                {ip.overview}
              </p>
              <SectionTitle title="📜 Chronicle — Milestones" />
              {ip.timeline.map((ms: any, i: number) => (
                <MilestoneCard
                  key={ms.id}
                  ms={ms}
                  isLast={i === ip.timeline.length - 1}
                  isOwner={isOwner}
                  onComplete={() =>
                    addNotif({
                      type: "update",
                      text: `Milestone "${ms.title}" marked complete.`,
                    })
                  }
                />
              ))}
            </Card>
          )}

          {tab === "tech" && (
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
                {[
                  { l: "Asset Type", v: ip.assetType },
                  { l: "Legal Ref", v: ip.legalRef },
                  { l: "Stage", v: ip.stage },
                  { l: "Field", v: ip.field },
                  { l: "Views", v: ip.views?.toLocaleString() },
                  { l: "Interests", v: ip.interests },
                ].map((s, i) => (
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
          )}

          {tab === "milestones" && (
            <Card style={{ padding: 24 }} hover={false}>
              <SectionTitle
                title="📜 Chronicle — Milestone Roadmap"
                sub={`${ip.timeline.filter((m: any) => m.done).length} / ${ip.timeline.length} complete`}
              />
              <ProgressBar
                value={
                  (ip.timeline.filter((m: any) => m.done).length /
                    ip.timeline.length) *
                  100
                }
                color="#2563EB"
                h={8}
              />
              <div style={{ marginTop: 20 }}>
                {ip.timeline.map((ms: any, i: number) => (
                  <MilestoneCard
                    key={ms.id}
                    ms={ms}
                    isLast={i === ip.timeline.length - 1}
                    isOwner={isOwner}
                    onComplete={() =>
                      addNotif({
                        type: "update",
                        text: "Milestone done.",
                      })
                    }
                  />
                ))}
              </div>
            </Card>
          )}

          {tab === "team" && (
            <Card style={{ padding: 24 }} hover={false}>
              <SectionTitle title="Research Team" />
              {ip.authors.map((a: any, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    padding: "13px 0",
                    borderBottom:
                      i < ip.authors.length - 1
                        ? "1px solid #F1F5F9"
                        : "none",
                  }}
                >
                  <Avatar
                    name={a.name}
                    size={40}
                    color={CAT_COLORS[ip.field as keyof typeof CAT_COLORS] || "#2563EB"}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#1E293B",
                        fontFamily: "'Syne',sans-serif",
                      }}
                    >
                      {a.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {a.role} · {a.org}
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          )}

          {tab === "docs" && (
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
                    borderBottom:
                      i < ip.docs.length - 1
                        ? "1px solid #F1F5F9"
                        : "none",
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        background: d.confidential ? "#FFF7ED" : "#F0FDF4",
                        border: `1px solid ${d.confidential ? "#FDE68A" : "#A7F3D0"
                          }`,
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
                      <Btn
                        size="sm"
                        color="#7C3AED"
                        onClick={() => setNdaOpen(true)}
                      >
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
          )}

          {tab === "proj-chronicle" && project && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#1E293B",
                      margin: 0,
                      fontFamily: "'Syne',sans-serif",
                    }}
                  >
                    📜 Project Chronicle
                  </h2>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      margin: "2px 0 0",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    Project progress updates
                  </p>
                </div>
                {canPost && (
                  <Btn
                    color="#2563EB"
                    onClick={() => setChronicleOpen(true)}
                    icon="📜"
                  >
                    Add Chronicle Entry
                  </Btn>
                )}
              </div>
              {chronicle.length === 0 && (
                <Card
                  style={{ padding: 40, textAlign: "center" }}
                  hover={false}
                >
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📜</div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#94A3B8",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    No chronicle entries yet.
                  </div>
                </Card>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {chronicle.map((e: any) => (
                  <ChronicleEntry
                    key={e.id}
                    entry={e}
                    canEdit={canPost}
                    onDelete={(id: string) =>
                      setChronicle((p: any[]) => p.filter((x: any) => x.id !== id))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {tab === "proj-discuss" && project && (
            <Card style={{ padding: 22 }} hover={false}>
              <SectionTitle title="Project Discussion" />
              <div
                style={{
                  background: "#F8FAFC",
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 14,
                  maxHeight: 340,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  border: "1px solid #E8EDFB",
                }}
              >
                {discussions.map((m: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      borderRadius: 10,
                      padding: "12px 14px",
                      border: "1px solid #F1F5F9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 9,
                        alignItems: "center",
                        marginBottom: 5,
                      }}
                    >
                      <Avatar
                        name={m.from}
                        size={26}
                        color={m.color || "#2563EB"}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: m.color || "#2563EB",
                          fontFamily: "'DM Sans',sans-serif",
                        }}
                      >
                        {m.from}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#94A3B8",
                          fontFamily: "'DM Sans',sans-serif",
                        }}
                      >
                        · {m.time}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#374151",
                        lineHeight: 1.6,
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && chatMsg.trim()) {
                      setDiscussions((p) => [
                        ...p,
                        {
                          id: "d" + Date.now(),
                          from: "You",
                          text: chatMsg,
                          time: "Just now",
                          color: "#2563EB",
                        },
                      ]);
                      setChatMsg("");
                    }
                  }}
                  placeholder="Type a message… (Enter to send)"
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: 10,
                    fontSize: 13,
                    outline: "none",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                />
                <Btn
                  color="#2563EB"
                  onClick={() => {
                    if (chatMsg.trim()) {
                      setDiscussions((p) => [
                        ...p,
                        {
                          id: "d" + Date.now(),
                          from: "You",
                          text: chatMsg,
                          time: "Just now",
                          color: "#2563EB",
                        },
                      ]);
                      setChatMsg("");
                    }
                  }}
                >
                  Send
                </Btn>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <Card style={{ padding: 20, marginBottom: 12 }} hover={false}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#7C3AED",
                fontFamily: "'Syne',sans-serif",
                marginBottom: 3,
              }}
            >
              ${(ip.fundingRaised / 1000).toFixed(0)}K{" "}
              <span
                style={{
                  fontSize: 13,
                  color: "#94A3B8",
                  fontWeight: 400,
                }}
              >
                raised
              </span>
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#94A3B8",
                marginBottom: 6,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              of ${(ip.fundingTarget / 1000).toFixed(0)}K target
            </div>
            <ProgressBar value={pct} color="#7C3AED" h={8} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  background: "#EFF6FF",
                  borderRadius: 9,
                  padding: 11,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: "#2563EB",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  {ip.interests}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#64748B",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  Investors
                </div>
              </div>
              <div
                style={{
                  background: "#F0FDF4",
                  borderRadius: 9,
                  padding: 11,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: "#10B981",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  {ip.views?.toLocaleString()}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#64748B",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  Views
                </div>
              </div>
            </div>
          </Card>
          <Card style={{ padding: 20, marginBottom: 12 }} hover={false}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Btn
                full
                color="#2563EB"
                onClick={() => setNdaOpen(true)}
                icon="📋"
              >
                Request Documents
              </Btn>
              {interested ? (
                <div
                  style={{
                    background: "#F0FDF4",
                    border: "1px solid #A7F3D0",
                    borderRadius: 9,
                    padding: "9px 13px",
                    fontSize: 11,
                    color: "#059669",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  ✅ Interest registered!
                </div>
              ) : (
                <Btn
                  full
                  color="#7C3AED"
                  variant="outline"
                  onClick={() => {
                    setInterested(true);
                    addNotif({
                      type: "investment",
                      text: `Interest expressed in "${ip.title}".`,
                    });
                  }}
                  icon="💰"
                >
                  Express Interest
                </Btn>
              )}
              <Btn
                full
                color="#0891B2"
                variant="outline"
                onClick={() => setContactOpen(true)}
                icon="✉️"
              >
                Contact Team
              </Btn>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        open={ndaOpen}
        onClose={() => setNdaOpen(false)}
        title="NDA Agreement"
      >
        <p
          style={{
            fontSize: 12,
            color: "#64748B",
            lineHeight: 1.8,
            marginBottom: 14,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          By accepting, all documents shared are strictly confidential.
        </p>
        {ndaOk ? (
          <Badge text="✅ NDA accepted" color="#10B981" />
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <Btn
              full
              color="#2563EB"
              onClick={() => {
                setNdaOk(true);
                setNdaOpen(false);
              }}
            >
              I Accept
            </Btn>
            <Btn
              full
              color="#EF4444"
              variant="outline"
              onClick={() => setNdaOpen(false)}
            >
              Decline
            </Btn>
          </div>
        )}
      </Modal>
      <Modal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title={`Contact ${ip.innovator}`}
      >
        <Input
          label="Message"
          value={msgText}
          onChange={setMsgText}
          rows={5}
          placeholder="Introduce yourself…"
        />
        <Btn
          full
          color="#2563EB"
          onClick={() => {
            setContactOpen(false);
            addNotif({
              type: "solution",
              text: `Message sent to ${ip.innovator}.`,
            });
          }}
        >
          Send Message →
        </Btn>
      </Modal>
      <Modal
        open={chronicleOpen}
        onClose={() => setChronicleOpen(false)}
        title="Add Chronicle Entry"
      >
        <Sel
          label="Type"
          value={chronicleForm.type}
          onChange={(v) =>
            setChronicleForm((f) => ({ ...f, type: v }))
          }
          options={[
            "update",
            "research",
            "funding",
            "milestone",
            "announcement",
          ]}
        />
        <Input
          label="Title"
          value={chronicleForm.title}
          onChange={(v) =>
            setChronicleForm((f) => ({ ...f, title: v }))
          }
          placeholder="Entry title"
          required
        />
        <Input
          label="Content"
          value={chronicleForm.body}
          onChange={(v) => setChronicleForm((f) => ({ ...f, body: v }))}
          rows={5}
          placeholder="Describe the update…"
          required
        />
        <div style={{ display: "flex", gap: 8 }}>
          <Btn
            full
            color="#2563EB"
            onClick={() => {
              if (chronicleForm.title) {
                const rc = ROLE_CFG[role as keyof typeof ROLE_CFG];
                setChronicle((p: any[]) => [
                  {
                    id: "ch" + Date.now(),
                    author:
                      USERS.find((u: any) => u.role === role)?.name || "You",
                    authorColor: rc?.color,
                    date: new Date().toISOString().split("T")[0],
                    ...chronicleForm,
                    tags: [],
                    attachments: [],
                  },
                  ...p,
                ]);
                setChronicleOpen(false);
              }
            }}
          >
            Post
          </Btn>
          <Btn
            full
            color="#EF4444"
            variant="outline"
            onClick={() => setChronicleOpen(false)}
          >
            Cancel
          </Btn>
        </div>
      </Modal>
    </div>
  );
};
