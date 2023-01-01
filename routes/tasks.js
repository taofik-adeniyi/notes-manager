const express = require('express');
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks');
const router = express.Router()


router.route('/').get(getAllTasks)
router.route('/').post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router