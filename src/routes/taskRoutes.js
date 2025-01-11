const express = require('express');
const taskController = require('./../controller/taskController');
const { protect } = require('./../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, taskController.createTask)
  .get(protect, taskController.getAllTasks);

router
  .route('/:id')
  .get(protect, taskController.getTask)
  .patch(protect, taskController.updateTask)
  .delete(protect, taskController.deleteTask);

module.exports = router;
