// frontend/src/components/EquityCurve.jsx
import React from "react";
import Plot from "react-plotly.js";

export default function EquityCurve({ equityData }) {
  const times = equityData.map(d => d.time);
  const equity = equityData.map(d => d.equity);

  return (
    <Plot
      data={[
        {
          x: times,
          y: equity,
          type: "scatter",
          mode: "lines",
          name: "Equity Curve",
          line: { color: "purple", width: 2 },
          fill: "tozeroy",
          fillcolor: "rgba(128,0,128,0.2)" // light purple gradient
        }
      ]}
      layout={{
        width: 600,
        height: 400,
        title: {
          text: "Portfolio Equity Curve", // modern heading with emoji
          font: {
            family: "Times New Roman, sans-serif",
            size: 22,
            color: "#0a2342",
            weight: "bold"
          },
          xref: "paper",
          x: 0.5 // center the title
        },
        xaxis: {
          title: {
            text: "Time",
            font: { family: "Times New Roman, sans-serif", size: 14, color: "#0d6efd" }
          },
          showgrid: true,
          gridcolor: "#e1e5ea",
          tickangle: -45
        },
        yaxis: {
          title: {
            text: "Equity ($)",
            font: { family: "Times New Roman, sans-serif", size: 14, color: "#0d6efd" }
          },
          showgrid: true,
          gridcolor: "#e1e5ea",
          rangemode: "tozero"
        },
        plot_bgcolor: "#f8f9fa",
        paper_bgcolor: "#ffffff",
        legend: {
          x: 0.01,
          y: 1,
          font: { size: 14, color: "#0a2342" },
          bgcolor: "rgba(255,255,255,0.7)",
          bordercolor: "#0d6efd",
          borderwidth: 1
        },
        margin: { t: 60, l: 60, r: 30, b: 60 }
      }}
      config={{ responsive: true }}
    />
  );
}
