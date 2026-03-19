import type React from "react";

interface MyFundingPageProps {
    setPage?: (page: string) => void;
}

export const MyFundingPage: React.FC<MyFundingPageProps> = () => {
    const fundedProjects = [
        { id: "f1", title: "AI Crop Detection", raised: "$500k", status: "active" },
        { id: "f2", title: "IoT Sensors", raised: "$250k", status: "completed" },
    ];

    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "2rem" }}>My Funding</h1>
            <div style={{ display: "grid", gap: "1.5rem" }}>
                {fundedProjects.map((project) => (
                    <div key={project.id} style={{
                        background: "white",
                        border: "1px solid #E2E8F0",
                        borderRadius: "1rem",
                        padding: "1.5rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <div>
                            <h3 style={{ fontWeight: "700", margin: 0, marginBottom: "0.25rem" }}>{project.title}</h3>
                            <p style={{ color: "#64748B", margin: 0, fontSize: "0.9rem" }}>Raised: {project.raised}</p>
                        </div>
                        <span style={{
                            padding: "0.5rem 1rem",
                            background: "#DCFCE7",
                            color: "#16A34A",
                            borderRadius: "0.5rem",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                        }}>
                            {project.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFundingPage;
