import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../ui/primitives/Card";
import { PageHeader } from "../ui/layout/PageHeader";
import { Btn } from "../ui/primitives/Button";
import { CHALLENGES } from "../data/mockData";

export const ChallengeDetailPage = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const id = params.id;
    const challenge = CHALLENGES.find((c) => c.id === id);

    if (!challenge) {
        return (
            <div style={{ padding: "2rem", textAlign: "center", color: "#64748B" }}>
                <h2>Challenge Not Found</h2>
                <p>The challenge ID “{id}” could not be found.</p>
                <Btn onClick={() => navigate("/challenges")}>Back to Challenges</Btn>
            </div>
        );
    }

    return (
        <div style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
            <PageHeader
                title={challenge.title}
                sub={`${challenge.org} • ${challenge.industry}`}
                badge="🎯 Challenge"
                action={() => navigate("/challenges")}
                actionLabel="Back"
            />
            <Card style={{ padding: 20, marginBottom: 16 }} hover={false}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <div>
                        <div style={{ fontSize: 13, color: "#475569", marginBottom: 8 }}>Status</div>
                        <div style={{ fontSize: 20, fontWeight: 700 }}>{challenge.status.toUpperCase()}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 13, color: "#475569", marginBottom: 8 }}>Reward</div>
                        <div style={{ fontSize: 20, fontWeight: 700 }}>{challenge.reward}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 13, color: "#475569", marginBottom: 8 }}>Deadline</div>
                        <div style={{ fontSize: 20, fontWeight: 700 }}>{new Date(challenge.deadline).toLocaleDateString()}</div>
                    </div>
                </div>
            </Card>

            <Card style={{ padding: 20, marginBottom: 16 }} hover={false}>
                <h3 style={{ margin: 0, fontSize: 18 }}>Overview</h3>
                <p style={{ marginTop: 10, color: "#475569", lineHeight: 1.6 }}>{challenge.desc}</p>
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {challenge.tags.map((tag) => (
                        <span key={tag} style={{ padding: "0.22rem 0.6rem", borderRadius: 8, background: "#E2E8F0", color: "#1F2937", fontSize: 12 }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </Card>

            <Card style={{ padding: 20 }} hover={false}>
                <h3 style={{ margin: 0, fontSize: 18, marginBottom: 10 }}>Opportunity</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(100px, 1fr))", gap: 10 }}>
                    <div style={{ borderRadius: 10, background: "#F8FAFC", border: "1px solid #E2E8F0", padding: 12 }}>
                        <div style={{ fontSize: 11, color: "#94A3B8" }}>Proposals</div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{challenge.proposals}</div>
                    </div>
                    <div style={{ borderRadius: 10, background: "#F8FAFC", border: "1px solid #E2E8F0", padding: 12 }}>
                        <div style={{ fontSize: 11, color: "#94A3B8" }}>Urgent</div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{challenge.urgent ? "Yes" : "No"}</div>
                    </div>
                    <div style={{ borderRadius: 10, background: "#F8FAFC", border: "1px solid #E2E8F0", padding: 12 }}>
                        <div style={{ fontSize: 11, color: "#94A3B8" }}>Industry</div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{challenge.industry}</div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
