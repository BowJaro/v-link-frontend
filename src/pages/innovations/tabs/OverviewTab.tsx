import type { FC } from "react";
import { Card } from "../../../ui/primitives/Card";
import { SectionTitle } from "../../../ui/layout/PageHeader";
import { MilestoneCard } from "../../../components/MilestoneCard";

interface OverviewTabProps {
  ip: any;
  isOwner: boolean;
  addNotif: (notif: any) => void;
}

export const OverviewTab: FC<OverviewTabProps> = ({
  ip,
  isOwner,
  addNotif,
}) => {
  return (
    <Card style={{ padding: 24 }} hover={false}>
      <SectionTitle title="Abstract" />
      <p
        style={{
          fontSize: 13,
          color: "#64748B",
          lineHeight: 1.85,
          fontFamily: "'DM Sans',sans-serif",
          marginBottom: 16,
        }}
      >
        {ip.overview}
      </p>
      <SectionTitle title="📜 Chronicle — Milestones" />
      {ip.timeline.map((ms: any, i: number) => (
        <MilestoneCard
          key={ms.id}
          ms={ms}
          isLast={i === ip.timeline.length - 1}
          isOwner={isOwner}
          onComplete={() =>
            addNotif({
              type: "update",
              text: `Milestone "${ms.title}" marked complete.`,
            })
          }
        />
      ))}
    </Card>
  );
};
