const { Schema, model } = require('mongoose');
const personSchema = new Schema({
    email : String,
    // personId: Number,
    firstName: String,
    lastName: String,
    phoneNumber: String
}, { collection: 'persons' }) ;

const Person=model('Person', personSchema);

module.exports = {Person,personSchema};