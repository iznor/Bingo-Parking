const { Schema, model } = require('mongoose');
const personSchema = new Schema({
    personId: { Type: Number },
    firstName: { Type: String },
    lastName: { Type: String },
    phoneNumber: { Type: String }
}, { collection: 'persons' }) ;

const Person=model('Person', personSchema);

module.exports = {Person,personSchema};