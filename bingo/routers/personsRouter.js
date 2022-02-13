const { Router } = require('express');
const { personsController } = require('../controllers/personsController');
const userAuth = require('../middleware/userAuth')

const personsRouter = new Router();

personsRouter.get('/:id',userAuth.verifyToken, personsController.getPersonById);

module.exports = { personsRouter };