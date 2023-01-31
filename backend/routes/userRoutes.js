import express from 'express';
import { loginUser, registerUser } from "../controllers/userController.js"

const router = express.Router();

// Routes
router.post("/register" , registerUser);
router.post("/login" , loginUser)


export { router };