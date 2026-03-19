import type React from "react";

interface RecruitmentPageProps {
  setPage: (page: string) => void;
  addNotif?: (notif: any) => void;
}

export const RecruitmentPage: React.FC<RecruitmentPageProps> = ({ setPage, addNotif }) => {
  void setPage;
  void addNotif;
  return <div>RecruitmentPage component stub</div>;
};
