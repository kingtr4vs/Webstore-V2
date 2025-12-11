-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  minecraft_username VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create purchases table to track user spending for leaderboard
CREATE TABLE IF NOT EXISTS purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  product_category VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster leaderboard queries
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_amount ON purchases(amount DESC);

-- Create a view for the leaderboard
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  u.id,
  u.minecraft_username,
  COALESCE(SUM(p.amount), 0) as total_spent,
  COUNT(p.id) as total_purchases
FROM users u
LEFT JOIN purchases p ON u.id = p.user_id AND p.status = 'completed'
GROUP BY u.id, u.minecraft_username
ORDER BY total_spent DESC
LIMIT 10;
