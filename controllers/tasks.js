const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError, CustomAPIError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // res.status(200).json({ tasks, amountOfTasks: tasks.length });
  // res
  //   .status(200)
  //   .json({
  //     status: "success",
  //     data: { tasks, nbHits: tasks.length },
  //   });
  // res.status(500).json({ msg: error });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    // const error = new Error(`Task with ${taskId} not found`);
    // error.status = 404;
    // return next(error);
    return next(createCustomError(`Task with ${taskId} not found`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    }); //without passing the options as third arguments it returns the task that was deleted
    if (!task)
      return res.status(500).json({ msg: `Task with ${taskId} not found` });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error /* 'There was an'*/ });
  }
};

//this overites the whole document to whatever is sent to the server
const editTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true, // to overrite the whole document
    }); //without passing the options as third arguments it returns the task that was deleted
    if (!task)
      return res.status(500).json({ msg: `Task with ${taskId} not found` });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error /* 'There was an'*/ });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `Task with ${taskId} not found` });
    } else {
      res.status(200).json({ task });
    }
    res.send("delete task");
    // res.statusCode(200).json({});
    // res.statusCode(200).send();
  } catch (error) {
    res.status(500).json({ ms: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
