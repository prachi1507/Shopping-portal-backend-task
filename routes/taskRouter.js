import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createTask, destroyTask, fetchTask, updateTask } from "../controllers/taskController.js";


const router = express.Router();

router.post("/create", isAuthenticated, createTask);
router.delete("/delete/:id", isAuthenticated, destroyTask);
router.get("/tasks", isAuthenticated, fetchTask);
router.put("/tasks/:id", isAuthenticated, updateTask);

export default router;