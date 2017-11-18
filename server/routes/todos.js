var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController')
/* GET users listing. */
router.get('/', todoController.getAllTodos)
router.post('/', todoController.createTodo)
router.get('/:id', todoController.findTodoById)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteDataTodo)

module.exports = router;