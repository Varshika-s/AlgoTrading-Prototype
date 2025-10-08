from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import random

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Portfolio & trades
portfolio_cash = 1000
trades = []

# Simulated historical price data for backtesting
np.random.seed(42)
historical_prices = pd.Series(100 + np.cumsum(np.random.randn(50)))

# SMA/RSI strategy parameters
SMA_SHORT = 5
SMA_LONG = 20
RSI_PERIOD = 14

def calculate_sma(prices, window):
    return prices.rolling(window=window).mean()

def calculate_rsi(prices, period=14):
    delta = prices.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.rolling(period).mean()
    avg_loss = loss.rolling(period).mean()
    rs = avg_gain / (avg_loss + 1e-6)
    rsi = 100 - (100 / (1 + rs))
    return rsi

@app.get("/")
def root():
    return {"message": "Backend Running!"}

@app.get("/paper-trade")
async def paper_trade():
    global portfolio_cash, trades

    trades = []
    cash = portfolio_cash
    prices = historical_prices.copy()
    sma_short = calculate_sma(prices, SMA_SHORT)
    sma_long = calculate_sma(prices, SMA_LONG)
    rsi = calculate_rsi(prices, RSI_PERIOD)

    for i in range(len(prices)):
        price = prices.iloc[i]
        signal = None

        # SMA Crossover
        if i >= SMA_LONG:
            if sma_short.iloc[i] > sma_long.iloc[i] and sma_short.iloc[i-1] <= sma_long.iloc[i-1]:
                signal = "BUY"
                trades.append([i, "BUY", price, None, "SMA Crossover"])
                cash -= price
            elif sma_short.iloc[i] < sma_long.iloc[i] and sma_short.iloc[i-1] >= sma_long.iloc[i-1]:
                signal = "SELL"
                profit = price - trades[-1][2] if trades else 0
                trades.append([i, "SELL", price, profit, "SMA Crossover"])
                cash += price

        # RSI Momentum (simple example)
        if rsi.iloc[i] < 30:
            signal = "BUY"
            trades.append([i, "BUY", price, None, "RSI Oversold"])
            cash -= price
        elif rsi.iloc[i] > 70:
            signal = "SELL"
            profit = price - trades[-1][2] if trades else 0
            trades.append([i, "SELL", price, profit, "RSI Overbought"])
            cash += price

    portfolio_cash = cash
    return {"trades": trades, "final_cash": portfolio_cash}

# Live simulation endpoint
@app.get("/live-price")
async def live_price():
    global portfolio_cash, trades
    price = round(100 + np.random.randn(), 2)
    signal = random.choice(["BUY", "SELL", None])

    if signal == "BUY":
        trades.append([len(trades)+1, "BUY", price, None, "Signal"])
        portfolio_cash -= price
    elif signal == "SELL":
        profit = round(price - trades[-1][2] if trades else 0, 2)
        trades.append([len(trades)+1, "SELL", price, profit, "Signal"])
        portfolio_cash += price

    return {"price": price, "signal": signal, "trades": trades, "portfolio_cash": portfolio_cash}
