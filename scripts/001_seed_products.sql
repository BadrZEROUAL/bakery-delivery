-- Insert sample bakery products
INSERT INTO products (name, description, price, image_url, is_available) VALUES
  ('Sourdough Bread', 'Traditional artisan sourdough with a crispy crust and tangy flavor', 8.50, '/placeholder.svg?height=300&width=400', true),
  ('Croissants (6 pack)', 'Buttery, flaky French croissants baked fresh daily', 12.00, '/placeholder.svg?height=300&width=400', true),
  ('Chocolate Chip Cookies (12 pack)', 'Classic homemade cookies with premium chocolate chips', 15.00, '/placeholder.svg?height=300&width=400', true),
  ('Baguette', 'Classic French baguette with a golden crust', 5.50, '/placeholder.svg?height=300&width=400', true),
  ('Cinnamon Rolls (4 pack)', 'Soft, gooey cinnamon rolls with cream cheese frosting', 14.00, '/placeholder.svg?height=300&width=400', true),
  ('Blueberry Muffins (6 pack)', 'Moist muffins bursting with fresh blueberries', 10.00, '/placeholder.svg?height=300&width=400', true),
  ('Whole Wheat Bread', 'Hearty whole wheat bread perfect for sandwiches', 7.00, '/placeholder.svg?height=300&width=400', true),
  ('Apple Pie', 'Classic apple pie with a buttery crust and cinnamon filling', 22.00, '/placeholder.svg?height=300&width=400', true)
ON CONFLICT (id) DO NOTHING;
