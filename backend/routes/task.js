const express = require('express');
const { addTask, getTaskById, getAllTask, editTask, removeTaskById, removeAllTask, searchTask, getFilteredTask } = require('../controllers/task');

const router = express.Router();

router.post('/',addTask);
router.get('/all',getAllTask);
router.get('/:id',getTaskById);
router.put('/',editTask);
router.delete('/:id',removeTaskById);
router.delete('/',removeAllTask);
router.get('/search/:query',searchTask);
router.get('/',getFilteredTask);

module.exports = router;