
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./configs/db.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8001;

// Mount authentication routes
app.use("/", authRouter);

app.listen(PORT, () => {
    console.log(`Auth Service Started on ${PORT}`);
    connectDb();
});
