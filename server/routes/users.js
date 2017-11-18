const express = require('express'),
  router = express.Router(),
  userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', userController.getAllDataUsers)
router.post('/', userController.createUser)
router.get('/:id', userController.findDataUserById)
router.put('/:id', userController.updateDataUser)
router.delete('/:id', userController.deleteDataUser)
router.get('/:id/tasks', userController.getTasksByUserId)

module.exports = router;
