

class HomeController {

    constructor() {
    }

    async homePage(req, res) {
        const {username} = req.user;
        res.render('home/user-home', {username});
    };
}

module.exports = HomeController;








