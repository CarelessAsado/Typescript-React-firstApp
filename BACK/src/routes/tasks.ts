import express, { NextFunction, Request, Response } from "express";
import { Error403 } from "../ERRORS/customErrors";

const router = express.Router();
import * as tasksControllers from "../controllers/tasks";

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

router.post("/", tasksControllers.addTask);
router.get("/", tasksControllers.getAllTasks);
router.delete("/:id", tasksControllers.deleteTask);
router.put("/:id", tasksControllers.updateTask);
router.get("/task/:userID/:id", tasksControllers.getSingleTask);
router.put("/done/:id", tasksControllers.updateDONEtask);
router.put("/name/:id", tasksControllers.updateNAMEtask);

module.exports = router;
