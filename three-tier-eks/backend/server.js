require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "database-1.c56ig6a2mnra.us-east-1.rds.amazonaws.com",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASS || "12345678",
    database: process.env.DB_NAME || "mydb",
  });
  

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// User Registration Route
app.post("/Register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error saving user" });

      // Fetch all users after inserting
      db.query("SELECT id, username, email FROM users", (err, users) => {
        if (err) return res.status(500).json({ error: "Error fetching users" });
        res.status(201).json({ message: "User registered successfully", users });
      });
    }
  );
});

// Fetch All Users Route
app.get("/users", (req, res) => {
  db.query("SELECT id, username, email FROM users", (err, users) => {
    if (err) return res.status(500).json({ error: "Error fetching users" });
    res.json(users);
  });
});

app.listen(5000, () => console.log("Backend running on port 5000"));

