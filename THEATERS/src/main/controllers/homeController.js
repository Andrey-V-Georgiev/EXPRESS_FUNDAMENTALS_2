 
class HomeController {

    constructor(joiValidator, playService) {
        this._joiValidator = joiValidator;
        this._playService = playService;
    }

    async homePage(req, res, next) {
        const user = req.user;
        const sort = req.query.sort; 
        if (user) {
            try {
                const plays = await this._playService.findAll(sort); 
                res.render('home/user-home', {user, plays});

            } catch (e) {
                next(e)
            }
        } else {
            try {
                const plays = await this._playService.findTopLiked(3); 
                res.render('home/guest-home', {plays});
            } catch (e) {
                next(e)
            }
        }
    };
}

module.exports = HomeController;








