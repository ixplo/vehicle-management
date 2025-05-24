INSERT INTO users (id, username, password, email, role, is_active, created_at, updated_at)
VALUES (
           uuid_generate_v4(),
           'admin',
           '$2a$10$di2nLZvXO685sAU6b0QHcun2Kgzz5xgIF0L00JluOrHgWBg9wZbCi',
           '',
           'Admin',
           true,
           now(),
           now()
       );