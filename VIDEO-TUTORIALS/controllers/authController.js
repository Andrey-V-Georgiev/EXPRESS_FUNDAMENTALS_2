

class AuthController {

    constructor(authService) {
        this._authService = authService;
    }

    register(req, res, next) {
        res.render('auth/register');
    };

    registerConfirm(req, res, next) { 
        // const validationError = registerValidation(req);
        // console.log(validationError);

        const {username, password, repeatPassword} = req.body;

        try {
            const savedUser = this._authService.register(username, password);
            res.redirect('/');
        } catch (e) {
            next(e)
        }
    };

    login(req, res, next) {
        res.render('auth/login');
    };

    loginConfirm(req, res, next) {
        res.redirect('/');
    };

}


module.exports = {AuthController};