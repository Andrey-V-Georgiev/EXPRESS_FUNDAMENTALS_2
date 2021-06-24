const config = require('../config/config');
const ValidationSerevice = require('../services/validationService');


class AuthController {

    constructor(joiValidator, authService, userService) {
        this._joiValidator = joiValidator;
        this._authService = authService;
        this._userService = userService;
    }

    /* REGISTER ------------------------------------------------------------------------------------------------ */

    async register(req, res, next) {
        res.render('pages/user/register');
    };

    async registerConfirm(req, res, next) {
        /* Input data */
        const {username, password} = req.body;
        /* Validate input */
        const validationResult = this._joiValidator.registerValidation(req);
        const error = ValidationSerevice.generateErrorJoi(validationResult);
        if (error) {
            return res.render('pages/user/register', {error, username});
        }
        /* Input data */
        try {
            /* Check if the name is available */
            const user = await this._userService.findUserByUsername(username);
            if (user) {
                return res.render('pages/user/register', {error: "User with this username already exist"});
            }
            /* Register the user */
            await this._authService.register(
                {username, password, passwordMin: 5}
            );
            res.redirect('/auth/login');
        } catch (e) {
            next(e)
        }
    };

    /* LOGIN ------------------------------------------------------------------------------------------------ */

    async login(req, res, next) {
        res.render('pages/user/login');
    };

    async loginConfirm(req, res, next) {
        /* Input data */
        const {username, password} = req.body;
        /* Validate input */
        const validationResult = this._joiValidator.loginValidation(req);
        const error = ValidationSerevice.generateErrorJoi(validationResult);
        if (error) {
            return res.render('pages/user/login', {error, username});
        }
        try {
            /* Check if the name is available */
            const token = await this._authService.login({username, password});
            if (!token) {
                return res.render('pages/user/login', {error: "Wrong username or password", username});
            }
            res.cookie(config.COOKIE_NAME, token);
            res.redirect('/');
        } catch (e) {
            next(e)
        }
    };

    /* LOGOUT ------------------------------------------------------------------------------------------------ */

    async logout(req, res, next) {
        res.clearCookie(config.COOKIE_NAME);
        res.redirect('/');
    }
}


module.exports = AuthController;