const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true.valueOf,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
});
 
module.exports = mongoose.model('User', userSchema);