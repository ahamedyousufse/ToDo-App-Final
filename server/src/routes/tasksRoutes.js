import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  toggleTask
} from "../controllers/TaskController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);

export default router;
