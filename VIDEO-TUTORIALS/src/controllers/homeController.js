

class HomeController {

    constructor(joiValidator, courseService) {
        this._joiValidator = joiValidator;
        this._courseService = courseService;
    }

    async homePage(req, res) {
        const user = req.user;
        if (user) {
            try {
                const courses = await this._courseService.findAll();
                res.render('home/user-home', {user, courses});
            } catch (e) {
                next(e)
            }
        } else {
            try {
                const courses = await this._courseService.findTopEnroled(3);
                res.render('home/guest-home', {courses});
            } catch (e) {
                next(e)
            }
        }
    };
}

module.exports = HomeController;








