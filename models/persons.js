const { Schema, model } = require('mongoose');
const personSchema = new Schema({
    /*SCHEMA*/
}, { collection: 'persons' });
/*
const Person=model('Person', personSchema);

module.exports = {Person,personSchema};
*/