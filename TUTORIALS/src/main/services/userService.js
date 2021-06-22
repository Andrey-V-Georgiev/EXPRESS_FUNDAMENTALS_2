const User = require('../models/User');


class UserService {

    constructor() { }

    async findUserByUsername(username) {
        const user = await User.findOne({username}).lean();
        return user
    } 
}

module.exports = UserService;