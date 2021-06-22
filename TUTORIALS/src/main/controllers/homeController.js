 
class HomeController {

    constructor(joiValidator, courseService) {
        this._joiValidator = joiValidator;
        this._courseService = courseService;
    }

    async homePage(req, res, next) {
        const user = req.user;
        const search = req.query.search; 
        if (user) {
            try {
                const courses = await this._courseService.findAll(search);
                res.render('pages/home/user-home', {user, courses});

            } catch (e) {
                next(e)
            }
        } else {
            try {
                const courses = await this._courseService.findTopEnroled(3);
                res.render('pages/home/guest-home', {courses});
            } catch (e) {
                next(e)
            }
        }
    };
}

module.exports = HomeController;








