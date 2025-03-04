-- Create Database
CREATE DATABASE "bitly-clone";

-- delete database
-- warning this will delete all data in the database and cannot be undone
DROP DATABASE "bitly-clone";

-- Create User table
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(120),
    password VARCHAR(120),
    username VARCHAR(120)
);

-- Create Link table
CREATE TABLE "Links" (
    id SERIAL PRIMARY KEY,
    actual_link TEXT,
    shortened_link VARCHAR(120),
    created_by INTEGER,
    FOREIGN KEY (created_by) REFERENCES "Users"(id)
);

-- Add visitor_count column to the Link table
ALTER TABLE "Links"
ADD COLUMN visitor_count INTEGER DEFAULT 0;