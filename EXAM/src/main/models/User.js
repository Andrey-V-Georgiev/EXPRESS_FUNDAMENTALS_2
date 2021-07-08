const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,  
        validate: [/^.*@.*$/, "Not valid email format"],
        required: [true, "Email field is required"],
        unique: [true, "This email is already used"]
    },
    password: {
        type: String,
        minLength: [4, "Password must be at least 4 charachters long"],  
        required: [true, "Password field is required"],
    },
    gender: {
        type: String,
        validate: [/^(male|female)$/, "Gender can be male or female"],  
        required: [true, "Password field is required"],
    },
    tripsHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Trip'
    }]
});

module.exports = mongoose.model('User', userSchema);