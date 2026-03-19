import type React from "react";

interface SeekerDashboardProps {
  setPage: (page: string) => void;
  addNotif?: (notif: any) => void;
  argonautsList?: any[];
}

export const SeekerDashboard: React.FC<SeekerDashboardProps> = ({ setPage, addNotif, argonautsList }) => {
  const stats = [
    { label: "Innovations Discovered", value: "23", icon: "🔍" },
    { label: "Active Projects", value: "3", icon: "📊" },
    { label: "Tech Acquired", value: "7", icon: "🛠️" },
    { label: "Team Members", value: "15", icon: "👥" },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>
          🏢 Seeker Dashboard
        </h1>
        <p style={{ color: "#64748B" }}>Discover innovations and manage your projects</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: "white",
            border: "1px solid #E2E8F0",
            borderRadius: "1rem",
            padding: "1.5rem",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
            <div style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.25rem" }}>{stat.value}</div>
            <div style={{ color: "#64748B", fontSize: "0.9rem" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "1rem", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem", marginTop: 0 }}>Recommended Innovations</h2>
        <div style={{ color: "#94A3B8", textAlign: "center", padding: "2rem" }}>
          <p>Personalized recommendations will appear here</p>
        </div>
      </div>
    </div>
  );
};
