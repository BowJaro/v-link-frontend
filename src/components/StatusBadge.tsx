import React from "react";
import { Badge } from "./Badge";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const STATUS_CFG = {
    draft: { label: "Draft", color: "#94A3B8" },
    pending: { label: "Pending Review", color: "#F59E0B" },
    published: { label: "Published", color: "#10B981" },
    rejected: { label: "Rejected", color: "#EF4444" },
    active: { label: "Active Project", color: "#2563EB" },
  } as const;

  const c = STATUS_CFG[status as keyof typeof STATUS_CFG] || { label: status, color: "#94A3B8" };
  return <Badge text={c.label} color={c.color} />;
};
