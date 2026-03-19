import type { FC } from "react";
import { useState } from "react";

// UI Components
import { Card } from "../../ui/primitives/Card";
import { Btn } from "../../ui/primitives/Button";
import { BackBtn } from "../../ui/layout/BackButton";
import { PageHeader } from "../../ui/layout/PageHeader";
import { Input } from "../../ui/primitives/Input";
import { Sel } from "../../ui/primitives/Select";

// Data & Constants
import { FIELDS_LIST } from "../../config/constants";

interface CreateIPPageProps {
  setPage: (page: string) => void;
  addNotif: (notif: any) => void;
}

export const CreateIPPage: FC<CreateIPPageProps> = ({ setPage, addNotif }) => {
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <BackBtn onClick={() => setPage("my-innovations")} />
      <PageHeader title="Create New IP" />
      <Card style={{ padding: 28 }} hover={false}>
        <Input
          label="IP Title"
          value={title}
          onChange={setTitle}
          placeholder="e.g. AI-Powered Rice Disease Detection"
          required
        />
        <Sel
          label="Field"
          value={field}
          onChange={setField}
          options={FIELDS_LIST}
          required
        />
        <Input
          label="Short Description"
          value={desc}
          onChange={setDesc}
          rows={3}
          placeholder="Describe your innovation…"
        />
        <Btn
          full
          color="#2563EB"
          onClick={() => {
            if (title && field) {
              addNotif({
                type: "approval",
                text: `"${title}" submitted for review.`,
              });
              setPage("my-innovations");
            }
          }}
        >
          Submit IP →
        </Btn>
      </Card>
    </div>
  );
};
