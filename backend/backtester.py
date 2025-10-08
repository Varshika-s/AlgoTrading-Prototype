from db import insert_trade

class Backtester:
    def __init__(self, capital=10000):
        self.cash = capital
        self.position = 0
        self.trades = []

    def run(self, data):
        """
        Run backtest on the given DataFrame with a 'signal' column.
        Logs each trade to SQLite using insert_trade().
        """
        for i, row in data.iterrows():
            if row.signal == "BUY" and self.position == 0:
                self.position = row.close
                self.trades.append((i, "BUY", row.close))
                insert_trade("BUY", row.close)  # log to SQLite
            elif row.signal == "SELL" and self.position != 0:
                profit = row.close - self.position
                self.cash += profit
                self.trades.append((i, "SELL", row.close, profit))
                insert_trade("SELL", row.close)  # log to SQLite
                self.position = 0
        return self.trades
