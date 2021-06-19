function errorHandlerr (err, req, res, next) {

    console.log('HIT errorHandlerr')

    console.log(err)

    // if (err.msg && err.status) {
    //     console.log(err.msg);
    //     res.status(err.status).render('home/user-home', err.msg);
    //     return;
    // }

    // err.message = err.message || 'Something went wrong';
    // err.status = err.status || 500;

    // for (const [key, value] of Object.entries(err.errors)) {
    //     console.log(`${key}: ${value['message']}`);
    // }

    res.redirect('/');
 
}

module.exports = errorHandlerr;