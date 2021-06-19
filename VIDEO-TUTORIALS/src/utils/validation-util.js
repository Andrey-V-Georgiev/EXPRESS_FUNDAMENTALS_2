generateErrorString = (validationResult) => {
    try {
        const errors = validationResult.details.map(err => err.message);
        const errorString = errors.join(' | ');
        return errorString;
    } catch (e) {
        return null;
    }
}

module.exports = {
    generateErrorString
};