const config = require('../config/config');

class AuthController {

    constructor(authService) {
        this._authService = authService;
    }

    async register(req, res, next) {
        res.render('auth/register');
    };

    async registerConfirm(req, res, next) {
        // const validationError = registerValidation(req);
        // console.log(validationError);

        const username = req.body.username;
        const password = req.body.password;
        const repeatPassword = req.body.repeatPassword;
        try {
            if (password != repeatPassword) { 
                //todo
            }
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


module.exports = {AuthController};