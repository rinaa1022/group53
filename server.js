const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "CSE412",
    password: "xxx",
    port: 8888,
});

// Fetch all categories
app.get("/api/categories", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM category ORDER BY categoryid ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Fetch all kits
app.get("/api/kits", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM kit ORDER BY kitid ASC");
        res.json(result.rows); // Return all kits
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Fetch all types
app.get("/api/types", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM type ORDER BY typeid ASC");
        res.json(result.rows); // Return all types
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Fetch all weight classes
app.get("/api/weightclasses", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM weightclass ORDER BY weightid ASC");
        res.json(result.rows); // Return all weight classes
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// Fetch products by filters
app.get("/api/products/filter", async (req, res) => {
    const { categoryid, kitid, typeid, weightid } = req.query;
    let query = "SELECT * FROM product WHERE 1=1";
    const values = [];

    // Filters the product table to only include rows where the categoryid matches the provided categoryid
    if (categoryid) {
        values.push(categoryid);
        query += ` AND categoryid = $${values.length}`;
    }
    // Filters the products based on the kitid
    if (kitid) {
        values.push(kitid);
        query += ` AND categoryid IN (SELECT categoryid FROM categorized_by_kit WHERE kitid = $${values.length})`;
    }
    // Filters the products based on the typeid
    if (typeid) {
        values.push(typeid);
        query += ` AND categoryid IN (SELECT categoryid FROM categorized_by_type WHERE typeid = $${values.length})`;
    }
    // Filters the products based on the weightid
    if (weightid) {
        values.push(weightid);
        query += ` AND categoryid IN (SELECT categoryid FROM categorized_by_weightclass WHERE weightid = $${values.length})`;
    }

    try {
        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error("Error executing query:", err.message);
        res.status(500).send("Server error");
    }
});

// Insert cart id and customer name into shoppinglist table
app.post("/api/shoppinglist/add", async (req, res) => {
    const { customerName } = req.body;
    let cartid;

    try {
        let isUnique = false;
        while (!isUnique) {
            cartid = Math.floor(Math.random() * 100000); // Generate random cart ID
            const result = await pool.query("SELECT cartid FROM shoppinglist WHERE cartid = $1", [cartid]);
            isUnique = result.rows.length === 0; // Ensure uniqueness
        }

        await pool.query("INSERT INTO shoppinglist (cartid, customername) VALUES ($1, $2)", [
            cartid,
            customerName,
        ]);

        res.status(200).json({ cartid }); // send cartid to frontend
    } catch (err) {
        console.error("Error creating shopping list:", err.message);
        res.status(500).send("Error creating shopping list");
    }
});

// Insert product into Added_to table
app.post("/api/cart/add", async (req, res) => {
    const { productid, quantity, cartid } = req.body;

    try {
        await pool.query("INSERT INTO added_to (productid, cartid, quantity) VALUES ($1, $2, $3)", [productid, cartid, quantity]);

        res.status(200).send("Product added to cart successfully!");
    } catch (err) {
        console.error("Error adding product to cart:", err.message);
        res.status(500).send("Error adding product to cart");
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log("Backend running on http://localhost:${PORT}");
});