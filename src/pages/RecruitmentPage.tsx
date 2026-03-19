import type React from "react";
import { useState } from "react";

interface RecruitmentPageProps {
  setPage: (page: string) => void;
  addNotif?: (notif: any) => void;
}

interface Talent {
  id: string;
  name: string;
  title: string;
  skills: string[];
  availability: "available" | "on-mission" | "unavailable";
  teamSize?: number;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
  teamType: "long-term" | "mission";
  openRoles: string[];
  lookingFor: string;
}

const TALENTS: Talent[] = [
  {
    id: "t1",
    name: "Nguyen Van A",
    title: "Full Stack Engineer",
    skills: ["React", "Node.js", "Python", "AWS"],
    availability: "available",
  },
  {
    id: "t2",
    name: "Tran Thi B",
    title: "Data Scientist",
    skills: ["Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
    availability: "available",
  },
  {
    id: "t3",
    name: "Le Van C",
    title: "Product Manager",
    skills: ["Product Strategy", "Agile", "Analytics"],
    availability: "available",
  },
];

const TEAMS: Team[] = [
  {
    id: "tm1",
    name: "AI Solutions Team",
    description: "Building AI-powered solutions for enterprise",
    members: 5,
    teamType: "long-term",
    openRoles: ["Senior Engineer", "Data Scientist"],
    lookingFor: "Experienced AI/ML practitioners for core research",
  },
  {
    id: "tm2",
    name: "FinTech Startup",
    description: "Blockchain-based payment platform",
    members: 3,
    teamType: "long-term",
    openRoles: ["Backend Engineer", "DevOps"],
    lookingFor: "Strong backend engineers with blockchain experience",
  },
  {
    id: "tm3",
    name: "CropTech Mission Team",
    description: "3-month mission: develop IoT sensors for agriculture",
    members: 4,
    teamType: "mission",
    openRoles: ["Mechanical Engineer", "Firmware Engineer"],
    lookingFor: "Hardware specialists for IoT sensor development",
  },
];

export const RecruitmentPage: React.FC<RecruitmentPageProps> = ({ setPage, addNotif }) => {
  const [activeTab, setActiveTab] = useState<"teams" | "talents">("teams");

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>Recruitment</h1>
          <p style={{ color: "#64748B" }}>Find teams or talents for your next mission</p>
        </div>
        <button
          style={{
            padding: "0.75rem 1.5rem",
            background: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "0.75rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          + Create Long-Term Team
        </button>
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
          { id: "teams" as const, label: "Teams Seeking Talents", icon: "🤝" },
          { id: "talents" as const, label: "Talents Seeking Teams", icon: "⭐" },
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
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder={activeTab === "teams" ? "Search teams..." : "Search talents..."}
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
          }}
        >
          <option>All Types</option>
          {activeTab === "teams" ? (
            <>
              <option>Long-Term</option>
              <option>Mission-Based</option>
            </>
          ) : (
            <>
              <option>Available</option>
              <option>On Mission</option>
            </>
          )}
        </select>
      </div>

      {/* Content */}
      {activeTab === "teams" ? (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {TEAMS.map((team) => (
            <div
              key={team.id}
              style={{
                background: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "1rem",
                padding: "1.5rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.25rem", margin: 0 }}>
                    {team.name}
                  </h3>
                  <p style={{ color: "#64748B", margin: 0, fontSize: "0.95rem" }}>
                    {team.description}
                  </p>
                </div>
                <span
                  style={{
                    padding: "0.5rem 0.75rem",
                    background: team.teamType === "long-term" ? "#EFF6FF" : "#F0FDF4",
                    color: team.teamType === "long-term" ? "#1E40AF" : "#166534",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {team.teamType === "long-term" ? "🏢 Long-Term" : "🎯 Mission"}
                </span>
              </div>

              <p style={{ color: "#64748B", marginBottom: "1rem", fontSize: "0.95rem" }}>
                {team.lookingFor}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "2rem", marginBottom: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginBottom: "0.25rem" }}>
                    Current Members
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{team.members}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginBottom: "0.25rem" }}>
                    Open Positions
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{team.openRoles.length}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                {team.openRoles.map((role) => (
                  <span
                    key={role}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#F1F5F9",
                      color: "#475569",
                      borderRadius: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>

              <button
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#10B981",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                View Details & Apply
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {TALENTS.map((talent) => (
            <div
              key={talent.id}
              style={{
                background: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "1rem",
                padding: "1.5rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                <div>
                  <h4 style={{ fontWeight: "700", fontSize: "1.1rem", margin: 0, marginBottom: "0.25rem" }}>
                    {talent.name}
                  </h4>
                  <p style={{ color: "#64748B", fontSize: "0.9rem", margin: 0 }}>
                    {talent.title}
                  </p>
                </div>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "#DCFCE7",
                    color: "#16A34A",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  ✓ Available
                </span>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                {talent.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: "#DBEAFE",
                      color: "#1E40AF",
                      borderRadius: "0.5rem",
                      fontSize: "0.8rem",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "#3B82F6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
