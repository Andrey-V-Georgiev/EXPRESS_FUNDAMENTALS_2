const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        minLength: [5, "Username must be at least 5 charachters long"],
        validate: [/^[a-zA-Z0-9]+$/, "Username must contains only english leathers and digits"],
        required: [true, "Username field is required"],
        unique: [true, "This username is already used"]
    },
    password: {
        type: String,
        minLength: [5, "Password must be at least 5 charachters long"], 
        required: [true, "Password field is required"],
    },
    enrolledCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

module.exports = mongoose.model('User', userSchema);