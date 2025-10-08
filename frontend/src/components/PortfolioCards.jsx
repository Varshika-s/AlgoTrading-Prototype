import React from "react";

export default function PortfolioCards({ portfolioCash, trades }) {
  const openPositions = trades.filter(t => t[1] === "BUY").length;
  const realizedPnL = trades.reduce((acc, t) => acc + (t[3] || 0), 0);

  return (
    <div style={{ display: "flex", gap: "15px", margin: "20px 0", flexWrap: "wrap", justifyContent: "center" }}>
      {[
        { label: "Cash", value: portfolioCash },
        { label: "Open Positions", value: openPositions },
        { label: "Realized PnL", value: realizedPnL },
        { label: "Total Trades", value: trades.length },
      ].map((card, i) => (
        <div key={i} style={{
          flex: "1 1 200px",
          padding: "15px",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          transition: "transform 0.2s",
          cursor: "pointer"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <h4 style={{ color: "#0a2342" }}>{card.label}</h4>
          <p style={{ color: card.value >= 0 ? "green" : "red", fontSize: "22px", fontWeight: "bold" }}>
            {typeof card.value === "number" ? card.value.toFixed(2) : card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
