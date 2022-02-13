const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String
    // orders : [parkingId]
}, { collection: 'users' }) ;

const Users=model('Users', userSchema);
module.exports = {Users,userSchema};
