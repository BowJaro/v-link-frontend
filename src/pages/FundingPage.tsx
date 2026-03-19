import type React from "react";

interface FundingPageProps {
  setPage: (page: string) => void;
}

export const FundingPage: React.FC<FundingPageProps> = ({ setPage }) => {
  void setPage;
  return <div>FundingPage component stub</div>;
};
