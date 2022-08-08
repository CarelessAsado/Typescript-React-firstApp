import express, { NextFunction, Request, Response } from "express";
import { Error403 } from "../ERRORS/customErrors";

const router = express.Router();
const {
  addTask,
  getAllTasks,
  getSingleTask,
  updateDONEtask,
  updateNAMEtask,
  deleteTask,
} = require("../controllers/tasks");

//SOLO SE ACTIVA SI LA ROUTE TIENE COMO PARAMS userID, x ej get("/tasks"), esta eximido
router.param(
  "userID",
  (req: Request, res: Response, next: NextFunction, userID) => {
    console.log("ver q pasa", 666);
    console.log(req.user._id, userID);
    if (req.user._id !== userID) {
      console.log("error 2do middle");
      return next(
        new Error403("You are not authorized to perform such action.")
      );
    }
    return next();
  }
);

router.post("/tasks/:userID", addTask);
router.get("/task/:userID/:id", getSingleTask);
router.delete("/tasks/:userID/:id", deleteTask);
router.put("/tasks/done/:userID/:id", updateDONEtask);
router.put("/tasks/name/:userID/:id", updateNAMEtask);
router.get("/tasks", getAllTasks);

module.exports = router;
