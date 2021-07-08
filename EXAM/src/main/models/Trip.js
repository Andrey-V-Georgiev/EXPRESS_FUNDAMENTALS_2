const mongoose = require('mongoose');
const {Schema} = mongoose;

const tripSchema = new Schema({
    startPoint: {
        type: String,
        minLength: [4, `Start point should have minimum length of 4`],
        required: [true, `Start point is a required field`],
        unique: [true, `Start point must be unique`]
    },
    endPoint: {
        type: String,
        minLength: [4, `End point should have minimum length of 4`],
        required: [true, `End point is a required field`],
        unique: [true, `End point must be unique`]
    },
    date: {
        type: String,
        validate: [/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, "Invalid date format"],
        required: [true, `Date is a required field`]
    },
    time: {
        type: String,
        validate: [/^[0-9]{2}:[0-9]{2}$/, "Invalid time format"],
        required: [true, `Time is a required field`]
    },
    carImage: {
        type: String,
        validate: [/^(https|http).*/, "Image URL must starts with 'https'"],
        required: [true, `Car image is a required field`],
    },
    carBrand: {
        type: String,
        minLength: [4, `Car brand should have minimum length of 4`],
        required: [true, `Car brand is a required field`],
    },
    seats: {
        type: Number,
        min: [1, `Seats should be minimum 1`],
        max: [4, `Seats should be minimum 4`],
        required: [true, `Seats is a required field`],
    },
    price: {
        type: Number,
        min: [1, `Price should be minimum 1`],
        max: [50, `Price should be minimum 50`],
        required: [true, `Price is a required field`],
    },
    description: {
        type: String,
        minLength: [10, `Description should have minimum length of 10`],
        required: [true, `Description is a required field`],
    },
    buddies: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Trip', tripSchema);