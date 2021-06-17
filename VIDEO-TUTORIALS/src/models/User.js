const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true.valueOf,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    }
});
 
module.exports = mongoose.model('User', userSchema);