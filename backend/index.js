import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { chats } from "./data/data.js";
import { connectDB } from "./config/db.js"
import {router as userRoutes} from "./routes/userRoutes.js"
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// password = lo2ekxUAEZyXH37r
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

// connect to mongodb
connectDB();

// Routes
app.use("/api/user" , userRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log("The Backend server is running on " + PORT);
})