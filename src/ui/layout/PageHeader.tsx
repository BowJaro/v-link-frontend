import { Btn } from "../primitives/Button";

interface PageHeaderProps {
  title: string;
  sub?: string;
  action?: () => void;
  actionLabel?: string;
  actionColor?: string;
  actionIcon?: React.ReactNode;
  badge?: string;
}

export const PageHeader = ({
  title,
  sub,
  action,
  actionLabel,
  actionColor = "#2563EB",
  actionIcon,
  badge,
}: PageHeaderProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 26,
    }}
  >
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: "#1E293B",
            margin: "0 0 4px",
            fontFamily: "'Syne',sans-serif",
          }}
        >
          {title}
        </h1>
        {sub && (
          <p style={{ fontSize: 13, color: "#94A3B8", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
            {sub}
          </p>
        )}
      </div>
      {badge && (
        <div
          style={{
            background: "linear-gradient(135deg,#7C3AED,#2563EB)",
            borderRadius: 10,
            padding: "4px 12px",
            fontSize: 10,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "'Syne',sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          {badge}
        </div>
      )}
    </div>
    {action && (
      <Btn onClick={action} color={actionColor} size="md" icon={actionIcon}>
        {actionLabel}
      </Btn>
    )}
  </div>
);

interface SectionTitleProps {
  title: string;
  sub?: string;
  action?: () => void;
  actionLabel?: string;
  actionColor?: string;
}

export const SectionTitle = ({
  title,
  sub,
  action,
  actionLabel,
  actionColor = "#2563EB",
}: SectionTitleProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 16,
    }}
  >
    <div>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: "#1E293B",
          margin: 0,
          fontFamily: "'Syne',sans-serif",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            fontSize: 11,
            color: "#94A3B8",
            margin: "2px 0 0",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {sub}
        </p>
      )}
    </div>
    {action && (
      <Btn onClick={action} color={actionColor} size="sm">
        {actionLabel}
      </Btn>
    )}
  </div>
);
