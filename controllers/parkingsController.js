const Parking = require('../models/parkings');
const mapsApi = require('../apis/maps');

exports.parkingsController = {
    getParkings(req, res) {
        Parking.find({})
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting data from DB: ${err}`))
    },

    getParkingById(req, res) {
        const id = parseInt(req.params.id)
        Parking.findOne({ parkingID: id})
            .then(docs => {
                if (!docs) {
                    res.status(404).send("Parking not found");
                } else{
                    res.json(docs)
                }
            })
            .catch(err => console.log(`Error getting data from DB: ${err}`))
    },


    addParking(req, res) {
    },

    editParking(req, res) {
    },

    deleteParking(req, res) {
        
    }

};
