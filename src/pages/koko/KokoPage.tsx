import type { FC } from "react";
import { useState } from "react";

// UI Components
import { Card } from "../../ui/primitives/Card";
import { Badge } from "../../ui/primitives/Badge";
import { Btn } from "../../ui/primitives/Button";
import { Tabs } from "../../ui/primitives/Tabs";
import { PageHeader } from "../../ui/layout/PageHeader";
import { TRLBadge, TRLMeter } from "../../components/ip/TRLBadge";
import { KokoBtn } from "../../components/KokoBtn";
import { ProgressBar } from "../../ui/primitives/ProgressBar";

// Data & Constants
import { useKoko } from "../../hooks/useKoko";
import {
  CAT_COLORS,
  ARGONAUTS_STATUS,
} from "../../config/constants";

interface KokoPageProps {
  setPage: (page: string) => void;
}

interface EmptyStateProps {
  icon: string;
  label: string;
  actionLabel: string;
  actionPage: string;
  setPage: (page: string) => void;
}

const EmptyState: FC<EmptyStateProps> = ({
  icon,
  label,
  actionLabel,
  actionPage,
  setPage,
}) => (
  <Card style={{ padding: 48, textAlign: "center" }} hover={false}>
    <div style={{ fontSize: 42, marginBottom: 12 }}>{icon}</div>
    <div
      style={{
        fontSize: 15,
        fontWeight: 700,
        color: "#1E293B",
        fontFamily: "'Syne',sans-serif",
        marginBottom: 6,
      }}
    >
      No {label} in Koko yet
    </div>
    <div
      style={{
        fontSize: 12,
        color: "#94A3B8",
        fontFamily: "'DM Sans',sans-serif",
        marginBottom: 16,
      }}
    >
      Click ☆ on any item to add it to your Koko.
    </div>
    <Btn color="#2563EB" onClick={() => setPage(actionPage)}>
      Browse {actionLabel} →
    </Btn>
  </Card>
);

export const KokoPage: FC<KokoPageProps> = ({ setPage }) => {
  const { koko, removeKoko } = useKoko();
  const [tab, setTab] = useState("innovations");

  const total =
    koko.innovations.length +
    koko.argonauts.length +
    koko.challenges.length +
    koko.projects.length +
    koko.roles.length;

  return (
    <div>
      <PageHeader
        title="Koko"
        sub={`${total} items in your collection`}
        badge="⭐ KOKO"
      />
      <div style={{ marginBottom: 20 }}>
        <Tabs
          tabs={[
            { id: "innovations", label: `Innovations (${koko.innovations.length})` },
            { id: "argonauts", label: `Argonauts (${koko.argonauts.length})` },
            { id: "challenges", label: `Challenges (${koko.challenges.length})` },
            { id: "projects", label: `Projects (${koko.projects.length})` },
            { id: "roles", label: `Roles (${koko.roles.length})` },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      {tab === "innovations" &&
        (koko.innovations.length === 0 ? (
          <EmptyState
            icon="◈"
            label="innovations"
            actionLabel="Innovations"
            actionPage="innovations"
            setPage={setPage}
          />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 14,
            }}
          >
            {koko.innovations.map((ip: any) => (
              <Card key={ip.id} style={{ padding: 20 }}>
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
                    fontFamily: "'Syne',sans-serif",
                    lineHeight: 1.4,
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
                  style={{
                    height: 1,
                    background: "#F1F5F9",
                    margin: "10px 0",
                  }}
                />
                <div style={{ display: "flex", gap: 7 }}>
                  <Btn
                    size="sm"
                    color="#2563EB"
                    onClick={() => setPage("ip-" + ip.id)}
                  >
                    View →
                  </Btn>
                  <Btn
                    size="sm"
                    color="#EF4444"
                    variant="outline"
                    onClick={() => removeKoko("innovations", ip.id)}
                  >
                    Remove
                  </Btn>
                </div>
              </Card>
            ))}
          </div>
        ))}

      {tab === "argonauts" &&
        (koko.argonauts.length === 0 ? (
          <EmptyState
            icon="⚔"
            label="Argonauts missions"
            actionLabel="Argonauts"
            actionPage="argonauts"
            setPage={setPage}
          />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 16,
            }}
          >
            {koko.argonauts.map((arg: any) => {
              const sc = ARGONAUTS_STATUS[arg.status as keyof typeof ARGONAUTS_STATUS] || ARGONAUTS_STATUS.open;
              return (
                <Card key={arg.id} style={{ padding: 0, overflow: "hidden" }}>
                  <div
                    style={{
                      background: "linear-gradient(135deg,#0F172A,#1E3A8A)",
                      padding: "18px 20px 14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 7,
                        marginBottom: 8,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          background: "rgba(255,255,255,0.12)",
                          borderRadius: 20,
                          padding: "3px 10px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 9,
                            color: "rgba(255,255,255,0.85)",
                            fontWeight: 700,
                            fontFamily: "'DM Sans',sans-serif",
                          }}
                        >
                          ⚔ ARGONAUTS
                        </span>
                      </div>
                      <Badge text={sc.label} color={sc.color} />
                    </div>
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#fff",
                        margin: "0 0 3px",
                        fontFamily: "'Syne',sans-serif",
                      }}
                    >
                      {arg.title}
                    </h3>
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {arg.org}
                    </div>
                  </div>
                  <div style={{ padding: "14px 18px" }}>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        lineHeight: 1.6,
                        margin: "0 0 10px",
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {arg.desc?.slice(0, 100)}…
                    </p>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#059669",
                        fontFamily: "'Syne',sans-serif",
                        marginBottom: 10,
                      }}
                    >
                      {arg.fundingCommitment}
                    </div>
                    <div style={{ display: "flex", gap: 7 }}>
                      <Btn
                        size="sm"
                        color="#7C3AED"
                        onClick={() => setPage("arg-" + arg.id)}
                      >
                        View Mission →
                      </Btn>
                      <Btn
                        size="sm"
                        color="#EF4444"
                        variant="outline"
                        onClick={() => removeKoko("argonauts", arg.id)}
                      >
                        Remove
                      </Btn>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ))}

      {tab === "challenges" &&
        (koko.challenges.length === 0 ? (
          <EmptyState
            icon="◎"
            label="challenges"
            actionLabel="Challenges"
            actionPage="challenges"
            setPage={setPage}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {koko.challenges.map((ch: any) => (
              <Card key={ch.id} style={{ padding: 22 }} hover={false}>
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
                        text={ch.industry}
                        color={CAT_COLORS[ch.industry as keyof typeof CAT_COLORS] || "#D97706"}
                      />
                      <Badge text="OPEN" color="#10B981" />
                    </div>
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#1E293B",
                        margin: "0 0 4px",
                        fontFamily: "'Syne',sans-serif",
                      }}
                    >
                      {ch.title}
                    </h3>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#94A3B8",
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {ch.org} · {ch.deadline}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      marginLeft: 20,
                      flexShrink: 0,
                    }}
                  >
                    <KokoBtn type="challenges" item={ch} size="sm" />
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: "#D97706",
                        fontFamily: "'Syne',sans-serif",
                        marginTop: 6,
                      }}
                    >
                      {ch.reward}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 12,
                  }}
                >
                  <Btn
                    size="sm"
                    color="#D97706"
                    onClick={() => setPage("challenges")}
                  >
                    View →
                  </Btn>
                  <Btn
                    size="sm"
                    color="#EF4444"
                    variant="outline"
                    onClick={() => removeKoko("challenges", ch.id)}
                  >
                    Remove
                  </Btn>
                </div>
              </Card>
            ))}
          </div>
        ))}

      {tab === "projects" &&
        (koko.projects.length === 0 ? (
          <EmptyState
            icon="🤝"
            label="projects"
            actionLabel="Projects"
            actionPage="my-projects"
            setPage={setPage}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {koko.projects.map((p: any) => (
              <Card key={p.id} style={{ padding: 22 }} hover={false}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 7,
                        marginBottom: 8,
                        alignItems: "center",
                      }}
                    >
                      <Badge text="Active" color="#2563EB" />
                      <Badge text={p.stage} color="#7C3AED" />
                      <KokoBtn type="projects" item={p} size="sm" />
                    </div>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: "#1E293B",
                        margin: "0 0 3px",
                        fontFamily: "'Syne',sans-serif",
                      }}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 900,
                      color: "#2563EB",
                      fontFamily: "'Syne',sans-serif",
                      marginLeft: 20,
                    }}
                  >
                    {p.progress}%
                  </div>
                </div>
                <ProgressBar value={p.progress} color="#2563EB" h={5} />
                <div
                  style={{
                    display: "flex",
                    gap: 7,
                    marginTop: 12,
                  }}
                >
                  <Btn
                    size="sm"
                    color="#2563EB"
                    onClick={() => setPage("ip-" + p.ipId)}
                  >
                    Open Workspace →
                  </Btn>
                  <Btn
                    size="sm"
                    color="#EF4444"
                    variant="outline"
                    onClick={() => removeKoko("projects", p.id)}
                  >
                    Remove
                  </Btn>
                </div>
              </Card>
            ))}
          </div>
        ))}

      {tab === "roles" &&
        (koko.roles.length === 0 ? (
          <EmptyState
            icon="👥"
            label="roles"
            actionLabel="Roles"
            actionPage="recruitment"
            setPage={setPage}
          />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            {koko.roles.map((r: any) => (
              <Card key={r.id} style={{ padding: 22 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Badge
                      text={r.field}
                      color={CAT_COLORS[r.field as keyof typeof CAT_COLORS] || "#7C3AED"}
                    />
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#1E293B",
                        margin: "6px 0 3px",
                        fontFamily: "'Syne',sans-serif",
                      }}
                    >
                      {r.role}
                    </h3>
                  </div>
                  <KokoBtn type="roles" item={r} size="sm" />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 7,
                    paddingTop: 10,
                    borderTop: "1px solid #F1F5F9",
                  }}
                >
                  <Btn
                    size="sm"
                    color="#D97706"
                    onClick={() => setPage("recruitment")}
                  >
                    View →
                  </Btn>
                  <Btn
                    size="sm"
                    color="#EF4444"
                    variant="outline"
                    onClick={() => removeKoko("roles", r.id)}
                  >
                    Remove
                  </Btn>
                </div>
              </Card>
            ))}
          </div>
        ))}
    </div>
  );
};
