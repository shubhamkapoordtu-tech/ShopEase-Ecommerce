
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT
);

INSERT INTO products (name, description, price, image)
SELECT 'Wireless Headphones',
       'Comfortable wireless headphones',
       1499,
       'https://placehold.co/300x200?text=Headphones'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Wireless Headphones'
);

INSERT INTO products (name, description, price, image)
SELECT 'Smart Watch',
       'Smart watch with fitness tracking',
       2499,
       'https://placehold.co/300x200?text=Smart+Watch'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Smart Watch'
);

INSERT INTO products (name, description, price, image)
SELECT 'Laptop Backpack',
       'Durable backpack for everyday use',
       999,
       'https://placehold.co/300x200?text=Backpack'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Laptop Backpack'
);

INSERT INTO products (name, description, price, image)
SELECT 'Wireless Mouse',
       'Wireless mouse for work and study',
       599,
       'https://placehold.co/300x200?text=Mouse'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Wireless Mouse'
);
