

class HomeController {

    constructor(joiValidator, courseService) {
        this._joiValidator = joiValidator;
        this._courseService = courseService;
    }

    async homePage(req, res) {
        const user = req.user;
        if(user) {
            const courses = await this._courseService.findAll();
            res.render('home/user-home', {user, courses});
        } else {
            //const courses = await this._courseService.findTopEnroled(3);
            res.render('home/guest-home');
        }
    };
}

module.exports = HomeController;








