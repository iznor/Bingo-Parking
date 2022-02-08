const { Router } = require('express');
const { usersController } = require('../controllers/usersController');

const usersRouter = new Router();

usersRouter.post('/login', usersController.login);
// usersRouter.get('/:id', usersController.getParkingById);
// usersRouter.post('/', usersController.addParking);
// usersRouter.put('/:id', parkingsController.editParking);
// usersRouter.delete('/:id', parkingsController.deleteParking);

module.exports = { usersRouter };