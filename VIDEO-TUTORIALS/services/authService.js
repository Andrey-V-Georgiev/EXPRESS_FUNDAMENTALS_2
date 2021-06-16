const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/config');

class AuthService {

    constructor() { }

    async register(username, password) { 
        const hashedPassword = await this.hashPasword(password); 
        const user = new User({username, password: hashedPassword});
        return user.save();
    }

    async hashPasword(rawPassword) { 
        const salt = await bcrypt.genSalt(config.SALT_ROUNDS);
        const hash = await bcrypt.hash(rawPassword, salt); 
        return hash;
    }
}

module.exports = {
    AuthService
};