-- CREATE operations
-- Insert a new user
INSERT INTO "Users" (username, email, password)
VALUES ('zahin', 'zahin@mail.com', 'abcd1234');

-- Insert a new link
INSERT INTO "Link" (actual_link, shortened_link, created_by)
VALUES ('https://www.example.com/some/very/long/url/path', 'ab12cd', 
       (SELECT id FROM "User" WHERE username = 'username123'));

-- READ operations
-- Get all users
SELECT * FROM "Users";

-- Count the number of users
SELECT COUNT(*) FROM "Users";

-- Get user by id
SELECT * FROM "Users" WHERE id = 1;

-- Get user by username
SELECT * FROM "Users" WHERE username = 'username123';

-- Get all links
SELECT * FROM "Links";

-- Get links with user information (join)
SELECT l.id, l.actual_link, l.shortened_link, u.username 
FROM "Links" l
JOIN "Users" u ON l.created_by = u.id;

-- Get links created by a specific user
SELECT l.id, l.actual_link, l.shortened_link, u.email, u.username 
FROM "Links" l
JOIN "Users" u ON l.created_by = u.id
WHERE u.username = 'aliazizi'; 

-- Get all links created by a specific user
SELECT * FROM "Link" WHERE created_by = 1;

-- UPDATE operations
-- Update user information
-- When uuid is used, it is a must to use the WHERE clause to update a specific user if not all users will be updated
UPDATE "User"
SET email = 'newemail@example.com', username = 'newusername'
WHERE id = 1;

-- Update a link
UPDATE "Link"
SET shortened_link = 'xy56z'
WHERE id = 1;

-- DELETE operations
-- Delete a link
DELETE FROM "Link" WHERE id = 1;

-- Delete all links created by a specific user
DELETE FROM "Link" WHERE created_by = 1;

-- Delete a user (will fail if there are links referencing this user)
DELETE FROM "User" WHERE id = 1;

-- Delete a user and all their links (transaction)
BEGIN;
DELETE FROM "Link" WHERE created_by = 1;
DELETE FROM "User" WHERE id = 1;
COMMIT;