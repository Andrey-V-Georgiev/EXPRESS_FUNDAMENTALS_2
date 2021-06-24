const jwt = require('jsonwebtoken');
const config = require('../config/config');

function auth(req, res, next) {

    const token = req.cookies[config.COOKIE_NAME];
    if (token) {
        try{
            /* If the token is OK */
            const data = jwt.verify(token, config.SECRET); 
            req.user = data;
            res.locals.user = data;
            next();
        } catch(e) { 
            /* If the token is invalid */
            res.clearCookie(config.COOKIE_NAME);
            res.redirect('/auth/login');
        }  
    } else {
        /* If no token continue as guest */
        next();
    }
}

module.exports = auth;