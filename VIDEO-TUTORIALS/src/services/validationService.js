
class ValidationService {

    constructor() { }

    async generateErrorString(validationResult) {  
        const errors = validationResult.details.map(err => err.message);
        if(!errors) {
            return null;
        }
        const errorString = errors.join(' | ');
        return errorString;
    }
}

module.exports = ValidationService;