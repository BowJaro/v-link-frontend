import type React from "react";

interface AdminDashboardProps {
  setPage: (page: string) => void;
  argonautsList?: any[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const stats = [
    { label: "Total Users", value: "1,247", icon: "👥" },
    { label: "IPs Published", value: "432", icon: "✨" },
    { label: "Active Challenges", value: "28", icon: "🎯" },
    { label: "Total Funding", value: "$2.4M", icon: "💰" },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>⚙️ Admin Dashboard</h1>
        <p style={{ color: "#64748B" }}>Platform management and analytics</p>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "1rem", padding: "1.5rem", cursor: "pointer" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem", margin: 0 }}>📋 Manage Users</h3>
          <p style={{ color: "#64748B", fontSize: "0.9rem", margin: 0 }}>Review and manage user accounts</p>
        </div>
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "1rem", padding: "1.5rem", cursor: "pointer" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem", margin: 0 }}>✅ Moderate Content</h3>
          <p style={{ color: "#64748B", fontSize: "0.9rem", margin: 0 }}>Review and moderate published content</p>
        </div>
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "1rem", padding: "1.5rem", cursor: "pointer" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem", margin: 0 }}>🔧 Platform Settings</h3>
          <p style={{ color: "#64748B", fontSize: "0.9rem", margin: 0 }}>Configure platform and system settings</p>
        </div>
      </div>
    </div>
  );
};
