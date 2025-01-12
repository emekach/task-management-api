const Task = require('./../models/TaskModel');
const { catchAsync } = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { isFuture } = require('date-fns');

exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, dueDate, priority, assignedTo, tags } = req.body;

  if (!title) {
    return next(new AppError('Title field cannot be blank', 404));
  }
  if (!dueDate || !isFuture(new Date(dueDate))) {
    return next(new AppError('Due date must be a valid future date', 404));
  }

  // console.log(req.user);

  const newTask = await Task.create({
    title,
    description,
    dueDate: new Date(dueDate),
    priority,
    assignedTo,
    createdBy: req.user._id,
    tags,
  });

  // console.log(newTask);

  res.status(200).json({
    status: 'suceess',
    data: { newTask },
  });
});
exports.getAllTasks = catchAsync(async (req, res, next) => {
  // destructure the fields out of the query object
  const { page, sort, limit, fields, tags, ...queryObj } = req.query;
  // console.log(req.query, queryObj);

  if (tags) {
    queryObj.tags = { $in: tags.split(',') };
  }

  // pagiantion
  //page=2&limit=10
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  if (page) {
    const numTask = await Task.countDocuments({
      createdBy: req.user._id,
      ...queryObj,
    });
    
    if (skip > numTask) {
      return next(new AppError('This Page does not exist', 404));
    }
  }

  const data = await Task.find({ createdBy: req.user._id, ...queryObj })
    .skip(skip)
    .limit(limitNum);

  if (!data) {
    return next(new AppError('No data found with that Id', 404));
  }

  res.status(200).json({
    status: 'success',
    result: data.length,
    page: pageNum,
    data: {
      data,
    },
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const data = await Task.findById(req.params.id);

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
