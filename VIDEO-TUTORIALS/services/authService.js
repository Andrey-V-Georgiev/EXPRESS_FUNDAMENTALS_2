const User = require('../models/User');

const register = (username, password) => {
    let user = new User({username, password});
    return user.save();
}

module.exports = {
    register
};