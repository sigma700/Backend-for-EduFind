import express, { application } from "express";
import { connectMongo } from "./database/config.js";
import "dotenv/config";
import cors from "cors";
// import mongoose from "mongoose";
import { schoolRouter } from "./routes/v1/schoolRouter.js";
//this allows us to read data from cookies in our requset
import cookieParser from "cookie-parser";
import { collectionRouter } from "./routes/v1/collectionRouter.js";
import { authRoute } from "./routes/v1/authRoute.js";
// import { rankSchools } from "./controllers/schoolController.js";
// import { getSchools } from "./controllers/schoolController.js";

const app = express();

const PORT = process.env.PORT || 3000;

connectMongo();
// rankSchools();

app.use(express.json());

app.use(cookieParser()); // for parsing the cookies

app.use(
  cors({
    origin: "http://localhost:5371",
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    data: "This is the data that will be diplayed",
  });
});
// console.log(process.env.CONNECTION_STRING);
app.use("/api", schoolRouter, collectionRouter);
//middleweare for creating account for the user NB : cONTAINS SOME AUTHENTICATION LOGIC
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
