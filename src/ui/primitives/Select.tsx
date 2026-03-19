interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  required?: boolean;
}

export const Sel = ({
  label,
  value,
  onChange,
  options,
  required,
}: SelectProps) => (
  <div>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 700,
          color: "#374151",
          marginBottom: 5,
          fontFamily: "'DM Sans',sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
        {required && <span style={{ color: "#EF4444" }}> *</span>}
      </label>
    )}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "9px 12px",
        border: "1.5px solid #E8EDFB",
        borderRadius: 10,
        fontSize: 13,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
