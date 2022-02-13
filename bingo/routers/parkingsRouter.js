const { Router } = require('express');
const { parkingsController } = require('../controllers/parkingsController');
const userAuth = require('../middleware/userAuth')
const parkingsRouter = new Router();


parkingsRouter.get('/',userAuth.verifyToken, parkingsController.getParkings);
parkingsRouter.get('/:id',userAuth.verifyToken, parkingsController.getParkingById);
parkingsRouter.post('/',userAuth.verifyToken, parkingsController.addParking);
parkingsRouter.put('/:id',userAuth.verifyToken, parkingsController.editParking);
parkingsRouter.delete('/:id',userAuth.verifyToken, parkingsController.deleteParking);

module.exports = { parkingsRouter };