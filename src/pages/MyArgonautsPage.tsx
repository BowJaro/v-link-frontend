import { useNavigate } from "react-router-dom";
import { Card } from "../ui/primitives/Card";
import { PageHeader } from "../ui/layout/PageHeader";
import { ARGONAUTS_DATA_INIT } from "../data/mockData";

export const MyArgonautsPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: "2rem", maxWidth: 1000, margin: "0 auto" }}>
            <PageHeader title="My Argonauts" sub="Your active missions and proposals." />
            <div style={{ display: "grid", gap: 12 }}>
                {ARGONAUTS_DATA_INIT.map((a) => (
                    <Card
                        key={a.id}
                        hover
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/argonauts/${a.id}`)}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 18 }}>{a.title}</h3>
                                <div style={{ color: "#64748B", marginTop: 4 }}>{a.org}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontWeight: 700, fontSize: 13 }}>{a.status.toUpperCase()}</div>
                                <div style={{ color: "#64748B", fontSize: 12 }}>{a.teamSize} team size</div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
