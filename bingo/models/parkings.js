const { string } = require('assert-plus');
const { ObjectId, Double } = require('bson');
const { Schema, model, Mongoose } = require('mongoose');
const { personSchema } = require('./persons');

const locationSchema = new Schema({
    lng: Number,
    lat: Number
});

const parkingSchema = new Schema({
    parkingId: { type: Number, index: 1 },
    person: personSchema,
    location: locationSchema,
    dateStart: Date,
    dateEnd: Date,
    price: Number,
    active: String
}, { collection: 'parkings' });

const Parking = model('Parking', parkingSchema);

module.exports = Parking;

