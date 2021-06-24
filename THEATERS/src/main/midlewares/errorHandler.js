const ValidatorHandler = require('../validators/validatorHandler');


async function errorHandlerr(err, req, res, next) {

    if(err) {
        console.log(err);
        const error = ValidatorHandler.generateErrorMongoose(err);
        return res.render('error/error', {error});
    } 
}

module.exports = errorHandlerr;