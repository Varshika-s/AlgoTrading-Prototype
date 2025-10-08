// frontend/src/components/TradeTable.jsx
import React, { useState } from "react";

export default function TradeTable({ trades }) {
  const [filter, setFilter] = useState("ALL");

  // Filter trades based on selected button
  const filteredTrades = trades.filter(t => {
    if (filter === "ALL") return true;
    if (filter === "BUY") return t[1] === "BUY";
    if (filter === "SELL") return t[1] === "SELL";
    if (filter === "PROFIT") return (t[3] || 0) > 0;
    if (filter === "LOSS") return (t[3] || 0) < 0;
    return true;
  });

  return (
    <div style={{ marginTop: "30px" }}>
      {/* Filter Buttons */}
      <div style={{ marginBottom: "15px" }}>
        {["ALL","BUY","SELL","PROFIT","LOSS"].map(f =>
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            style={{
              marginRight: "8px",
              padding: "8px 18px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: filter===f ? "#0db5fdff" : "#ffffff",
              color: filter===f ? "#fff" : "#0db5fdff",
              fontFamily: "Times New Roman, sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: filter===f ? "0 4px 10px rgba(0,123,255,0.3)" : "0 2px 5px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = filter===f ? "#0b5ed7" : "#e7f1ff"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = filter===f ? "#0d6efd" : "#ffffff"}
            onMouseEnterCapture={e => e.currentTarget.style.color = filter===f ? "#fff" : "#0d6efd"}
            onMouseLeaveCapture={e => e.currentTarget.style.color = filter===f ? "#fff" : "#0d6efd"}
          >
            {f}
          </button>
        )}
      </div>

      {/* Trades Table */}
      <table style={{
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#ffffff",
  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  overflow: "hidden",
  border: "1px solid #dee2e6" // outer border
}}>
  <thead style={{ 
    backgroundColor: "skyblue", 
    color: "black", 
    fontFamily: "Times New Roman, sans-serif",
    fontSize: "14px",
    //textTransform: "uppercase",
    letterSpacing: "1px"
  }}>
    <tr>
      <th style={{ padding: "10px", textAlign: "center", border: "1px solid #ffffff" }}>#</th>
      <th style={{ padding: "10px", textAlign: "center", border: "1px solid #ffffff" }}>Action</th>
      <th style={{ padding: "10px", textAlign: "center", border: "1px solid #ffffff" }}>Price ($)</th>
      <th style={{ padding: "10px", textAlign: "center", border: "1px solid #ffffff" }}>Profit/Loss ($)</th>
      <th style={{ padding: "10px", textAlign: "center", border: "1px solid #ffffff" }}>Reason</th>
    </tr>
  </thead>
  <tbody>
    {filteredTrades.map((t, i) => (
      <tr key={i} style={{
        backgroundColor: i % 2 === 0 ? "#f8f9fa" : "#ffffff",
        color: t[3] > 0 ? "green" : t[3] < 0 ? "red" : "#000"
      }}>
        <td style={{ padding: "8px", fontWeight: "bold", textAlign: "center", border: "1px solid #dee2e6" }}>{t[0]}</td>
        <td style={{ color: t[1]==="BUY"?"green":"red", fontWeight: "bold", textAlign: "center", border: "1px solid #dee2e6" }}>{t[1]}</td>
        <td style={{ textAlign: "center", border: "1px solid #dee2e6" }}>{t[2].toFixed(2)}</td>
        <td style={{ textAlign: "center", border: "1px solid #dee2e6" }}>{t[3]!==null?t[3].toFixed(2):"-"}</td>
        <td style={{ textAlign: "center", border: "1px solid #dee2e6" }}>{t[4]}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}
