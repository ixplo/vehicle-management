CREATE TABLE IF NOT EXISTS vehicle_photo (
    photo_id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id  UUID NOT NULL REFERENCES vehicle(vehicle_id),
    photo_url   TEXT NOT NULL,
    ordering    INTEGER,
    description TEXT
);