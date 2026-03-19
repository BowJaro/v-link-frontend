import type React from "react";

interface InvestorDashboardProps {
  setPage: (page: string) => void;
  argonautsList?: any[];
}

export const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ setPage, argonautsList }) => {
  void setPage;
  void argonautsList;
  return <div>InvestorDashboard component stub</div>;
};
