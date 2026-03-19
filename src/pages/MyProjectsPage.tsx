import type React from "react";

interface MyProjectsPageProps {
  setPage: (page: string) => void;
  role?: string;
}

export const MyProjectsPage: React.FC<MyProjectsPageProps> = ({ setPage, role }) => {
  void setPage;
  void role;
  return <div>MyProjectsPage component stub</div>;
};
