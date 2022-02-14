const { Router } = require('express');
const { usersController } = require('../controllers/usersController');

const userRouter = new Router();

userRouter.post('/login', usersController.login);
userRouter.put('/:email', usersController.editUser);
module.exports = { userRouter };