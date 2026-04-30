import Task from "../models/Task.js";

export async function getAllTasks(_, res) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getAllTasks controller!", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.json({ message: "Task not found!" });
    res.json(task);
  } catch (error) {
    console.error("Error in getTaskById controller!", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error in creaetTask controller!", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateTask(req, res) {
  try {
    const { title, description } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true },
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error in udpateToDO controller!", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: "Task not found and can't be deleted" });
    }

    res.json({ message: "Task Deleted Successfully!" });
  } catch (error) {
    console.error("Error in deleteTask controller!", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function toggleTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found!" });

    task.completed = !task.completed;
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error in toggleTask controller!", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
