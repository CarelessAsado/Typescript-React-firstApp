import express, { NextFunction, Request, Response } from "express";

const router = express.Router();
const {
  addTask,
  getAllTasks,
  getSingleTask,
  updateDONEtask,
  updateNAMEtask,
  deleteTask,
} = require("../controllers/tasks");

router.param(
  "userID",
  (req: Request, res: Response, next: NextFunction, userID) => {
    if (req.user._id !== userID) {
      return res
        .status(403)
        .json("You are not authorized to perform such action.");
    }
    return next();
  }
);

router.post("/tasks/:userID", addTask);
router.get("/task/:userID/:id", getSingleTask);
router.delete("/tasks/:userID/:id", deleteTask);
router.put("/tasks/done/:userID/:id", updateDONEtask);
router.put("/tasks/name/:userID/:id", updateNAMEtask);
router.get("/tasks/:userID", getAllTasks);

module.exports = router;
