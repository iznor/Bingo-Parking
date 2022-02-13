const { Users } = require('../models/users');
const logger = require('../logger');
const userAuth = require('../middleware/userAuth')


exports.usersController = {
    async login(req, res) {
       const user = await Users.findOne({email :req.body.email});
       if(!user){
           return res.status(404).json({error: 'User Not Found'})
       }
       const passwordMatch = req.body.password === user.password
       if(passwordMatch){
           const token = await userAuth.getToken(user.email)
           return res.status(200).json({
               ...user.toObject(), 
               token: token
            });
       }
       else{
           return res.status(401).json({error: 'Authentication Failed'});
       }
    }
};