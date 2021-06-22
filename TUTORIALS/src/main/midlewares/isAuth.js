 

function isAuth(req, res, next) {

    const user = req.user; 
    if (!user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
}

module.exports = isAuth;