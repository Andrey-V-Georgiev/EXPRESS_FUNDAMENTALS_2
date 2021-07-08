const config = require('../config/config');
const ValidatorHandler = require('../validators/validatorHandler');


class AuthController {

    constructor(joiValidator, userService) {
        this._joiValidator = joiValidator;
        this._userService = userService;
    }

    /* REGISTER ------------------------------------------------------------------------------------------------ */

    async register(req, res, next) {
        res.render('auth/register', {maleChecked: 'checked'});
    };

    async registerConfirm(req, res, next) {
        /* Input data */
        const data = {
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
        }
        /* Validate input */
        const validationResult = this._joiValidator.registerValidation(req);
        const error = ValidatorHandler.generateErrorJoi(validationResult);
        if (error) {
            return res.render('auth/register', {error, user: data});
        }
        try {
            /* Check if the name is available */
            const user = await this._userService.findUserByEmail(data.email);
            if (user) {
                return res.render('auth/register', {error: "User with this email already exist"});
            }
            /* Register the user */
            await this._userService.register(data);
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
        const email = req.body.email;
        const password = req.body.password; 
        /* Validate input */
        const validationResult = this._joiValidator.loginValidation(req);
        const error = ValidatorHandler.generateErrorJoi(validationResult);
        if (error) { 
            return res.render('auth/login', {error, email});
        }
        try {
            /* Check if the name is available */
            const token = await this._userService.login(
                email,
                password
            ); 
            if (!token) {
                return res.render('auth/login', {error: "Wrong email or password", email});
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