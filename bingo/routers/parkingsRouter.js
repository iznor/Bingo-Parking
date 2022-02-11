const { Router } = require('express');
const { parkingsController } = require('../controllers/parkingsController');

const parkingsRouter = new Router();


parkingsRouter.get('/', parkingsController.getParkings);
parkingsRouter.get('/:id', parkingsController.getParkingById);
parkingsRouter.post('/', parkingsController.addParking);
parkingsRouter.put('/:id', parkingsController.editParking);
parkingsRouter.delete('/:id', parkingsController.deleteParking);

module.exports = { parkingsRouter };