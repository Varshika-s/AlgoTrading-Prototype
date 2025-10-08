import yfinance as yf

def get_historical_data(symbol="AAPL", period="6mo", interval="1d"):
    df = yf.download(symbol, period=period, interval=interval)
    df = df.dropna()
    return df
