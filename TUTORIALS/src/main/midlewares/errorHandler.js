const ValidationSerevice = require('../services/validationService');


async function errorHandlerr(err, req, res, next) {

    if(err) {
        console.log(err);
        const error = ValidationSerevice.generateErrorMongoose(err);
        return res.render('pages/errors/error', {error});
    } 
}

module.exports = errorHandlerr;