CREATE INDEX IF NOT EXISTS idx_vehicle_year   ON vehicle(year);
CREATE INDEX IF NOT EXISTS idx_vehicle_price  ON vehicle(price);
CREATE INDEX IF NOT EXISTS idx_vehicle_active ON vehicle(is_active);