import type React from "react";

interface ProfilePageProps {
    setPage?: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = () => {
    const profile = {
        name: "Dr. Nguyen Thi Lan",
        role: "innovator",
        title: "Innovation Leader at FIT Lab – UIT",
        bio: "Passionate about AI and sustainable technologies with 10+ years of research experience",
        stats: [
            { label: "IPs Published", value: "4" },
            { label: "Collaborations", value: "12" },
            { label: "Funding Raised", value: "$125k" },
        ],
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "1.5rem", padding: "2rem" }}>
                {/* Header */}
                <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
                    <div
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #3B82F6, #1E40AF)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "3rem",
                            color: "white",
                        }}
                    >
                        👤
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: "2rem", fontWeight: "800", margin: 0, marginBottom: "0.5rem" }}>
                            {profile.name}
                        </h1>
                        <p style={{ color: "#64748B", margin: 0, marginBottom: "0.5rem", fontSize: "1.1rem" }}>
                            {profile.title}
                        </p>
                        <p style={{ color: "#64748B", margin: 0, fontSize: "0.95rem" }}>
                            {profile.bio}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.5rem", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid #E2E8F0" }}>
                    {profile.stats.map((stat, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "2rem", fontWeight: "800", color: "#3B82F6" }}>
                                {stat.value}
                            </div>
                            <div style={{ color: "#64748B", fontSize: "0.9rem" }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status Toggles */}
                <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", margin: 0 }}>
                        Availability Status
                    </h3>
                    <div style={{ display: "grid", gap: "1rem" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                            <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                            <span>Available for team collaboration</span>
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                            <input type="checkbox" style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                            <span>Open for investment opportunities</span>
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                            <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                            <span>Interested in Argonauts missions</span>
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "1rem" }}>
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
                        Edit Profile
                    </button>
                    <button
                        style={{
                            padding: "0.75rem 1.5rem",
                            background: "white",
                            color: "#3B82F6",
                            border: "2px solid #3B82F6",
                            borderRadius: "0.75rem",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
