const { ObjectId, Double } = require('bson');
const { Schema, model, Mongoose } = require('mongoose');
const { personSchema } = require('./persons');

const locationSchema = new Schema({
    lng: { Type: Number },
    lat: { Type: Number }
});

const parkingSchema = new Schema({
    parkingID: Number,
    person: personSchema,
    location: locationSchema,
    dateStart: Date,
    dateEnd: Date,
    price: Number,
    active: Boolean
}, { collection: 'parkings' });

const Parking = model('Parking', parkingSchema);

module.exports = Parking;

