import type React from "react";

interface KokoWidgetProps {
  setPage?: (page: string) => void;
}

export const KokoWidget: React.FC<KokoWidgetProps> = ({ setPage }) => {
  void setPage;
  return <div>KokoWidget component stub</div>;
};
