
const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create database
const db = new Database("ecommerce.db");

// Create products table
db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT
    )
`);

// Insert sample products if table is empty
const count = db.prepare("SELECT COUNT(*) AS count FROM products").get();

if (count.count === 0) {
    const insert = db.prepare(`
        INSERT INTO products (name, description, price, image)
        VALUES (?, ?, ?, ?)
    `);

    const products = [
        ["Wireless Headphones", "Comfortable wireless headphones", 1499, "https://placehold.co/300x200?text=Headphones"],
        ["Smart Watch", "Smart watch with fitness tracking", 2499, "https://placehold.co/300x200?text=Smart+Watch"],
        ["Laptop Backpack", "Durable backpack for everyday use", 999, "https://placehold.co/300x200?text=Backpack"],
        ["Wireless Mouse", "Wireless mouse for work and study", 599, "https://placehold.co/300x200?text=Mouse"]
    ];

    const insertMany = db.transaction((items) => {
        for (const product of items) {
            insert.run(...product);
        }
    });

    insertMany(products);
}

// Test route
app.get("/", (req, res) => {
    res.send("E-commerce backend is running!");
});


/* Get all products and search products */
app.get("/api/products", (req, res) => {
    const search = req.query.search;

    if (search !== undefined && typeof search !== "string") {
        return res.status(400).json({ error: "Invalid search value" });
    }

    let products;

    if (search && search.trim()) {
        products = db.prepare(`
            SELECT * FROM products
            WHERE name LIKE ? OR description LIKE ?
        `).all(`%${search.trim()}%`, `%${search.trim()}%`);
    } else {
        products = db.prepare("SELECT * FROM products").all();
    }

    res.status(200).json(products);
});

/* Get a single product by ID */
app.get("/api/products/:id", (req, res) => {
    const id = req.params.id;

    if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = db.prepare(
        "SELECT * FROM products WHERE id = ?"
    ).get(Number(id));

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
