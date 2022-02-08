const { Users } = require('../models/users');
const logger = require('../logger');

exports.usersController = {
    async login(req, res) {
       const user = await Users.findOne({email :req.body.email});
       if(user){
           return res.status(200).json({...user.toObject()});
       }
    }
};