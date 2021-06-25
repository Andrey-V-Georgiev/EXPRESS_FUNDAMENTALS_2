const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

class UserService {

    constructor() { }

    /* FIND ----------------------------------------------------------------------------------------------- */

    async findUserByUsername(username) {
        const user = await User.findOne({username}).lean();
        return user
    }

    /* REGISTER ------------------------------------------------------------------------------------------- */

    async register(username, password) {
        const hashedPassword = await this.hashPasword(password);
        const user = new User({username, password: hashedPassword});
        return user.save();
    }

    /* LOGIN ---------------------------------------------------------------------------------------------- */

    async login(username, password) {
        const user = await this.findUserByUsername(
            username
        );
        const isValidPassword = await bcrypt.compare(
            password, user.password
        );
        if (!isValidPassword) {
            return null;
        }
        const token = jwt.sign({_id: user._id, username: user.username}, config.SECRET);
        return token;
    }

    /* HASH ----------------------------------------------------------------------------------------------- */

    async hashPasword(rawPassword) {
        const salt = await bcrypt.genSalt(config.SALT_ROUNDS);
        const hash = await bcrypt.hash(rawPassword, salt);
        return hash;
    }
}

module.exports = UserService;