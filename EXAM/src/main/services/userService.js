const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

class UserService {

    constructor() { }

    /* FIND ----------------------------------------------------------------------------------------------- */

    async findUserByEmail(email) {
        const user = await User.findOne({email}).lean();
        return user
    }

    async findUserById(id) {
        const user = await User.findOne({_id: id}).lean();
        return user
    }

    /* REGISTER ------------------------------------------------------------------------------------------- */

    async register(data) {
        const hashedPassword = await this.hashPasword(data.password);
        const user = new User({email: data.email, password: hashedPassword, gender: data.gender});
        return user.save();
    }

    /* LOGIN ---------------------------------------------------------------------------------------------- */

    async login(email, password) {
        const user = await this.findUserByEmail(
            email
        );
        const isValidPassword = await bcrypt.compare(
            password, user.password
        );
        if (!isValidPassword) {
            return null;
        }
        const token = jwt.sign({_id: user._id, email: user.email}, config.SECRET);
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