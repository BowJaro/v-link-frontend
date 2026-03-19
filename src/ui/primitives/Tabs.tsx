interface TabsProps {
  tabs: Array<{ id: string; label: string }>;
  active: string;
  onChange: (tabId: string) => void;
}

export const Tabs = ({ tabs, active, onChange }: TabsProps) => (
  <div
    style={{
      display: "flex",
      gap: 12,
      borderBottom: "1px solid #E8EDFB",
      marginBottom: 20,
    }}
  >
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        style={{
          padding: "12px 0",
          fontSize: 13,
          fontWeight: active === tab.id ? 700 : 500,
          color: active === tab.id ? "#2563EB" : "#64748B",
          border: "none",
          background: "none",
          borderBottom:
            active === tab.id ? "2px solid #2563EB" : "2px solid transparent",
          cursor: "pointer",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
