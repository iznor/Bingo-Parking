const { Router } = require('express');
const { personsController } = require('../controllers/personsController');

const personsRouter = new Router();

personsRouter.get('/:id', personsController.getPersonById);

module.exports = { personsRouter };