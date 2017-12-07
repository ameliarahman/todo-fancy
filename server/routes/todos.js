var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController')
const isLogin = require('../middleware/isLogin')
/* GET users listing. */
router.get('/', todoController.getAllTodos)
router.post('/', todoController.createTodo)
router.get('/:id', todoController.findTodoById)
router.put('/:id', todoController.updateTodo)
router.put('/status/:id', todoController.changeStatusDone)
router.delete('/:id', todoController.deleteDataTodo)

module.exports = router;