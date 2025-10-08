import sqlite3
from datetime import datetime

DB_FILE = "trades.db"

def init_db():
    """Initialize SQLite database and create trades table if not exists."""
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS trades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            action TEXT NOT NULL,
            price REAL NOT NULL,
            timestamp TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def insert_trade(action, price):
    """Insert a trade into the database with current timestamp."""
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    timestamp = datetime.now().isoformat()
    c.execute("INSERT INTO trades (action, price, timestamp) VALUES (?, ?, ?)",
              (action, price, timestamp))
    conn.commit()
    conn.close()

def fetch_trades():
    """Fetch all trades from the database."""
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT * FROM trades")
    rows = c.fetchall()
    conn.close()
    return rows
