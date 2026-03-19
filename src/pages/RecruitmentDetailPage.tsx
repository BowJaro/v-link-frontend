import { useParams } from "react-router-dom";
import { Card } from "../ui/primitives/Card";
import { PageHeader } from "../ui/layout/PageHeader";

export const RecruitmentDetailPage = () => {
    const { id } = useParams();

    return (
        <div style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
            <PageHeader title="Recruitment Detail" sub={`Recruitment ID: ${id}`} />
            <Card style={{ padding: 20 }} hover={false}>
                <p style={{ color: "#475569", lineHeight: 1.6 }}>
                    This page is a placeholder detail view for recruitment ID <strong>{id}</strong>. Use this for candidate or team detail flows.
                </p>
            </Card>
        </div>
    );
};
