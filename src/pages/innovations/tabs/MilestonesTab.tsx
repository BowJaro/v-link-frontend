import type { FC } from "react";
import { Card } from "../../../ui/primitives/Card";
import { SectionTitle } from "../../../ui/layout/PageHeader";
import { ProgressBar } from "../../../ui/primitives/ProgressBar";
import { MilestoneCard } from "../../../components/MilestoneCard";

interface MilestonesTabProps {
  ip: any;
  isOwner: boolean;
  addNotif: (notif: any) => void;
}

export const MilestonesTab: FC<MilestonesTabProps> = ({
  ip,
  isOwner,
  addNotif,
}) => {
  const completedCount = ip.timeline.filter((m: any) => m.done).length;
  const totalCount = ip.timeline.length;
  const progressPct = (completedCount / totalCount) * 100;

  return (
    <Card style={{ padding: 24 }} hover={false}>
      <SectionTitle
        title="📜 Chronicle — Milestone Roadmap"
        sub={`${completedCount} / ${totalCount} complete`}
      />
      <ProgressBar value={progressPct} color="#2563EB" h={8} />
      <div style={{ marginTop: 20 }}>
        {ip.timeline.map((ms: any, i: number) => (
          <MilestoneCard
            key={ms.id}
            ms={ms}
            isLast={i === ip.timeline.length - 1}
            isOwner={isOwner}
            onComplete={() =>
              addNotif({
                type: "update",
                text: "Milestone done.",
              })
            }
          />
        ))}
      </div>
    </Card>
  );
};
