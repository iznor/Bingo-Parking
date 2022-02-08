const { Router } = require('express');
const { usersController } = require('../controllers/usersController');

const usersRouter = new Router();

usersRouter.post('/login', usersController.login);
parkingsController.deleteParking);

module.exports = { usersRouter };