import type React from "react";

interface SeekerDashboardProps {
  setPage: (page: string) => void;
  addNotif?: (notif: any) => void;
  argonautsList?: any[];
}

export const SeekerDashboard: React.FC<SeekerDashboardProps> = ({ setPage, addNotif, argonautsList }) => {
  void setPage;
  void addNotif;
  void argonautsList;
  return <div>SeekerDashboard component stub</div>;
};
