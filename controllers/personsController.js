const { Person } = require('../models/persons');


exports.personsController = {
    getPersonById(req, res) {
        Person.find({personId :req.params.id})
        .then(docs => {res.json(docs)})
        .catch(err => console.log(`Error getting data from DB: ${err}`))
    }
};
