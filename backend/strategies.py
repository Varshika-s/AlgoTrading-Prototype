import pandas as pd

def sma_crossover(prices, fast=20, slow=50):
    data = pd.DataFrame(prices)
    data.columns = ["close"]
    data["sma_fast"] = data["close"].rolling(fast).mean()
    data["sma_slow"] = data["close"].rolling(slow).mean()

    signals, position = [], 0
    for i in range(len(data)):
        if data["sma_fast"].iloc[i] > data["sma_slow"].iloc[i] and position == 0:
            signals.append("BUY"); position = 1
        elif data["sma_fast"].iloc[i] < data["sma_slow"].iloc[i] and position == 1:
            signals.append("SELL"); position = 0
        else:
            signals.append("")
    data["signal"] = signals
    return data

def rsi_strategy(prices, period=14, overbought=70, oversold=30):
    data = pd.DataFrame(prices, columns=["close"])
    delta = data["close"].diff()
    gain = (delta.where(delta > 0, 0)).rolling(period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(period).mean()
    rs = gain / loss
    data["rsi"] = 100 - (100 / (1 + rs))

    signals = []
    for i in range(len(data)):
        if data["rsi"].iloc[i] < oversold: signals.append("BUY")
        elif data["rsi"].iloc[i] > overbought: signals.append("SELL")
        else: signals.append("")
    data["signal"] = signals
    return data
