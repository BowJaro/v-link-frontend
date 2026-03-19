import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/primitives/Card";
import { PageHeader } from "../ui/layout/PageHeader";
import { Input } from "../ui/primitives/Input";
import { Btn } from "../ui/primitives/Button";

interface CreateChallengePageProps {
    setPage: (page: string) => void;
    addNotif?: (n: any) => void;
}

export const CreateChallengePage = ({ setPage, addNotif }: CreateChallengePageProps) => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    return (
        <div style={{ padding: "1rem", maxWidth: 760, margin: "0 auto" }}>
            <PageHeader title="Create Challenge" action={() => navigate("/challenges")} actionLabel="Back" />
            <Card style={{ padding: 20 }} hover={false}>
                <Input label="Challenge Title" value={title} onChange={setTitle} />
                <Btn color="#2563EB" onClick={() => {
                    addNotif?.({ type: "challenge", text: `Challenge '${title || "New Challenge"}' created.` });
                    setPage("challenges");
                }}>
                    Post Challenge
                </Btn>
            </Card>
        </div>
    );
};