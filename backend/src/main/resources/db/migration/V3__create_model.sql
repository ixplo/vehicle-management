CREATE TABLE IF NOT EXISTS model (
                                     model_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                     make_id  UUID NOT NULL REFERENCES make(make_id) ON DELETE CASCADE,
                                     name     VARCHAR(100) NOT NULL
);