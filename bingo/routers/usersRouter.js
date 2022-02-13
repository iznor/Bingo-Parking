const { Router } = require('express');
const { usersController } = require('../controllers/usersController');

const userRouter = new Router();

userRouter.post('/login', usersController.login);

module.exports = { userRouter };