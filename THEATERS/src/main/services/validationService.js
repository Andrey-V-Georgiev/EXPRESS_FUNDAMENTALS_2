class ValidationSerevice {

    constructor() { }

    static generateErrorJoi(validationResult) {
        try {
            const errors = validationResult.details.map(err => err.message);
            const errorString = errors.join(' | ');
            return errorString;
        } catch (e) {
            return null;
        }
    }

    static generateErrorMongoose(err){
        try {
            const errors = err.errors;
            const errMessages = Object.values(errors).map(value => value['properties']['message']);
            const errorString = errMessages.join(' | ');
            return errorString;
        } catch (e) {
            return null;
        }
    }
}

module.exports = ValidationSerevice;