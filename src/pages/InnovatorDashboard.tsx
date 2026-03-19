import type React from "react";

interface InnovatorDashboardProps {
  setPage: (page: string) => void;
  addNotif?: (notif: any) => void;
  argonautsList?: any[];
}

export const InnovatorDashboard: React.FC<InnovatorDashboardProps> = ({ setPage, addNotif, argonautsList }) => {
  void setPage;
  void addNotif;
  void argonautsList;

  const stats = [
    { label: "My IPs", value: "4", icon: "✨", color: "#3B82F6" },
    { label: "Active Collaborations", value: "2", icon: "🤝", color: "#10B981" },
    { label: "Argonauts Joined", value: "1", icon: "🚀", color: "#F59E0B" },
    { label: "Funding Raised", value: "$125k", icon: "💰", color: "#8B5CF6" },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>
          🔬 Innovator Dashboard
        </h1>
        <p style={{ color: "#64748B" }}>Track your innovations, collaborations, and funding</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: "white",
              border: "1px solid #E2E8F0",
              borderRadius: "1rem",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: stat.color, marginBottom: "0.25rem" }}>
              {stat.value}
            </div>
            <div style={{ color: "#64748B", fontSize: "0.9rem" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
            borderRadius: "1rem",
            padding: "2rem",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => setPage("create-ip")}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 25px -5px rgba(30, 64, 175, 0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>✨</div>
          <h3 style={{ fontWeight: "700", marginBottom: "0.5rem", margin: 0 }}>Publish New IP</h3>
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: "0.9" }}>
            Share your innovation with the community
          </p>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
            borderRadius: "1rem",
            padding: "2rem",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => setPage("post-argonauts")}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 25px -5px rgba(5, 150, 105, 0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🚀</div>
          <h3 style={{ fontWeight: "700", marginBottom: "0.5rem", margin: 0 }}>Start Argonauts Mission</h3>
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: "0.9" }}>
            Recruit talents to build your team
          </p>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            borderRadius: "1rem",
            padding: "2rem",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => setPage("funding")}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 25px -5px rgba(217, 119, 6, 0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>💰</div>
          <h3 style={{ fontWeight: "700", marginBottom: "0.5rem", margin: 0 }}>Find Funding</h3>
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: "0.9" }}>
            Connect with investors
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "1rem", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem", marginTop: 0 }}>
          Recent Activity
        </h2>
        <div style={{ color: "#94A3B8", textAlign: "center", padding: "2rem" }}>
          <p>Your recent activities will appear here</p>
        </div>
      </div>
    </div>
  );
};
