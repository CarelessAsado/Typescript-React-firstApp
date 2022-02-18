import { Request, Response } from "express";
/* const Task = require("../models/Task"); */
/*VER XQ NO ME SALEN LOS METODOS DE MONGOOSE*/
import Task from "../models/Task";
import User from "../models/User";
module.exports = {
  addTask: async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;

    const { _id } = req.user;
    try {
      const userPop = await User.findById(_id); /* .populate("tasks") */
      const newTask = new Task({ name, userID: _id });
      const addedTask = await newTask.save();
      userPop?.tasks.push(addedTask._id);
      await userPop?.save();
      res.json(addedTask);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  },
  getAllTasks: async (req: Request, res: Response): Promise<void> => {
    const { userID } = req.params;
    console.log(userID, "PARAMS");
    try {
      const allTasks = await Task.find({ userID }, { userID: 0 });
      res.json(allTasks);
    } catch (error: any) {
      console.log(error);
      res.status(404).json(error.message);
    }
  },
  getSingleTask: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id);
      if (!task) {
        res.status(404).json("Task does not exist.");
      }
      res.json(task);
    } catch (error: any) {
      console.log(error);
      res.status(404).json(error.message);
    }
  },
  updateDONEtask: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { done } = req.body;
    try {
      const taskToUpdate = await Task.findByIdAndUpdate(
        id,
        { done },
        { new: true }
      );
      return res.json(taskToUpdate);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
  updateNAMEtask: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const taskToUpdate = await Task.findById(id);
      taskToUpdate!.name = name;
      await taskToUpdate?.save();
      return res.json(taskToUpdate);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
  deleteTask: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      await Task.findByIdAndDelete(id);
      await User.findByIdAndUpdate(req.user._id, { $pull: { tasks: id } });
      return res.sendStatus(200);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
};
