import type React from "react";

interface MyProjectsPageProps {
  setPage: (page: string) => void;
  role?: string;
}

export const MyProjectsPage: React.FC<MyProjectsPageProps> = () => {
  const projects = [
    { id: "p1", title: "AI-Powered Crop Detection", status: "active", team: 5, progress: 75 },
    { id: "p2", title: "Supply Chain Optimization", status: "planning", team: 3, progress: 30 },
    { id: "p3", title: "Healthcare IoT Sensors", status: "completed", team: 7, progress: 100 },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "2rem" }}>My Projects</h1>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {projects.map((project) => (
          <div key={project.id} style={{
            background: "white",
            border: "1px solid #E2E8F0",
            borderRadius: "1rem",
            padding: "1.5rem",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: "700", fontSize: "1.1rem", margin: 0 }}>{project.title}</h3>
              <span style={{
                padding: "0.25rem 0.75rem",
                background: project.status === "active" ? "#DCFCE7" : project.status === "planning" ? "#FEF3C7" : "#E5E7EB",
                color: project.status === "active" ? "#16A34A" : project.status === "planning" ? "#CA8A04" : "#4B5563",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: "600",
              }}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div>
                <div style={{ color: "#64748B", fontSize: "0.9rem" }}>Progress</div>
                <div style={{
                  width: "200px",
                  height: "8px",
                  background: "#E2E8F0",
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginTop: "0.25rem",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${project.progress}%`,
                    background: "#3B82F6",
                    transition: "width 0.3s",
                  }} />
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#64748B", fontSize: "0.9rem" }}>Team Members</div>
                <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>{project.team}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
