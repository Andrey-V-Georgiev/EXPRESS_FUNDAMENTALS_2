const {Router} = require('express');

class IndexRouter {

    constructor(homeController, authController) {
        this.homeController = homeController;
        this.authController = authController;
        this._router = Router();
        this._init();
    }
    get router() {
        return this._router;
    }

    _init() {

        /* HomeController */

        this._router.get('/', (req, res, next) => this.homeController.homePage(req, res, next));

        /* AuthController */

        this._router.get('/auth/register', (req, res, next) => this.authController.register(req, res, next));

        this._router.post('/auth/register', (req, res, next) => this.authController.registerConfirm(req, res, next));

        this._router.get('/auth/login', (req, res, next) => this.authController.login(req, res, next));

        this._router.post('/auth/login', (req, res, next) => this.authController.loginConfirm(req, res, next));

        this._router.get('/auth/logout', (req, res, next) => this.authController.logout(req, res, next));
    }
}

module.exports = {IndexRouter};