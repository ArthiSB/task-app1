import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MySQL stores booleans as 0/1, so convert to true/false for React
const toTask = (row) => ({ id: row.id, title: row.title, done: !!row.done });

// READ all
app.get("/api/tasks", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks ORDER BY id");
    res.json(rows.map(toTask));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// CREATE
app.post("/api/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    // The ? placeholder prevents SQL injection - never build SQL with string concatenation
    const [result] = await pool.query("INSERT INTO tasks (title) VALUES (?)", [title.trim()]);
    res.status(201).json({ id: result.insertId, title: title.trim(), done: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// UPDATE (toggle done)
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE tasks SET done = NOT done WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Task not found" });
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [req.params.id]);
    res.json(toTask(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM tasks WHERE id = ?", [req.params.id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Check the DB connection before accepting requests
pool
  .query("SELECT 1")
  .then(() => app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`)))
  .catch((err) => console.error("Cannot connect to MySQL:", err.message));
