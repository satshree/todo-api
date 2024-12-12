import { Router } from "express";
import { addTask, deleteTask, getAllTasks, updateTask } from "../controllers";

// ROUTER INSTANCE
const router = Router();

// API ROUTES
router.route("/tasks").get(getAllTasks).post(addTask);
router.route("/tasks/:id").put(updateTask).delete(deleteTask);

export default router;
