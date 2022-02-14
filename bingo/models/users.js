const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String, 
    orders : [Number] // orders is an array of parking id, describes all the parkings that the user ordered
}, { collection: 'users' }) ;

const Users=model('Users', userSchema);
module.exports = {Users,userSchema};
