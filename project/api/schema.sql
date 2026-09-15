CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(120) NOT NULL, category VARCHAR(60) NOT NULL, price NUMERIC(12,2) NOT NULL, stock INTEGER NOT NULL DEFAULT 0);
CREATE TABLE users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email VARCHAR(180) UNIQUE NOT NULL, display_name VARCHAR(120) NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE carts (id SERIAL PRIMARY KEY, user_id UUID REFERENCES users(id), product_id INTEGER REFERENCES products(id), quantity INTEGER NOT NULL CHECK (quantity > 0), UNIQUE(user_id, product_id));
CREATE TABLE orders (id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), status VARCHAR(30) NOT NULL, total NUMERIC(12,2) NOT NULL, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE transactions (id UUID PRIMARY KEY, account_id UUID NOT NULL, description VARCHAR(180) NOT NULL, amount NUMERIC(12,2) NOT NULL, transaction_type VARCHAR(40) NOT NULL, created_at TIMESTAMPTZ DEFAULT now());
CREATE INDEX orders_user_id_idx ON orders(user_id);
CREATE INDEX transactions_account_id_created_at_idx ON transactions(account_id, created_at DESC);
