import type React from "react";

interface AdminDashboardProps {
  setPage: (page: string) => void;
  argonautsList?: any[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setPage, argonautsList }) => {
  void setPage;
  void argonautsList;
  return <div>AdminDashboard component stub</div>;
};
