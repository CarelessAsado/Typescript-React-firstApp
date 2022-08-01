import express from "express";
require("dotenv").config();
import connectDB from "./db/connect";
const app = express();
import cors from "cors";
import verifyToken from "./middleware/verifyToken";
import finalErrorHandler from "./ERRORS/finalErrorHandler";

/*---------------------------------*/
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

/*----------------------------------- */
const PORT = process.env.PORT || 5000;
const connectServer = () => {
  app.listen(PORT, () => {
    console.log("Port is good " + PORT);
  });
};
connectDB(process.env.MONGODB_URI || "dev", connectServer);

/*--------------ROUTES-----------------------*/
/*----------UNPROTECTED ROUTES---------*/
const authRoutes = require("./routes/auth");
app.use("/api/v1/auth", authRoutes);
/*-----------PROTECTED ROUTES--------*/
/*---MIDDLEWARE-*/
app.use(verifyToken);
const tasksRoutes = require("./routes/tasks");
app.use("/api/v1", tasksRoutes);
const usersRoutes = require("./routes/users");
app.use("/api/v1", usersRoutes);

app.use(finalErrorHandler);
