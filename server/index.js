// server/index.js
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const pool = require('./pool');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES

// Create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.status(201).json(newTodo.rows[0]);
    } catch (error) {
        console.error("Error creating todo:", error.message);
        res.status(500).json({ message: "Failed to create todo" });
    }
});

// Get all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC");
        res.status(200).json(todos.rows);
    } catch (error) {
        console.error("Error fetching todos:", error.message);
        res.status(500).json({ message: "Failed to fetch todos" });
    }
});

// Get a single todo
app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        if (todo.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo.rows[0]);
    } catch (error) {
        console.error("Error fetching todo:", error.message);
        res.status(500).json({ message: "Failed to fetch todo" });
    }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    try {
        const todo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
            [description, id]
        );
        if (todo.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo.rows[0]);
    } catch (error) {
        console.error("Error updating todo:", error.message);
        res.status(500).json({ message: "Failed to update todo" });
    }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
            [id]
        );
        if (todo.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: `Deleted todo: "${todo.rows[0].description}"` });
    } catch (error) {
        console.error("Error deleting todo:", error.message);
        res.status(500).json({ message: "Failed to delete todo" });
    }
});

// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
