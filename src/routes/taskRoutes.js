const express = require('express');
const taskController = require('./../controller/taskController');
const { protect } = require('./../middleware/auth');

const router = express.Router();


router
  .route('/')
  .post(protect,taskController.createTask)
  .get(taskController.getAllTasks);

router
  .route('/:id')
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
