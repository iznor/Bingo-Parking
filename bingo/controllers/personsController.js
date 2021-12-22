const { Person } = require('../models/persons');
const logger = require('../logger');

exports.personsController = {
    getPersonById(req, res) {
        Person.find({personId :req.params.id})
        .then(docs => {res.json(docs)})
        .catch(err => logger.log(`Error getting data from DB: ${err}`))
    }
};