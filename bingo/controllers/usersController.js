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
    },
    editUser(req, res) {
        Users.updateOne({ email: req.params.email }, req.body)
            .then((result) => {
                if (result.matchedCount > 0) {
                    message.successPut();
                    res.send("user has updated");
                }
                else {
                    res.status(400).json("user email is not correct");
                }
            })
            .catch(err => res.json(`there is an error updating a user ${err}`));
    },
};