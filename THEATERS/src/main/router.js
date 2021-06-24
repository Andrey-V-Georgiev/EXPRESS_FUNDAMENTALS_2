const {Router} = require('express');
const isAuth = require('./midlewares/isAuth');

class IndexRouter {

    constructor(homeController, authController, theaterController) {
        this._homeController = homeController;
        this._authController = authController;
        this._theaterController = theaterController;
        this._router = Router();
        this._init();
    }
    get router() {
        return this._router;
    }

    _init() {

        /* HOME CONTROLLER */

        this._router.get('/',
            (req, res, next) => this._homeController.homePage(req, res, next));

        /* AUTH CONTROLLER */

        this._router.get('/auth/register',
            (req, res, next) => this._authController.register(req, res, next));

        this._router.post('/auth/register',
            (req, res, next) => this._authController.registerConfirm(req, res, next));

        this._router.get('/auth/login',
            (req, res, next) => this._authController.login(req, res, next));

        this._router.post('/auth/login',
            (req, res, next) => this._authController.loginConfirm(req, res, next));

        this._router.get('/auth/logout', isAuth,
            (req, res, next) => this._authController.logout(req, res, next));

        /* THEATER CONTROLLER */

        this._router.get('/theater/create', isAuth,
            (req, res, next) => this._theaterController.createTheater(req, res, next));

        this._router.post('/theater/create', isAuth,
            (req, res, next) => this._theaterController.createTheateryConfirm(req, res, next));

        this._router.get('/theater/edit/:id', isAuth,
            (req, res, next) => this._theaterController.editTheater(req, res, next));

        this._router.post('/theater/edit/:id', isAuth,
            (req, res, next) => this._theaterController.editTheaterConfirm(req, res, next));

        this._router.get('/theater/delete/:id', isAuth,
            (req, res, next) => this._theaterController.deleteTheaterConfirm(req, res, next));

        this._router.get('/theater/details/:id', isAuth,
            (req, res, next) => this._theaterController.theaterDetails(req, res, next));

        this._router.get('/theater/like/:id', isAuth,
            (req, res, next) => this._theaterController.likeTheater(req, res, next));
    }
}

module.exports = IndexRouter;