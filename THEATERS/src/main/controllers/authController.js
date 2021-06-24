const config = require('../config/config');
const ValidatorHandler = require('../validators/validatorHandler');


class AuthController {

    constructor(joiValidator, userService) {
        this._joiValidator = joiValidator;
        this._userService = userService;
    }

    /* REGISTER ------------------------------------------------------------------------------------------------ */

    async register(req, res, next) {
        res.render('auth/register');
    };

    async registerConfirm(req, res, next) {
        /* Input data */
        const username = req.body.username;
        const password = req.body.password;

        /* Validate input */
        const validationResult = this._joiValidator.registerValidation(req);
        const error = ValidatorHandler.generateErrorJoi(validationResult);
        if (error) {
            return res.render('auth/register', {error, username});
        }
        try {
            /* Check if the name is available */
            const user = await this._userService.findUserByUsername(username);
            if (user) {
                return res.render('auth/register', {error: "User with this username already exist"});
            }
            /* Register the user */
            await this._userService.register(
                username,
                password
            );
            res.redirect('/auth/login');
        } catch (e) {
            next(e)
        }
    };

    /* LOGIN ------------------------------------------------------------------------------------------------ */

    async login(req, res, next) {
        res.render('auth/login');
    };

    async loginConfirm(req, res, next) {
        /* Input data */
        const username = req.body.username;
        const password = req.body.password;

        /* Validate input */
        const validationResult = this._joiValidator.loginValidation(req);
        const error = ValidatorHandler.generateErrorJoi(validationResult);
        if (error) {
            return res.render('auth/login', {error, username});
        }
        try {
            /* Check if the name is available */
            const token = await this._userService.login(
                username,
                password
            );
            if (!token) {
                return res.render('auth/login', {error: "Wrong username or password", username});
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