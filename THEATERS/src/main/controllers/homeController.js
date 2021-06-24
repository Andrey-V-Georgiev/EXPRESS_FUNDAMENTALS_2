 
class HomeController {

    constructor(joiValidator, theaterService) {
        this._joiValidator = joiValidator;
        this._theaterService = theaterService;
    }

    async homePage(req, res, next) {
        const user = req.user;
        const search = req.query.search; 
        if (user) {
            try {
                const courses = await this._theaterService.findAll(search); 
                res.render('user-home', {user, courses});

            } catch (e) {
                next(e)
            }
        } else {
            try {
                const courses = await this._theaterService.findTopLiked(3); 
                res.render('guest-home', {courses});
            } catch (e) {
                next(e)
            }
        }
    };
}

module.exports = HomeController;








