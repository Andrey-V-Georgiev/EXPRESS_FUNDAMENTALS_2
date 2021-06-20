const {Router} = require('express');
const isAuth = require('./midlewares/isAuth');

class IndexRouter {

    constructor(homeController, authController, courseController) {
        this._homeController = homeController;
        this._authController = authController;
        this._courseController = courseController;
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

        /* COURSE CONTROLLER */

        this._router.get('/course/create', isAuth,
            (req, res, next) => this._courseController.createCourse(req, res, next));

        this._router.post('/course/create', isAuth,
            (req, res, next) => this._courseController.createCourseConfirm(req, res, next));

        this._router.get('/course/edit/:id', isAuth,
            (req, res, next) => this._courseController.editCourse(req, res, next));

        this._router.post('/course/edit/:id', isAuth,
            (req, res, next) => this._courseController.editCourseConfirm(req, res, next));

        this._router.get('/course/delete/:id', isAuth,
            (req, res, next) => this._courseController.deleteCourseConfirm(req, res, next));

        this._router.get('/course/details/:id', isAuth,
            (req, res, next) => this._courseController.courseDetails(req, res, next));

        this._router.get('/course/enroll/:id', isAuth,
            (req, res, next) => this._courseController.enrollUser(req, res, next));
    }
}

module.exports = IndexRouter;