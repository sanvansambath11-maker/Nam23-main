-- ============================================
-- BathAI POS - Supabase Database Schema
-- Run this in: Supabase Dashboard > SQL Editor
-- ============================================

-- Restaurants (each customer's restaurant)
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  plan TEXT NOT NULL DEFAULT 'basic' CHECK (plan IN ('basic', 'pro', 'enterprise')),
  trial_ends TIMESTAMPTZ,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Link restaurant to auth user
ALTER TABLE restaurants ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
CREATE UNIQUE INDEX idx_restaurants_user ON restaurants(user_id);

-- Menu Items
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_km TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  old_price NUMERIC(10,2),
  image_url TEXT DEFAULT '',
  discount INTEGER,
  recommended BOOLEAN DEFAULT false,
  rating NUMERIC(2,1) DEFAULT 4.5,
  category TEXT NOT NULL DEFAULT 'khmer',
  sizes JSONB,
  add_ons JSONB,
  has_spice BOOLEAN DEFAULT true,
  customization_enabled BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_menu_restaurant ON menu_items(restaurant_id);

-- Orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  vat NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_method TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'served', 'cancelled')),
  table_number INTEGER,
  customer_name TEXT,
  staff_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- Staff
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'waiter' CHECK (role IN ('manager', 'cashier', 'chef', 'waiter')),
  email TEXT,
  phone TEXT,
  avatar TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  pin TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_staff_restaurant ON staff(restaurant_id);

-- Inventory
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  quantity NUMERIC(10,2) NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'pcs',
  min_stock NUMERIC(10,2) DEFAULT 10,
  max_stock NUMERIC(10,2) DEFAULT 100,
  cost_per_unit NUMERIC(10,2) DEFAULT 0,
  supplier TEXT,
  last_restocked TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_inventory_restaurant ON inventory(restaurant_id);

-- Customers (loyalty)
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  points INTEGER DEFAULT 0,
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  visits INTEGER DEFAULT 0,
  total_spent NUMERIC(10,2) DEFAULT 0,
  last_visit TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_customers_restaurant ON customers(restaurant_id);

-- Promotions
CREATE TABLE promotions (
  id SERIAL PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'percentage' CHECK (type IN ('percentage', 'fixed', 'bogo')),
  value NUMERIC(10,2) NOT NULL DEFAULT 0,
  min_order NUMERIC(10,2) DEFAULT 0,
  max_uses INTEGER DEFAULT 100,
  used_count INTEGER DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_promotions_restaurant ON promotions(restaurant_id);

-- Audit Log
CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  category TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_audit_restaurant ON audit_log(restaurant_id);
CREATE INDEX idx_audit_created ON audit_log(created_at DESC);

-- ============================================
-- Row Level Security (RLS)
-- Each restaurant can only see their own data
-- ============================================

ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Restaurants: owner can see/edit their own
CREATE POLICY "Users can view own restaurant" ON restaurants
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own restaurant" ON restaurants
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can insert own restaurant" ON restaurants
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Helper function to get current user's restaurant_id
CREATE OR REPLACE FUNCTION get_my_restaurant_id()
RETURNS UUID AS $$
  SELECT id FROM restaurants WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Menu items: restaurant-scoped
CREATE POLICY "Restaurant menu access" ON menu_items
  FOR ALL USING (restaurant_id = get_my_restaurant_id());

-- Orders: restaurant-scoped
CREATE POLICY "Restaurant orders access" ON orders
  FOR ALL USING (restaurant_id = get_my_restaurant_id());

-- Staff: restaurant-scoped
CREATE POLICY "Restaurant staff access" ON staff
  FOR ALL USING (restaurant_id = get_my_restaurant_id());

-- Inventory: restaurant-scoped
CREATE POLICY "Restaurant inventory access" ON inventory
  FOR ALL USING (restaurant_id = get_my_restaurant_id());

-- Customers: restaurant-scoped
CREATE POLICY "Restaurant customers access" ON customers
  FOR ALL USING (restaurant_id = get_my_restaurant_id());

-- Promotions: restaurant-scoped
CREATE POLICY "Restaurant promotions access" ON promotions
  FOR ALL USING (restaurant_id = get_my_restaurant_id());

-- Audit log: restaurant-scoped
CREATE POLICY "Restaurant audit access" ON audit_log
  FOR ALL USING (restaurant_id = get_my_restaurant_id());

-- ============================================
-- Storage bucket for menu images
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view menu images" ON storage.objects
  FOR SELECT USING (bucket_id = 'menu-images');

CREATE POLICY "Authenticated users can upload menu images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'menu-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update menu images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'menu-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete menu images" ON storage.objects
  FOR DELETE USING (bucket_id = 'menu-images' AND auth.role() = 'authenticated');
