import { useNavigate } from "react-router-dom";
import { Card } from "../ui/primitives/Card";
import { PageHeader } from "../ui/layout/PageHeader";
import { CHALLENGES } from "../data/mockData";

export const MyChallengesPage = () => {
    const navigate = useNavigate();
    return (
        <div style={{ padding: "2rem", maxWidth: 1000, margin: "0 auto" }}>
            <PageHeader title="My Challenges" sub="Your posted and tracked challenges." />
            <div style={{ display: "grid", gap: 12 }}>
                {CHALLENGES.map((c) => (
                    <Card
                        key={c.id}
                        hover
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/challenges/${c.id}`)}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 18 }}>{c.title}</h3>
                                <div style={{ color: "#64748B", marginTop: 4 }}>{c.org} · {c.industry}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontWeight: 700, color: "#2563EB", fontSize: 14 }}>{c.reward}</div>
                                <div style={{ color: "#64748B", fontSize: 12 }}>Due {new Date(c.deadline).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
