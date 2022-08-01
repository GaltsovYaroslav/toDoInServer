const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller')

router.post('/user', userController.createTask);
router.get('/user', userController.getTask);
router.put('/user', userController.updateTask);
router.delete('/user/:id', userController.deleteTask);


module.exports = router;