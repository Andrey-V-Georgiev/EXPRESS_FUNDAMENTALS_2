const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    repeatPassword: Joi.ref('password')
}).options({abortEarly: false, allowUnknown: true});

const registerValidation = (req) => {
    return schema.validate(req.body).error;
}

module.exports = registerValidation;