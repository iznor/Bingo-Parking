const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String
}, { collection: 'users' }) ;

const Users=model('Users', userSchema);
module.exports = {Users,userSchema};