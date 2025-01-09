const Task = require('./../models/TaskModel');
const { catchAsync } = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { isFuture } = require('date-fns');

exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, dueDate, assignedTo, createdBy, tags } = req.body;

  if (!title) {
    return next(new AppError('Title field cannot be blank', 404));
  }
  if (!dueDate || !isFuture(new Date(dueDate))) {
    return next(new AppError('Due date must be a valid future date', 404));
  }

  console.log(req.user);

  const newTask = await Task.create({
    title,
    description,
    dueDate: new Date(dueDate),
    assignedTo,
    createdBy: req.user._id,
    tags,
  });

  // console.log(newTask);

  res.status(200).json({
    message: 'suceess',
    data: { newTask },
  });
});
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const data = await Task.findById(req.params.id);
  if (!data) {
    return next(new AppError('No data found with that Id', 404));
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
    return next(new AppError('No data found with that Id', 404));
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
    return next(new AppError('No data found with that Id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
