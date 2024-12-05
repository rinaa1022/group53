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
    password: "Eunwoo1022",
    port: 8888,
});

// API Endpoint: Get all products
app.get("/api/products", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM product");
        res.json(result.rows); // Send data as JSON
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
