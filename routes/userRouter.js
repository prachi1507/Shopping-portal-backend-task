import express from "express";
import { login, logout, registerUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);

export default router;