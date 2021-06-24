const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

class AuthService {

    constructor(userService) {
        this._userService = userService;
    }

    async register({username, password}) {
        const  hashedPassword = await this.hashPasword(password);
        const user = new User({username, password: hashedPassword});
        return user.save();
    }

    async hashPasword(rawPassword) {
        const salt = await bcrypt.genSalt(config.SALT_ROUNDS);
        const hash = await bcrypt.hash(rawPassword, salt);
        return hash;
    }

    async login({username, password}) {
        const user = await this._userService.findUserByUsername(
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
}

module.exports = AuthService;