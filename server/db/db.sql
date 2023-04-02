CREATE TABLE portfolio (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR,
    website VARCHAR,
    visibility BOOLEAN NOT NULL,
    image_filename TEXT UNIQUE NOT NULL,
    image_filepath TEXT NOT NULL,
    image_size BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);