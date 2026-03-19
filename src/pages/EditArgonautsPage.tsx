import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../ui/primitives/Card";
import { PageHeader } from "../ui/layout/PageHeader";
import { Input } from "../ui/primitives/Input";
import { Btn } from "../ui/primitives/Button";
import { ARGONAUTS_DATA_INIT } from "../data/mockData";

interface EditArgonautsPageProps {
    argonautsList: any[];
    updateArgonauts: (arg: any) => void;
    addNotif?: (n: any) => void;
}

export const EditArgonautsPage = ({ argonautsList, updateArgonauts, addNotif }: EditArgonautsPageProps) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const current = argonautsList.find((a) => a.id === id) || ARGONAUTS_DATA_INIT[0];
    const [title, setTitle] = useState(current.title);

    return (
        <div style={{ padding: "1rem", maxWidth: 800, margin: "0 auto" }}>
            <PageHeader title="Edit Argonauts Mission" sub={current.title} action={() => navigate("/argonauts")} actionLabel="Back" />
            <Card style={{ padding: 20 }} hover={false}>
                <Input label="Mission Title" value={title} onChange={setTitle} />
                <Btn color="#2563EB" onClick={() => {
                    updateArgonauts({ ...current, title });
                    addNotif?.({ type: "update", text: "Mission updated" });
                    navigate(`/argonauts/${current.id}`);
                }}>
                    Save
                </Btn>
            </Card>
        </div>
    );
};