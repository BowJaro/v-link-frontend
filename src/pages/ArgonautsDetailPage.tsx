import type React from "react";

interface ArgonautsDetailPageProps {
  arg?: any;
  setPage: (page: string) => void;
  role?: string;
  addNotif?: (notif: any) => void;
  updateArgonauts?: (data: any) => void;
}

export const ArgonautsDetailPage: React.FC<ArgonautsDetailPageProps> = ({ arg, setPage, role, addNotif, updateArgonauts }) => {
  void arg;
  void setPage;
  void role;
  void addNotif;
  void updateArgonauts;
  return <div>ArgonautsDetailPage component stub</div>;
};
