import type React from "react";

interface InnovatorDashboardProps {
  setPage: (page: string) => void;
  addNotif?: (notif: any) => void;
  argonautsList?: any[];
}

export const InnovatorDashboard: React.FC<InnovatorDashboardProps> = ({ setPage, addNotif, argonautsList }) => {
  void setPage;
  void addNotif;
  void argonautsList;
  return <div>InnovatorDashboard component stub</div>;
};
