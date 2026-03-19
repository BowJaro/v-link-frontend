import type React from "react";

interface DashboardPageProps {
    setPage?: (page: string) => void;
    role?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = () => {
    return (
        <div style={{ padding: "2rem", textAlign: "center", color: "#94A3B8" }}>
            <h1 style={{ marginBottom: "2rem" }}>Dashboard</h1>
            <p>Dashboard content appears here</p>
        </div>
    );
};

export default DashboardPage;
