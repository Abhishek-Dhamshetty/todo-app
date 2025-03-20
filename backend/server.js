import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null },
});

const Task = mongoose.model("Task", taskSchema);

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a new task
app.post("/tasks", async (req, res) => {
  const { text, createdAt } = req.body;
  const task = new Task({ text, createdAt });
  await task.save();
  res.json(task);
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  const { completed, completedAt } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { completed, completedAt },
    { new: true }
  );
  res.json(updatedTask);
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(9000, () => {
  console.log("Server running on port 9000");
});
