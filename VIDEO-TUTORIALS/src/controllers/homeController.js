

class HomeController {

    constructor() { 
    } 

    async homePage(req, res) { 
        res.render('home/user-home');
    };
}

module.exports = {HomeController};








