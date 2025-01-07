const Task = require('./../models/TaskModel');
const Task = require('./../models/TaskModel');
const catchAsync = require('./../utils/catchAsync');

exports.createTask = catchAsync(async (req, res, next) => {
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
});
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const data = await Task.findById(req.params.id);
  if (!data) {
    res.status(404).json({ message: 'no task found with that id' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const data = await Task.find();

  res.status(200).json({
    status: 'success',
    results: data.length,
    data: {
      data,
    },
  });
});
exports.updateTask = catchAsync(async (req, res, next) => {
  const data = await Task.findByIdAndUpdate(req.params.id);
  if (!data) {
    res.status(404).json({ message: 'no task found' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
});
exports.deleteTask = catchAsync(async (req, res, next) => {
  const data = await Task.findByIdAndDelete(req.params.id);

  if (!data) {
    res.status(404).json({ message: 'no task found' });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
