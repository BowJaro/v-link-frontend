import type React from "react";
import { useState } from "react";

interface FundingPageProps {
  setPage: (page: string) => void;
}

interface FundingOpportunity {
  id: string;
  title: string;
  type: "ip" | "human" | "seeker";
  amount: number;
  stage: string;
  description: string;
  tags: string[];
}

const FUNDING_DATA: FundingOpportunity[] = [
  {
    id: "f1",
    title: "AI Crop Detection - Seed Round",
    type: "ip",
    amount: 500000,
    stage: "Seed",
    description: "Series A funding for AI crop disease detection technology",
    tags: ["AgriTech", "AI", "HealthTech"],
  },
  {
    id: "f2",
    title: "FinTech Payment Platform - Series B",
    type: "ip",
    amount: 2000000,
    stage: "Series B",
    description: "Scale out blockchain-based payment infrastructure",
    tags: ["FinTech", "Blockchain"],
  },
  {
    id: "f3",
    title: "Healthcare Innovator - Co-signing",
    type: "human",
    amount: 100000,
    stage: "Pre-Seed",
    description: "Support for early-stage healthcare founders",
    tags: ["HealthTech", "Founder"],
  },
  {
    id: "f4",
    title: "Manufacturing Tech Solutions",
    type: "seeker",
    amount: 750000,
    stage: "Growth",
    description: "Support for manufacturing companies adopting new tech",
    tags: ["Manufacturing", "Digital Transformation"],
  },
];

export const FundingPage: React.FC<FundingPageProps> = () => {
  const [activeTab, setActiveTab] = useState<"ip" | "human" | "seeker">("ip");

  const tabData = FUNDING_DATA.filter((f) => f.type === activeTab);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>Funding Opportunities</h1>
        <p style={{ color: "#64748B" }}>Connect with investors and find funding for your innovations</p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          borderBottom: "2px solid #E2E8F0",
          marginBottom: "2rem",
        }}
      >
        {[
          { id: "ip" as const, label: "Invest in IPs", icon: "✨" },
          { id: "human" as const, label: "Invest in Humans", icon: "👤" },
          { id: "seeker" as const, label: "Innovators Seeking Funding", icon: "🎯" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "1rem 0",
              border: "none",
              background: "transparent",
              color: activeTab === tab.id ? "#3B82F6" : "#64748B",
              fontWeight: activeTab === tab.id ? "700" : "500",
              cursor: "pointer",
              borderBottom: activeTab === tab.id ? "3px solid #3B82F6" : "none",
              marginBottom: "-2px",
              fontSize: "1rem",
              transition: "all 0.2s",
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Control toolbar */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search opportunities..."
          style={{
            padding: "0.75rem",
            border: "1px solid #E2E8F0",
            borderRadius: "0.75rem",
            flex: "1",
            maxWidth: "400px",
          }}
        />
        <select
          style={{
            padding: "0.75rem",
            border: "1px solid #E2E8F0",
            borderRadius: "0.75rem",
            maxWidth: "150px",
          }}
        >
          <option>All Stages</option>
          <option>Pre-Seed</option>
          <option>Seed</option>
          <option>Series A</option>
          <option>Series B</option>
          <option>Growth</option>
        </select>
        <select
          style={{
            padding: "0.75rem",
            border: "1px solid #E2E8F0",
            borderRadius: "0.75rem",
            maxWidth: "150px",
          }}
        >
          <option>Highest Amount</option>
          <option>Lowest Amount</option>
          <option>Recently Added</option>
        </select>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {tabData.map((opp) => (
          <div
            key={opp.id}
            style={{
              background: "white",
              border: "1px solid #E2E8F0",
              borderRadius: "1rem",
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "700", margin: 0 }}>
                  {opp.title}
                </h3>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "#EFF6FF",
                    color: "#1E40AF",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {opp.stage}
                </span>
              </div>

              <p style={{ color: "#64748B", margin: "0.5rem 0", fontSize: "0.95rem" }}>
                {opp.description}
              </p>

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                {opp.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: "#F1F5F9",
                      color: "#475569",
                      borderRadius: "0.5rem",
                      fontSize: "0.8rem",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "right", marginLeft: "2rem" }}>
              <div style={{ fontSize: "0.875rem", color: "#94A3B8", marginBottom: "0.5rem" }}>
                Funding Amount
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "#10B981", marginBottom: "0.75rem" }}>
                ${(opp.amount / 1000000).toFixed(1)}M
              </div>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "#3B82F6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {tabData.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#94A3B8" }}>
          <p>No funding opportunities found</p>
        </div>
      )}
    </div>
  );
};
