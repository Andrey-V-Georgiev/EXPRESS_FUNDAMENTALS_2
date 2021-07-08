const {Router} = require('express');
const isAuth = require('./midlewares/isAuth');

class IndexRouter {

    constructor(homeController, authController, tripController) {
        this._homeController = homeController;
        this._authController = authController;
        this._tripController = tripController;
        this._router = Router();
        this._init();
    }
    get router() {
        return this._router;
    }

    _init() {

        /* AUTH --------------------------------------------------------------------------------------------------------------- */

        this._router.get('/auth/register',  (req, res, next) => this._authController.register(req, res, next));

        this._router.post('/auth/register', (req, res, next) => this._authController.registerConfirm(req, res, next));

        this._router.get('/auth/login',  (req, res, next) => this._authController.login(req, res, next));

        this._router.post('/auth/login', (req, res, next) => this._authController.loginConfirm(req, res, next));

        this._router.get('/auth/logout', isAuth, (req, res, next) => this._authController.logout(req, res, next));

        /* TRIP --------------------------------------------------------------------------------------------------------------- */

        this._router.get('/trip/create', isAuth, (req, res, next) => this._tripController.createTrip(req, res, next));

        this._router.post('/trip/create', isAuth, (req, res, next) => this._tripController.createTripConfirm(req, res, next));

        this._router.get('/trip/details/:id', isAuth, (req, res, next) => this._tripController.tripDetails(req, res, next));

        this._router.get('/trip/join/:id', isAuth, (req, res, next) => this._tripController.tripJoin(req, res, next));
       
        this._router.get('/trip/edit/:id', isAuth, (req, res, next) => this._tripController.editTrip(req, res, next));

        this._router.post('/trip/edit/:id', isAuth, (req, res, next) => this._tripController.editTripConfirm(req, res, next));
        
        this._router.get('/trip/all', isAuth, (req, res, next) => this._tripController.tripsAll(req, res, next));
       
        this._router.get('/trip/delete/:id', isAuth, (req, res, next) => this._tripController.deleteTripConfirm(req, res, next));


        /* HOME --------------------------------------------------------------------------------------------------------------- */

        this._router.get('/', (req, res, next) => this._homeController.homePage(req, res, next));

        this._router.get('/profile', (req, res, next) => this._homeController.homeProfile(req, res, next));
    }
}

module.exports = IndexRouter;