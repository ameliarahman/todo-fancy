const express = require('express'),
  router = express.Router(),
  userController = require('../controllers/userController')
/* GET users listing. */
router.get('/:name', userController.getAllDataUsers)
router.post('/', userController.createUser)
router.post('/signin', userController.userSignin)
router.get('/:id', userController.findDataUserById)
router.put('/:id', userController.updateDataUser)
router.delete('/:id', userController.deleteDataUser)
router.get('/:id/tasks', userController.getTasksByUserId)
router.post('/signinfb', userController.signinFb)
router.get('/:name/todos', userController.getAllDataTodos)
router.get('/:name/todos/finish', userController.getAllFinishedTask)


module.exports = router;
