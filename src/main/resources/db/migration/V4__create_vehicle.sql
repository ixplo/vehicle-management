CREATE TABLE IF NOT EXISTS vehicle (
                                       vehicle_id            UUID      PRIMARY KEY DEFAULT uuid_generate_v4(),
                                       make_id               UUID      NOT NULL REFERENCES make(make_id),
                                       model_id              UUID      NOT NULL REFERENCES model(model_id),
                                       derivative            VARCHAR(100),
                                       year                  INTEGER   NOT NULL,
                                       price                 NUMERIC(12,2) NOT NULL CHECK (price >= 0),
                                       photo_url             TEXT,
                                       supplier_website_url  TEXT,
                                       supplier_internal_code VARCHAR(50),
                                       created_by            VARCHAR(100) NOT NULL,
                                       created_at            TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                       updated_by            VARCHAR(100),
                                       updated_at            TIMESTAMP WITH TIME ZONE,
                                       is_active             BOOLEAN   NOT NULL DEFAULT TRUE
);