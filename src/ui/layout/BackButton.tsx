interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export const BackBtn = ({ onClick, label = "← Back" }: BackButtonProps) => (
  <button
    onClick={onClick}
    style={{
      background: "none",
      border: "none",
      color: "#2563EB",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'DM Sans',sans-serif",
      marginBottom: 20,
    }}
  >
    {label}
  </button>
);
