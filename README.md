Live Algo Trading Prototype

This is a prototype algorithmic trading system that supports backtesting and live data simulation. It demonstrates basic trading strategies, portfolio tracking, and visualization using Python, FastAPI, and React.

## Features
- Historical and pseudo-live data feed using `yfinance` and replay streams.
- Two simple strategies:
  - Moving Average Crossover (20/50 SMA)
  - RSI-based momentum strategy (14-period RSI)
- Buy/Sell signals displayed on interactive charts.
- Backtesting with profit/loss and equity curve.
- Frontend dashboard with React + Plotly.
- SQLite database logging trades and portfolio history.

## Getting Started

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload 
### Frontend
cd frontend
npm install
npm start
