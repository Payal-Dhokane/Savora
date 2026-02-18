export default function SummaryCard({ title, value, subtitle }) {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #0A3D62, #3C91E6)",
        color: "white",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        minWidth: "200px",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      <h4 style={{ marginBottom: "10px", opacity: 0.9 }}>{title}</h4>
      <h2 style={{ margin: 0 }}>{value}</h2>
      {subtitle && (
        <p style={{ marginTop: "8px", fontSize: "14px", opacity: 0.8 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
