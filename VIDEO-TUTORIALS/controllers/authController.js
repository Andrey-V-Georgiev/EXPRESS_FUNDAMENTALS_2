const router = require('express').Router();
const authService = require('../services/authService'); 
const registerValidation = require('../midlewares/joiValidator'); 

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res, next) => {

    const validationError = registerValidation(req);
    console.log(validationError);

    const {username, password, repeatPassword} = req.body;

    try {
        const savedUser = await authService.register(username, password);
        res.redirect('/');
    } catch (e) {
        next(e)
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    res.redirect('/');
});

module.exports = router;