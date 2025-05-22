CREATE TABLE IF NOT EXISTS make (
                                    make_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                    name    VARCHAR(100) NOT NULL
);