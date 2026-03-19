import type React from "react";

interface ChallengeMarketplaceProps {
  setPage: (page: string) => void;
  addNotif?: (notif: any) => void;
}

export const ChallengeMarketplace: React.FC<ChallengeMarketplaceProps> = ({ setPage, addNotif }) => {
  void setPage;
  void addNotif;
  return <div>ChallengeMarketplace component stub</div>;
};
