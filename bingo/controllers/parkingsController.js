const Parking = require('../models/parkings');
const mapsApi = require('../apis/maps');
const { connect } = require('mongoose');

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
        const { body } = req;
        let parkingExists = false;
        Parking.countDocuments({ parkingID: body.parkingID }, (err, count) => {
            if (count > 0) {
                parkingExists = true;
            }
            if (parkingExists) {
                res.status(404).send("Error saving a parking");
            } else {
                const newParking = new Parking;
                if (body.parkingID && body.person && body.location && body.dateStart && body.dateEnd && body.price && body.active) {
                    newParking.parkingID = body.parkingID;
                    newParking.person = body.person;
                    newParking.location = body.location;
                    newParking.dateStart = body.dateStart;
                    newParking.dateEnd = body.dateEnd;
                    newParking.price = body.price;
                    newParking.active = body.active;
                }
                const result = newParking.save();
                if (result) {
                    res.status(200).send('Success!');
                } else {
                    res.status(404).send("Error saving a parking_");
                }
            }
        });

        return;



    },
    editParking(req, res) {
        Parking.updateOne({ parkingID : req.params.id }, req.body)
            .then((result) => {
                if (result.matchedCount > 0)
                    res.send("parking has updated")

                else
                    res.status(400).json("parkingID is not correct")
            })
            .catch(err => res.json(`there is Error in updated parking ${err}`));
    },

    deleteParking(req, res) {
        Parking.deleteOne({ parkingId: req.params.id })
        .then(res.status(200).send('Deleted!'))
        .catch(err => { res.status(400).send(`${err}: Couldn't find id`) })
    }
};


