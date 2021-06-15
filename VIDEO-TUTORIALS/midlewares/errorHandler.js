const errorHandlerr = (err, req, res, next) => {

    err.message = err.message || 'Something went wrong';
    err.status = err.status || 500;

    // for (const [key, value] of Object.entries(err.errors)) {
    //     console.log(`${key}: ${value['message']}`);
    // }

    // res.status(err.status).render('home/user-home', {error: err});
}

module.exports = errorHandlerr;