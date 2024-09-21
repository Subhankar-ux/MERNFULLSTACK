import { createTask, deleteTask, getMyTask, getSingleTask, updateTask } from "../controller/taskController.js";
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
//Create task
router.post("/post", isAuthenticated, createTask);
//Delete task
router.delete("/delete/:id", isAuthenticated, deleteTask);
//Update task
router.put("/update/:id", isAuthenticated, updateTask);
//Get all tasks
router.get("/mytask", isAuthenticated, getMyTask);
//Get a particular task
router.get("/single/:id", isAuthenticated, getSingleTask);

export default router;