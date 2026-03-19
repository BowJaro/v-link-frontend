import { Card } from "./Card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

export const StatCard = ({
  label,
  value,
  icon,
  color = "#2563EB",
  onClick,
}: StatCardProps) => (
  <Card style={{ padding: 20 }} hover={!!onClick} onClick={onClick}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 10,
            color: "#94A3B8",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            marginBottom: 5,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: "#1E293B",
            fontFamily: "'Syne',sans-serif",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
      </div>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
        }}
      >
        {icon}
      </div>
    </div>
  </Card>
);
