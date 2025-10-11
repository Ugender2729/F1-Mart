-- Food Delivery System Database Schema
-- This extends the existing F1 Mart database with food delivery functionality

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cuisine_type VARCHAR(100),
  image_url TEXT,
  rating DECIMAL(3,2) DEFAULT 0.0,
  delivery_fee DECIMAL(10,2) DEFAULT 0.0,
  minimum_order DECIMAL(10,2) DEFAULT 0.0,
  estimated_delivery_time INTEGER DEFAULT 30, -- in minutes
  is_active BOOLEAN DEFAULT true,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Delivery zones table
CREATE TABLE IF NOT EXISTS delivery_zones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  zone_name VARCHAR(100) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0.0,
  minimum_order DECIMAL(10,2) DEFAULT 0.0,
  estimated_delivery_time INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu categories
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu items
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT false,
  is_spicy BOOLEAN DEFAULT false,
  allergens TEXT[], -- Array of allergen names
  calories INTEGER,
  preparation_time INTEGER DEFAULT 15, -- in minutes
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Food cart items (extends existing cart system)
CREATE TABLE IF NOT EXISTS food_cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id VARCHAR(255), -- For guest users
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, menu_item_id),
  UNIQUE(session_id, menu_item_id)
);

-- Food orders (extends existing orders system)
CREATE TABLE IF NOT EXISTS food_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE, -- Link to main order
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  delivery_address TEXT NOT NULL,
  delivery_phone VARCHAR(20) NOT NULL,
  delivery_instructions TEXT,
  delivery_fee DECIMAL(10,2) DEFAULT 0.0,
  subtotal DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled')),
  estimated_delivery_time TIMESTAMP WITH TIME ZONE,
  actual_delivery_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Food order items
CREATE TABLE IF NOT EXISTS food_order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  food_order_id UUID REFERENCES food_orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Delivery tracking
CREATE TABLE IF NOT EXISTS delivery_tracking (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  food_order_id UUID REFERENCES food_orders(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant reviews
CREATE TABLE IF NOT EXISTS restaurant_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES food_orders(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(restaurant_id, user_id, order_id)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine ON restaurants(cuisine_type);
CREATE INDEX IF NOT EXISTS idx_restaurants_active ON restaurants(is_active);
CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_food_cart_user ON food_cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_food_cart_session ON food_cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_food_orders_restaurant ON food_orders(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_food_orders_user ON food_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_food_orders_status ON food_orders(status);
CREATE INDEX IF NOT EXISTS idx_delivery_tracking_order ON delivery_tracking(food_order_id);

-- Functions for food delivery

-- Function to calculate delivery fee based on zone
CREATE OR REPLACE FUNCTION get_delivery_fee(restaurant_uuid UUID, user_address TEXT)
RETURNS DECIMAL(10,2) AS $$
DECLARE
  delivery_fee DECIMAL(10,2) := 0.0;
BEGIN
  -- Get delivery fee from restaurant's default or zone-specific fee
  SELECT COALESCE(dz.delivery_fee, r.delivery_fee, 0.0)
  INTO delivery_fee
  FROM restaurants r
  LEFT JOIN delivery_zones dz ON dz.restaurant_id = r.id AND dz.is_active = true
  WHERE r.id = restaurant_uuid
  LIMIT 1;
  
  RETURN COALESCE(delivery_fee, 0.0);
END;
$$ LANGUAGE plpgsql;

-- Function to get available restaurants for delivery
CREATE OR REPLACE FUNCTION get_available_restaurants()
RETURNS TABLE (
  id UUID,
  name VARCHAR(255),
  cuisine_type VARCHAR(100),
  rating DECIMAL(3,2),
  delivery_fee DECIMAL(10,2),
  estimated_delivery_time INTEGER,
  image_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.name,
    r.cuisine_type,
    r.rating,
    r.delivery_fee,
    r.estimated_delivery_time,
    r.image_url
  FROM restaurants r
  WHERE r.is_active = true
  ORDER BY r.rating DESC, r.name;
END;
$$ LANGUAGE plpgsql;

-- Function to get restaurant menu
CREATE OR REPLACE FUNCTION get_restaurant_menu(restaurant_uuid UUID)
RETURNS TABLE (
  category_id UUID,
  category_name VARCHAR(100),
  item_id UUID,
  item_name VARCHAR(255),
  item_description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  is_vegetarian BOOLEAN,
  is_vegan BOOLEAN,
  is_gluten_free BOOLEAN,
  is_spicy BOOLEAN,
  allergens TEXT[],
  calories INTEGER,
  preparation_time INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    mc.id as category_id,
    mc.name as category_name,
    mi.id as item_id,
    mi.name as item_name,
    mi.description as item_description,
    mi.price,
    mi.image_url,
    mi.is_vegetarian,
    mi.is_vegan,
    mi.is_gluten_free,
    mi.is_spicy,
    mi.allergens,
    mi.calories,
    mi.preparation_time
  FROM menu_categories mc
  LEFT JOIN menu_items mi ON mi.category_id = mc.id AND mi.is_available = true
  WHERE mc.restaurant_id = restaurant_uuid AND mc.is_active = true
  ORDER BY mc.sort_order, mi.sort_order;
END;
$$ LANGUAGE plpgsql;

-- Sample data for testing
INSERT INTO restaurants (name, description, cuisine_type, rating, delivery_fee, minimum_order, estimated_delivery_time, address, phone) VALUES
('Pizza Palace', 'Best pizza in town with fresh ingredients', 'Italian', 4.5, 2.99, 15.00, 25, '123 Main St, City', '+1-555-0123'),
('Burger Barn', 'Gourmet burgers and fries', 'American', 4.2, 1.99, 12.00, 20, '456 Oak Ave, City', '+1-555-0124'),
('Sushi Zen', 'Fresh sushi and Japanese cuisine', 'Japanese', 4.7, 3.99, 20.00, 30, '789 Pine St, City', '+1-555-0125'),
('Taco Fiesta', 'Authentic Mexican tacos and burritos', 'Mexican', 4.3, 1.50, 10.00, 18, '321 Elm St, City', '+1-555-0126'),
('Curry Corner', 'Spicy Indian curries and naan', 'Indian', 4.4, 2.50, 18.00, 35, '654 Maple Dr, City', '+1-555-0127');

-- Sample menu categories
INSERT INTO menu_categories (restaurant_id, name, description, sort_order) VALUES
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Pizzas', 'Fresh baked pizzas', 1),
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Appetizers', 'Starters and sides', 2),
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 'Desserts', 'Sweet treats', 3),
((SELECT id FROM restaurants WHERE name = 'Burger Barn'), 'Burgers', 'Gourmet burgers', 1),
((SELECT id FROM restaurants WHERE name = 'Burger Barn'), 'Sides', 'Fries and more', 2),
((SELECT id FROM restaurants WHERE name = 'Sushi Zen'), 'Sushi Rolls', 'Fresh sushi rolls', 1),
((SELECT id FROM restaurants WHERE name = 'Sushi Zen'), 'Sashimi', 'Fresh raw fish', 2),
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Tacos', 'Authentic tacos', 1),
((SELECT id FROM restaurants WHERE name = 'Taco Fiesta'), 'Burritos', 'Large burritos', 2),
((SELECT id FROM restaurants WHERE name = 'Curry Corner'), 'Curries', 'Spicy curries', 1),
((SELECT id FROM restaurants WHERE name = 'Curry Corner'), 'Breads', 'Naan and roti', 2);

-- Sample menu items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, is_vegetarian, is_spicy, calories, preparation_time) VALUES
-- Pizza Palace items
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 
 (SELECT id FROM menu_categories WHERE name = 'Pizzas' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizza Palace')), 
 'Margherita Pizza', 'Classic tomato, mozzarella, and basil', 12.99, true, false, 280, 15),
((SELECT id FROM restaurants WHERE name = 'Pizza Palace'), 
 (SELECT id FROM menu_categories WHERE name = 'Pizzas' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Pizza Palace')), 
 'Pepperoni Pizza', 'Pepperoni and mozzarella', 14.99, false, false, 320, 15),
-- Burger Barn items
((SELECT id FROM restaurants WHERE name = 'Burger Barn'), 
 (SELECT id FROM menu_categories WHERE name = 'Burgers' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Burger Barn')), 
 'Classic Cheeseburger', 'Beef patty, cheese, lettuce, tomato', 8.99, false, false, 450, 12),
((SELECT id FROM restaurants WHERE name = 'Burger Barn'), 
 (SELECT id FROM menu_categories WHERE name = 'Burgers' AND restaurant_id = (SELECT id FROM restaurants WHERE name = 'Burger Barn')), 
 'Veggie Burger', 'Plant-based patty with vegetables', 7.99, true, false, 380, 10);

-- RLS Policies for food delivery tables
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for restaurants and menu items
CREATE POLICY "Restaurants are viewable by everyone" ON restaurants FOR SELECT USING (true);
CREATE POLICY "Menu categories are viewable by everyone" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Menu items are viewable by everyone" ON menu_items FOR SELECT USING (true);

-- User-specific policies for cart and orders
CREATE POLICY "Users can view their own cart items" ON food_cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own cart items" ON food_cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cart items" ON food_cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cart items" ON food_cart_items FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own food orders" ON food_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own food orders" ON food_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own food orders" ON food_orders FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own order items" ON food_order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM food_orders WHERE id = food_order_id AND user_id = auth.uid())
);

CREATE POLICY "Users can view their own reviews" ON restaurant_reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own reviews" ON restaurant_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON restaurant_reviews FOR UPDATE USING (auth.uid() = user_id);

-- Delivery tracking is viewable by order owner
CREATE POLICY "Users can view tracking for their orders" ON delivery_tracking FOR SELECT USING (
  EXISTS (SELECT 1 FROM food_orders WHERE id = food_order_id AND user_id = auth.uid())
);

COMMENT ON TABLE restaurants IS 'Restaurants available for food delivery';
COMMENT ON TABLE menu_categories IS 'Menu categories for each restaurant';
COMMENT ON TABLE menu_items IS 'Individual menu items with pricing and details';
COMMENT ON TABLE food_cart_items IS 'Food items in user cart (extends main cart)';
COMMENT ON TABLE food_orders IS 'Food delivery orders (linked to main orders)';
COMMENT ON TABLE food_order_items IS 'Items within each food order';
COMMENT ON TABLE delivery_tracking IS 'Real-time delivery tracking updates';
COMMENT ON TABLE restaurant_reviews IS 'User reviews for restaurants';
