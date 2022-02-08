const { Router } = require('express');
const { usersController } = require('../controllers/usersController');

const usersRouter = new Router();

usersRouter.post('/login', usersController.login);

module.exports = { usersRouter };