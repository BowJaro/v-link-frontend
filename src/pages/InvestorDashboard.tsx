import type React from "react";

interface InvestorDashboardProps {
  setPage: (page: string) => void;
  argonautsList?: any[];
}

export const InvestorDashboard: React.FC<InvestorDashboardProps> = () => {
  const portfolio = [
    { title: "AI Crop Detection", stake: "12%", value: "$180k", status: "Growth" },
    { title: "FinTech Platform", stake: "5%", value: "$95k", status: "Series A" },
    { title: "HealthCare IoT", stake: "8%", value: "$120k", status: "Seed" },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>💼 Investor Dashboard</h1>
        <p style={{ color: "#64748B" }}>Manage your investment portfolio</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "1rem", padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💰</div>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "#10B981", marginBottom: "0.25rem" }}>$395k</div>
          <div style={{ color: "#64748B", fontSize: "0.9rem" }}>Total Invested</div>
        </div>
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "1rem", padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📈</div>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "#3B82F6", marginBottom: "0.25rem" }}>+18%</div>
          <div style={{ color: "#64748B", fontSize: "0.9rem" }}>Portfolio Return</div>
        </div>
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "1rem", padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎯</div>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "#F59E0B", marginBottom: "0.25rem" }}>3</div>
          <div style={{ color: "#64748B", fontSize: "0.9rem" }}>Active Companies</div>
        </div>
      </div>

      <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "1rem", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem", marginTop: 0 }}>Your Portfolio</h2>
        {portfolio.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "1rem", borderBottom: i < portfolio.length - 1 ? "1px solid #E2E8F0" : "none", marginBottom: "1rem" }}>
            <div>
              <h4 style={{ fontWeight: "700", margin: 0, marginBottom: "0.25rem" }}>{item.title}</h4>
              <p style={{ color: "#64748B", margin: 0, fontSize: "0.9rem" }}>Stake: {item.stake}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "700", fontSize: "1.1rem", color: "#10B981" }}>{item.value}</div>
              <span style={{ background: "#EFF6FF", color: "#1E40AF", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.8rem" }}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
