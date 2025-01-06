const Task = require('./../models/TaskModel');

exports.createTask = async (req, res) => {
  const { title, description, dueDate, assignedTo, createdBy, tags } = req.body;
  try {
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      assignedTo,
      createdBy,
      tags,
    });

    // console.log(newTask);

    res.status(200).json({
      message: 'suceess',
      data: { newTask },
    });
  } catch (err) {
    res.status(404).json({
      msg: 'failed',
      data: err.message,
    });
  }
};
exports.getAllTasks = (req, res) => {};
exports.getTask = (req, res) => {};
exports.updateTask = (req, res) => {};
exports.deleteTask = (req, res) => {};
