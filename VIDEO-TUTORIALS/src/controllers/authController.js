const config = require('../config/config');


class AuthController {

    constructor(joiValidator, authService, validationService) {
        this._joiValidator = joiValidator;
        this._authService = authService;
        this._validationService = validationService;
    }

    async register(req, res, next) {
        res.render('auth/register');
    };

    async registerConfirm(req, res, next) { 

        const validationResult = this._joiValidator.registerValidation(req); 
        const error = await this._validationService.generateErrorString(validationResult); 
        if (error) { 
            return res.render('auth/register', {error});
        } 
        const {username, password} = req.body;
        try {
            await this._authService.register(username, password);
            res.redirect('/auth/login');
        } catch (e) {
            next(e)
        }
    };

    async login(req, res, next) {
        res.render('auth/login');
    };

    async loginConfirm(req, res, next) {
        const validationResult = this._joiValidator.loginValidation(req);
        const error = await this._validationService.generateErrorString(validationResult); 
        if (error) { 
            return res.render('auth/login', {error});
        } 
        const {username, password} = req.body ; 
        try {
            const token = await this._authService.login(username, password);
            res.cookie(config.COOKIE_NAME, token);
            res.redirect('/');
        } catch (e) {
            console.log('login err', e);
            next(e)
        }
    };

    async logout(req, res, next) {
        res.clearCookie(config.COOKIE_NAME);
        res.redirect('/');
    }

}


module.exports = AuthController;