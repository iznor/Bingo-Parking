const Parking = require('../models/parkings');
const { connect } = require('mongoose');

exports.parkingsController = {
    getParkings(req, res) {
        Parking.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting data from DB: ${err}`))
    },
    getParkingById(req, res) {
        const id = parseInt(req.params.id)
        Parking.findOne({ parkingId: id })
            .then(docs => {
                if (!docs) {
                    res.status(404).send("Parking not found");
                } else {
                    res.json(docs)
                }
            })
            .catch(err => console.log(`Error getting data from DB: ${err}`))
    },
    addParking(req, res) {
        Parking.findOne().sort('-parkingId').exec((err, Parking_) => {
            const id_ = Parking_.parkingId+1 ;
            const { body } = req;
            let parkingExists = false;
            Parking.countDocuments({ parkingId: id_ }, (err, count) => {
                if (count > 0) {
                    parkingExists = true;
                }
                if (parkingExists) {
                    res.status(404).send("Error saving a parking");
                } else {
                    const newParking = new Parking;
                    if (body.person && body.location && body.dateStart && body.dateEnd && body.price && body.active) {
                         newParking.parkingId = id_;
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
        });
    },

    editParking(req, res) {
        Parking.updateOne({ parkingId: req.params.id }, req.body)
            .then((result) => {
                if (result.matchedCount > 0)
                    res.send("parking has updated")

                else
                    res.status(400).json("parkingId is not correct")
            })
            .catch(err => res.json(`there is Error in updated parking ${err}`));
    },

    deleteParking(req, res) {
        Parking.deleteOne({ parkingId: req.params.id })
            .then((result) => {
                if (result.deletedCount > 0)
                    res.send("parking has Deleted")
                else
                    res.status(400).json("parkingId is not correct")
            })
            .catch(err => res.json(`there is Error in Deleted parking ${err}`));
    }
};


