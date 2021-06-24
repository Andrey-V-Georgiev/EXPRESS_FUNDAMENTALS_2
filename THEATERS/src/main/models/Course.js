const mongoose = require('mongoose');
const {Schema} = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        minLength: [4, `Title should have minimum length of 4`],
        required: [true, `Title is a required field`],
        unique: [true, `Title must be unique`]
    },
    description: {
        type: String,
        minLength: [20, `Description should have minimum length of 20`],
        maxLength: [50, `Description should have a maximum length of 50`],
        required: [true],
    },
    imageUrl: {
        type: String,
        validate: [/^https.+/, "Image URL must starts with 'https'"],
        required: [true, `Image URL is a required field`],
    },
    duration: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    usersEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Course', courseSchema);