import React from "react";
import Plot from "react-plotly.js";

export default function PriceChart({ chartData }) {
  const dates = chartData.map(d => d.date);
  const prices = chartData.map(d => d.close);

  let lastBuyPrice = null;
  let lastSellPrice = null;
  let buyStack = 0;
  let sellStack = 0;

  const buySignals = [];
  const sellSignals = [];

  chartData.forEach(d => {
    if (d.signal === "BUY") {
      if (d.close === lastBuyPrice) {
        buyStack += 0.5; 
      } else {
        buyStack = 0.5; 
        lastBuyPrice = d.close;
      }
      buySignals.push(d.close + buyStack);
      sellSignals.push(null);
    } else if (d.signal === "SELL") {
      if (d.close === lastSellPrice) {
        sellStack += 0.5;
      } else {
        sellStack = 0.5;
        lastSellPrice = d.close;
      }
      sellSignals.push(d.close - sellStack);
      buySignals.push(null);
    } else {
      buySignals.push(null);
      sellSignals.push(null);
    }
  });

  return (
    <Plot
      data={[
        {
          x: dates,
          y: prices,
          type: "scatter",
          mode: "lines",
          name: "Price",
          line: { color: "blue", width: 2 },
          fill: "tozeroy",
          fillcolor: "rgba(0,123,255,0.2)"
        },
        {
          x: dates,
          y: buySignals,
          mode: "markers",
          name: "BUY Signal",
          marker: { color: "green", size: 6, symbol: "triangle-up" }
        },
        {
          x: dates,
          y: sellSignals,
          mode: "markers",
          name: "SELL Signal",
          marker: { color: "red", size: 6, symbol: "triangle-down" }
        }
      ]}
      layout={{
        width: 800,
        height: 400,
        title: {
          text: "Live Price Chart", 
          font: { 
            family: "Times New Roman, sans-serif", 
            size: 22, 
            color: "#0a2342", 
            weight: "bold" 
          },
          xref: "paper",
          x: 0.5
        },
        xaxis: { 
          title: { text: "Time", font: { family: "Times New Roman, sans-serif", size: 14, color: "#0d6efd" } } 
        },
        yaxis: { 
          title: { text: "Price", font: { family: "Times New Roman, sans-serif", size: 14, color: "#0d6efd" } },
          range: [80, Math.max(...prices) * 1.05],// Y-axis starts at 100 and a bit above max for padding
        },

        legend: {
          x: 1.02,  // move to right
          y: 1,
          xanchor: "left",
          yanchor: "top",
          bgcolor: "rgba(255,255,255,0.8)",
          bordercolor: "#0d91fdff",
          borderwidth: 1,
          font:{ family: "Times New Roman, sans-serif", size: 14, bold:true }
        },
        plot_bgcolor: "#f8f9fa",
        paper_bgcolor: "#f8f9fa"
      }}
      config={{ responsive: true }}
    />
  );
}
