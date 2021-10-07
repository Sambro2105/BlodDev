import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import router from "./routes";
import mongoose from "mongoose";
import { MONGODB_URL, SERVER_PORT } from "./config";

// Database
mongoose.connect(MONGODB_URL!, error => {
	if (error) {
		throw error;
	}
	console.log("Mongodb connected");
});

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		credentials: true,
		origin: true,
	}),
);
app.use(morgan("dev"));
app.use(cookieParser());

// Route
app.use(router);

// server listening
const port = SERVER_PORT || 5000;
app.listen(port, () => {
	console.log("Server is running on port", port);
});
