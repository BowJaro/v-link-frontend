interface ProgressBarProps {
  value: number;
  color?: string;
  h?: number;
}

export const ProgressBar = ({
  value,
  color = "#2563EB",
  h = 7,
}: ProgressBarProps) => (
  <div
    style={{
      background: "#F1F5F9",
      borderRadius: h,
      height: h,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${Math.min(100, Math.max(0, value))}%`,
        height: "100%",
        background: color,
        borderRadius: h,
        transition: "width 0.5s ease",
      }}
    />
  </div>
);
