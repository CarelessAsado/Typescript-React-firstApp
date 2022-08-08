import errorWrapper from "../ERRORS/asyncErrorWrapper";

/*VER XQ NO ME SALEN LOS METODOS DE MONGOOSE*/
import Task from "../models/Task";
import User, { IUser } from "../models/User";
module.exports = {
  addTask: errorWrapper(async (req, res, next) => {
    const { name } = req.body;

    const { _id } = req.user;

    const userPop = await User.findById<IUser>(_id); /* .populate("tasks") */
    const newTask = new Task({ name, userID: _id });
    const addedTask = await newTask.save();
    userPop?.tasks.push(addedTask._id);
    await userPop?.save();
    res.json(addedTask);
  }),
  getAllTasks: errorWrapper(async (req, res, next) => {
    const { _id: userID } = req.user;

    const allTasks = await Task.find({ userID }, { userID: 0 });
    res.status(200).json(allTasks);
  }),
  getSingleTask: errorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json("Task does not exist.");
    }
    res.json(task);
  }),
  updateDONEtask: errorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { done } = req.body;

    const taskToUpdate = await Task.findByIdAndUpdate(
      id,
      { done },
      { new: true }
    );
    return res.json(taskToUpdate);
  }),
  updateNAMEtask: errorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const taskToUpdate = await Task.findById(id);
    taskToUpdate!.name = name;
    await taskToUpdate?.save();
    return res.json(taskToUpdate);
  }),
  deleteTask: errorWrapper(async (req, res, next) => {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(req.user._id, { $pull: { tasks: id } });
    return res.sendStatus(200);
  }),
};
