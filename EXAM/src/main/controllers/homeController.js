
class HomeController {

    constructor(joiValidator, tripService, userService) {
        this._joiValidator = joiValidator;
        this._tripService = tripService;
        this._userService = userService;
    }

    async homePage(req, res, next) {
        const user = req.user;
        try {
            res.render('home/home', {user});
        } catch (e) {
            next(e)
        }
    };

    async homeProfile(req, res, next) {
        /* Input data */
        const userId = req.user._id;
        try {
            const user = await this._userService.findUserById(
                userId
            );
            res.render('home/profile', {user});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = HomeController;








