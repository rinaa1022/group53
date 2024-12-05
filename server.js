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

    if (categoryid) {
        values.push(categoryid);
        query += ` AND categoryid = $${values.length}`;
    }
    if (kitid) {
        values.push(kitid);
        query += ` AND kitid = $${values.length}`;
    }
    if (typeid) {
        values.push(typeid);
        query += ` AND typeid = $${values.length}`;
    }
    if (weightid) {
        values.push(weightid);
        query += ` AND weightid = $${values.length}`;
    }

    try {
        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});