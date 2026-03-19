interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  rows?: number;
}

export const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  rows,
}: InputProps) => (
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
    {rows ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%",
          padding: "9px 12px",
          border: "1.5px solid #E8EDFB",
          borderRadius: 10,
          fontSize: 13,
          fontFamily: "'DM Sans',sans-serif",
          resize: "vertical",
        }}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "9px 12px",
          border: "1.5px solid #E8EDFB",
          borderRadius: 10,
          fontSize: 13,
          fontFamily: "'DM Sans',sans-serif",
        }}
      />
    )}
  </div>
);
