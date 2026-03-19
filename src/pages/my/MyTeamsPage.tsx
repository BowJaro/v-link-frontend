import type React from "react";

interface MyTeamsPageProps {
    setPage?: (page: string) => void;
}

export const MyTeamsPage: React.FC<MyTeamsPageProps> = () => {
    const teams = [
        { id: "t1", name: "AI Research Lab", type: "long-term", members: 5, status: "active" },
        { id: "t2", name: "CropTech Mission", type: "mission", members: 4, status: "active" },
    ];

    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "2rem" }}>My Teams</h1>
            <div style={{ display: "grid", gap: "1.5rem" }}>
                {teams.map((team) => (
                    <div key={team.id} style={{
                        background: "white",
                        border: "1px solid #E2E8F0",
                        borderRadius: "1rem",
                        padding: "1.5rem",
                    }}>
                        <h3 style={{ fontWeight: "700", margin: 0, marginBottom: "0.5rem" }}>{team.name}</h3>
                        <p style={{ color: "#64748B", margin: 0, marginBottom: "1rem", fontSize: "0.9rem" }}>
                            {team.type === "long-term" ? "🏢 Long-term Team" : "🎯 Mission Team"} • {team.members} members
                        </p>
                        <button style={{
                            padding: "0.5rem 1rem",
                            background: "#3B82F6",
                            color: "white",
                            border: "none",
                            borderRadius: "0.5rem",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}>
                            View Team
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTeamsPage;
