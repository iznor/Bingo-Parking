const { Users } = require('../models/users');
const logger = require('../logger');
const userAuth = require('../middleware/userAuth')
const Parking = require('../models/parkings');


exports.usersController = {
    async login(req, res) {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User Not Found' })
        }
        const passwordMatch = req.body.password === user.password
        if (passwordMatch) {
            const token = await userAuth.getToken(user.email)
            return res.status(200).json({
                ...user.toObject(),
                token: token
            });
        }
        else {
            return res.status(401).json({ error: 'Authentication Failed' });
        }
    },
    editUser(req, res) {
        Users.updateOne({ email: req.params.email }, { $addToSet: { orders: Number(req.body.orders) } })
            .then((result) => {
                if (result.matchedCount > 0) {
                    res.send("user has updated");
                }
                else {
                    res.status(400).json("user email is not correct");
                }
            })
            .catch(err => res.json(`there is an error updating a user ${err}`));
    },
    getUserOrdersByEmail(req, res) {
        const email = (req.params.email);
        Users.findOne({ email: email })
            .then(docs => {
                if (!docs) {
                    res.status(404).send("Parking not found");
                } else {
                    const parkingId = docs.orders;
                    Parking.find({ parkingId: parkingId })
                        .then(docs => {
                            if (!docs) {
                                res.status(404).send("Parking not found");
                            } else {
                                res.json(docs);
                            }
                        })
                        .catch(err => res.json(`there is an error finding a parking ${err}`));

                }
            })
            .catch(err => res.json(`there is an error getting a user ${err}`));
    }
};