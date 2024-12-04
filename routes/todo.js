const express = require("express");
const Todo = require("../models/todo");
const authMiddleware = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter.js");

const router = express.Router();

router.use(authMiddleware);

router.post("/", rateLimiter , async (req, res) => {
  const { task } = req.body;
  try {
    const todo = await Todo.create({ userId: req.user.id, task });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(id, { task, completed }, { new: true });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
