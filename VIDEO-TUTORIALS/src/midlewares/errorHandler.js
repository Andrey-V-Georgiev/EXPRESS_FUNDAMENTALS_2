const {generateErrorMongoose} = require('../utils/validation-util');

async function errorHandlerr(err, req, res, next) {

    if(err) {
        console.log(err);
        const error = generateErrorMongoose(err);
        return res.render('errors/error', {error});
    } 
}

module.exports = errorHandlerr;