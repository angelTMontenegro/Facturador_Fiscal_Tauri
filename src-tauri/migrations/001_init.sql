PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY,
    total INTEGER NOT NULL,
    created_at TEXT DEFAULT (strftime('%Y-%m-%d','now'))
) STRICT;


CREATE TABLE IF NOT EXISTS sale_items (
    id INTEGER PRIMARY KEY,
    sale_id INTEGER NOT NULL,
    stock_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price_unit INTEGER NOT NULL,
    subtotal INTEGER NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES stocks(id)
) STRICT;

CREATE TABLE IF NOT EXISTS stocks (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s','now'))
) STRICT;
