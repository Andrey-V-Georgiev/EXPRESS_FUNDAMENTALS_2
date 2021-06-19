const config = require('../config/config');
const registerValidation = require('../validators/joiValidator');

class AuthController {

    constructor(authService, validationService) {
        this._authService = authService;
        this._validationService = validationService;
    }

    async register(req, res, next) {
        res.render('auth/register');
    };

    async registerConfirm(req, res, next) {
        const validationResult = registerValidation(req);
        const error = await this._validationService.generateErrorString(validationResult); 
        if (error) { 
            return res.render('auth/register', {error});
        } 
        const {username, password} = req.body;
        try {
            const savedUser = this._authService.register(username, password);
            res.redirect('/');
        } catch (e) {
            next(e)
        }
    };

    async login(req, res, next) {
        res.render('auth/login');
    };

    async loginConfirm(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
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