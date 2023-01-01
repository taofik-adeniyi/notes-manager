const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error /* 'There was an'*/ });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `Task with ${taskId} not found` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error /* 'There was an'*/ });
  }
};

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

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
