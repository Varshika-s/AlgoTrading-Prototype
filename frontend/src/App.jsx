// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PortfolioCards from "./components/PortfolioCards";
import PriceChart from "./components/PriceChart";
import TradeTable from "./components/TradeTable";
import EquityCurve from "./components/EquityCurve";

const BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [trades, setTrades] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [portfolioCash, setPortfolioCash] = useState(0);
  const [equityCurve, setEquityCurve] = useState([]);

  // Fetch live data every 2 seconds (pseudo-live simulation)
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${BASE_URL}/live-price`);
        const data = res.data;

        // Update trades & portfolio cash
        setTrades(data.trades);
        setPortfolioCash(data.portfolio_cash);

        // Update chart data for price + signals
        setChartData(prev => [
          ...prev,
          { date: `T${prev.length + 1}`, close: data.price, signal: data.signal }
        ]);

        // Update equity curve
        setEquityCurve(prev => [
          ...prev,
          { time: prev.length + 1, equity: data.portfolio_cash }
        ]);
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      padding: "20px",
      minHeight: "100vh",
      background: "linear-gradient(to right, #f0f3f7, #d9e2ec)"
    }}>
      {/* Dashboard Heading */}
      <h1 style={{
        textAlign: "center",
        fontFamily:"Times New Roman, sans-serif",
        fontSize: "28px",
        fontWeight: "bold",
        color: "#0a2342",
        textShadow: "1px 1px #c0c0c0",
        marginBottom: "25px"
      }}>
        Live Algo Trading Dashboard
      </h1>

      {/* Portfolio Cards */}
      <PortfolioCards portfolioCash={portfolioCash} trades={trades} />

      {/* Charts Section */}
      <div style={{
        display: "flex",
        gap: "40px",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "20px"
      }}>
        {/* Price Chart with BUY/SELL markers */}
        <PriceChart chartData={chartData} />

        {/* Equity Curve with gradient */}
        <EquityCurve equityData={equityCurve} />
      </div>

      {/* Trades Table */}
      <TradeTable trades={trades} />
    </div>
  );
}

export default App;
