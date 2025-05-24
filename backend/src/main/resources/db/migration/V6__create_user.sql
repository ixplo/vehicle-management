CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                       username VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(255),
                       role VARCHAR(50) NOT NULL DEFAULT 'User',
                       is_active BOOLEAN NOT NULL DEFAULT TRUE,
                       created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
                       updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);