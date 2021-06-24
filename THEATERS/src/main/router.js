const {Router} = require('express');
const isAuth = require('./midlewares/isAuth');

class IndexRouter {

    constructor(homeController, authController, playController) {
        this._homeController = homeController;
        this._authController = authController;
        this._playController = playController;
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

        /* PLAY --------------------------------------------------------------------------------------------------------------- */

        this._router.get('/play/create', isAuth, (req, res, next) => this._playController.createPlay(req, res, next));

        this._router.post('/play/create', isAuth, (req, res, next) => this._playController.createPlayConfirm(req, res, next));

        this._router.get('/play/details/:id', isAuth, (req, res, next) => this._playController.playDetails(req, res, next));
       
        this._router.get('/play/edit/:id', isAuth, (req, res, next) => this._playController.editPlay(req, res, next));

        this._router.post('/play/edit/:id', isAuth, (req, res, next) => this._playController.editPlayConfirm(req, res, next));
        
        this._router.get('/play/like/:id', isAuth, (req, res, next) => this._playController.likePlay(req, res, next));
       
        this._router.get('/play/delete/:id', isAuth, (req, res, next) => this._playController.deletePlayConfirm(req, res, next));


        /* HOME --------------------------------------------------------------------------------------------------------------- */

        this._router.get('/', (req, res, next) => this._homeController.homePage(req, res, next));
    }
}

module.exports = IndexRouter;