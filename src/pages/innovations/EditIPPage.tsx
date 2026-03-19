import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../ui/primitives/Card";
import { PageHeader } from "../../ui/layout/PageHeader";
import { Input } from "../../ui/primitives/Input";
import { Btn } from "../../ui/primitives/Button";
import { IP_DATA } from "../../data/mockData";

interface EditIPPageProps {
    setPage: (page: string) => void;
}

export const EditIPPage = ({ setPage }: EditIPPageProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const ip = IP_DATA.find((item) => item.id === id);
    const [title, setTitle] = useState(ip?.title || "");

    if (!ip) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>IP not found</h2>
                <Btn onClick={() => navigate("/museion")}>Back</Btn>
            </div>
        );
    }

    return (
        <div style={{ padding: "1rem", maxWidth: 800, margin: "0 auto" }}>
            <PageHeader title="Edit Innovation" sub={ip.title} action={() => navigate("/museion")} actionLabel="Back" />
            <Card style={{ padding: 20 }} hover={false}>
                <Input label="Title" value={title} onChange={setTitle} />
                <Btn color="#2563EB" onClick={() => setPage("museion")}>
                    Save
                </Btn>
            </Card>
        </div>
    );
};