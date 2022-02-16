const Parking = require('../models/parkings');
const message = require('../myEvents.js');

exports.parkingsController = {
    getParkings(req, res) {
        Parking.find({})
            .then(docs => { res.json(docs) })
            .catch(err => message.dataBaseErr());
    },
    getParkingById(req, res) {
        const id = parseInt(req.params.id)
        Parking.findOne({ parkingId: id })
            .then(docs => {
                if (!docs) {
                    message.parkingNotFound();
                    res.status(404).send("Parking not found");
                } else {
                    message.successGET();
                    res.json(docs);
                }
            })
            .catch(err => message.dataBaseErr());
    },
    addParking(req, res) {
        Parking.findOne().sort('-parkingId').exec((err, Parking_) => {
            const id_ = Parking_.parkingId + 1;
            const { body } = req;
            let parkingExists = false;
            Parking.countDocuments({ parkingId: id_ }, (err, count) => {
                if (count > 0) {
                    parkingExists = true;
                }
                if (parkingExists) {
                    message.saveError();
                    res.status(404).send("Error saving a parking");
                } else {
                    const newParking = new Parking;
                    if (body.person && body.location && body.dateStart && body.dateEnd && body.price && body.active && body.email) {
                        newParking.parkingId = id_;
                        newParking.person = body.person;
                        newParking.location = body.location;
                        newParking.dateStart = body.dateStart;
                        newParking.dateEnd = body.dateEnd;
                        newParking.price = body.price;
                        newParking.active = body.active;
                        newParking.email = body.email;
                    } else {
                        message.saveError();
                        res.status(404).send("Error saving a parking");
                    }
                    if (isNaN(newParking.location.lat) || isNaN(newParking.location.lng)) {
                        message.didntChoose();
                        res.status(404).send("Error saving a parking");
                    }
                    else if (!(isNaN(newParking.location.lat)) && !(isNaN(newParking.location.lng))) {
                        const result = newParking.save();
                        if (result) {
                            message.successPost();
                            res.status(200).send('Success!');
                        } else {
                            message.saveError();
                            res.status(404).send("Error saving a parking");
                        }
                    }
                    else {
                        message.saveError();
                        res.status(404).send("Error saving a parking");
                    }
                }

            });
            return;
        });
    },

    editParking(req, res) {
        Parking.updateOne({ parkingId: req.params.id }, req.body)
            .then((result) => {
                if (result.matchedCount > 0) {
                    message.successPut();
                    res.send("parking has updated");
                }
                else {
                    message.parkingNotFound();
                    res.status(400).json("parkingId is not correct");
                }
            })
            .catch(err => res.json(`there is an error updating a parking ${err}`));
    },

    deleteParking(req, res) {
        Parking.deleteOne({ parkingId: req.params.id })
            .then((result) => {
                if (result.deletedCount > 0) {
                    message.successDelete();
                    res.send("parking has Deleted");
                }
                else {
                    message.parkingNotFound();
                    res.status(400).json("parkingId is not correct");
                }
            })
            .catch(err => res.json(`there is Error in Deleted parking ${err}`));
    }
};


