import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // Add this to parse JSON request bodies

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "curd"
});

// Get all notes
app.get("/", (req, res) => {
    const sql = "SELECT * FROM notes";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Error in server" });
        return res.json(result);
    });
});

// Get single note
app.get("/:id", (req, res) => {
    const sql = "SELECT * FROM notes WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error in server" });
        if (result.length === 0) return res.status(404).json({ message: "Note not found" });
        return res.json(result[0]);
    });
});

// Create new note
app.post("/", (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }
    
    const sql = "INSERT INTO notes (title, description) VALUES (?, ?)";
    db.query(sql, [title, description], (err, result) => {
        if (err) return res.status(500).json({ message: "Error creating note" });
        return res.status(201).json({ id: result.insertId, title, description });
    });
});

// Update note
app.put("/:id", (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }
    
    const sql = "UPDATE notes SET title = ?, description = ? WHERE id = ?";
    db.query(sql, [title, description, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error updating note" });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Note not found" });
        return res.json({ id: req.params.id, title, description });
    });
});

// Delete note
app.delete("/:id", (req, res) => {
    const sql = "DELETE FROM notes WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error deleting note" });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Note not found" });
        return res.json({ message: "Note deleted successfully" });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});