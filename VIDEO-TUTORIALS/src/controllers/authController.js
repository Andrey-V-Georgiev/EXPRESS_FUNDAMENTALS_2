const config = require('../config/config');
const {generateErrorString} = require('../utils/validation-util');


class AuthController {

    constructor(joiValidator, authService, userService) {
        this._joiValidator = joiValidator;
        this._authService = authService;
        this._userService = userService;
    }

    /* REGISTER */

    async register(req, res, next) {
        res.render('auth/register');
    };

    async registerConfirm(req, res, next) {
        /* Validate input */
        const validationResult = this._joiValidator.registerValidation(req);
        const error = generateErrorString(validationResult);
        if (error) {
            return res.render('auth/register', {error});
        }
        /* Input data */
        const {username, password} = req.body;
        try {
            /* Check if the name is available */
            const user = await this._userService.findUserByUsername(username);
            if (user) {
                return res.render('auth/register', {error: "User with this username already exist"});
            }
            /* Register the user */
            await this._authService.register(
                username,
                password
            );
            res.redirect('/auth/login');
        } catch (e) {
            next(e)
        }
    };

    /* LOGIN */

    async login(req, res, next) {
        res.render('auth/login');
    };

    async loginConfirm(req, res, next) {
        const validationResult = this._joiValidator.loginValidation(req);
        const error = generateErrorString(validationResult);
        if (error) {
            return res.render('auth/login', {error});
        }
        const {username, password} = req.body;
        try {
            /* Check if the name is available */ 
            const token = await this._authService.login(username, password);
            if (!token) {
                return res.render('auth/login', {error: "Wrong username or password"});
            }
            res.cookie(config.COOKIE_NAME, token);
            res.redirect('/');
        } catch (e) {
            next(e)
        }
    };

    /* LOGOUT */

    async logout(req, res, next) {
        res.clearCookie(config.COOKIE_NAME);
        res.redirect('/');
    }
}


module.exports = AuthController;