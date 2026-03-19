import type { FC } from "react";

// UI Components
import { Card } from "../../ui/primitives/Card";
import { Badge } from "../../ui/primitives/Badge";
import { SectionTitle } from "../../ui/layout/PageHeader";
import { TRLBadge, TRLMeter } from "../../components/ip/TRLBadge";
import { KokoBtn } from "../../components/KokoBtn";

// Cards
import { ArgonautsCard } from "../../components/ArgonautsCard";

// Data & Constants
import { IP_DATA } from "../../config/mockData";
import { CAT_COLORS } from "../../config/constants";

interface Argonaut {
  id: string;
  title: string;
  org: string;
  field: string;
  status: string;
  fundingCommitment: string;
  teamSize: number;
  desc: string;
  disciplines: string[];
  candidates: Array<{ id: string; status: string }>;
}

interface HomePageProps {
  setPage: (page: string) => void;
  argonautsList: Argonaut[];
}

export const HomePage: FC<HomePageProps> = ({ setPage, argonautsList }) => (
  <div>
    <div
      style={{
        background: "linear-gradient(135deg,#0F172A 0%,#1E3A8A 55%,#0891B2 100%)",
        borderRadius: 24,
        padding: "56px 52px",
        marginBottom: 28,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
        }}
      />
      <div style={{ position: "relative", maxWidth: 620 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 20,
            padding: "5px 14px",
            marginBottom: 18,
          }}
        >
          <span>🏫</span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              fontWeight: 600,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            VNU – Ho Chi Minh City · Official Innovation Platform
          </span>
        </div>
        <h1
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: "#fff",
            margin: "0 0 14px",
            fontFamily: "'Syne',sans-serif",
            lineHeight: 1.1,
          }}
        >
          VNU HCMC
          <br />
          <span style={{ color: "#7DD3FC" }}>Innovation Exchange</span>
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.85,
            margin: "0 0 28px",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          A living marketplace connecting research IP, Argonauts grand challenges,
          industry problems, investment capital, and strategic partnerships.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {([
            ["Browse Innovations", "#fff", "innovations"],
            ["⚔ Argonauts", "rgba(124,58,237,0.8)", "argonauts"],
            ["Post Challenge", "rgba(255,255,255,0.15)", "challenges"],
          ] as const).map(([l, bg, pg], i) => (
            <button
              key={i}
              onClick={() => setPage(pg as string)}
              style={{
                padding: "11px 22px",
                borderRadius: 12,
                background: bg as string,
                color:
                  i === 0 ? "#1D4ED8" : "rgba(255,255,255,0.95)",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                border:
                  i === 0
                    ? "none"
                    : "2px solid rgba(255,255,255,0.3)",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gap: 14,
        marginBottom: 26,
      }}
    >
      {([
        { icon: "◈", v: "247", l: "IPs Listed", c: "#2563EB" },
        { icon: "⚔", v: argonautsList.length, l: "Argonauts", c: "#7C3AED" },
        { icon: "◎", v: "38", l: "Challenges", c: "#D97706" },
        { icon: "💼", v: "47", l: "Investors", c: "#059669" },
        { icon: "🤝", v: "12", l: "Projects", c: "#0891B2" },
      ] as const).map((s, i) => (
        <Card key={i} style={{ padding: 18, textAlign: "center" }} hover={false}>
          <div style={{ fontSize: 20, marginBottom: 5 }}>{s.icon}</div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: s.c,
              fontFamily: "'Syne',sans-serif",
              lineHeight: 1,
            }}
          >
            {s.v}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#94A3B8",
              marginTop: 4,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            {s.l}
          </div>
        </Card>
      ))}
    </div>
    <SectionTitle
      title="⚔ Featured Argonauts Missions"
      action={() => setPage("argonauts")}
      actionLabel="All Missions →"
    />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 16,
        marginBottom: 26,
      }}
    >
      {argonautsList.slice(0, 3).map((arg) => (
        <ArgonautsCard
          key={arg.id}
          arg={arg}
          onClick={() => setPage("arg-" + arg.id)}
        />
      ))}
    </div>
    <SectionTitle
      title="Featured Innovations"
      action={() => setPage("innovations")}
      actionLabel="View All →"
    />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 14,
      }}
    >
      {IP_DATA.filter((i) => i.status === "published")
        .slice(0, 3)
        .map((ip) => (
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
          </Card>
        ))}
    </div>
  </div>
);
