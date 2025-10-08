class Portfolio:
    def __init__(self, initial=10000):
        self.cash = initial
        self.trades = []

    def add_trade(self, action, price, qty=1):
        if action == "BUY":
            self.cash -= price * qty
            self.trades.append((action, price))
        elif action == "SELL":
            self.cash += price * qty
            self.trades.append((action, price))

    def get_value(self):
        return {"cash": self.cash, "trades": self.trades}
