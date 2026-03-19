import type React from "react";

interface PostArgonautsPageProps {
  setPage: (page: string) => void;
  addNotif?: (notif: any) => void;
  addArgonauts?: (arg: any) => void;
  editData?: any;
  onUpdate?: (data: any) => void;
}

export const PostArgonautsPage: React.FC<PostArgonautsPageProps> = ({
  setPage,
  addNotif,
  addArgonauts,
  editData,
  onUpdate,
}) => {
  void setPage;
  void addNotif;
  void addArgonauts;
  void editData;
  void onUpdate;
  return <div>PostArgonautsPage component stub</div>;
};
