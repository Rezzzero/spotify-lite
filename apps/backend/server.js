import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
console.log("CLIENT_URL from env:", process.env.CLIENT_URL);
app.use(express.json());
routes.forEach(([path, router]) => {
  app.use(path, router);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
