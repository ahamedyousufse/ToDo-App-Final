import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimitter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json()); // middleware used to parse JSON bodies
app.use(rateLimiter);

// custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/tasks", tasksRoutes);

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log("server running on PORT:", PORT);
  }),
);
