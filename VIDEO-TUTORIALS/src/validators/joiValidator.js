const Joi = require('joi');


const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .required()
        .messages({
            'string.empty': `Username cannot be an empty field`,
            'string.min': `Username should have a minimum length of {#limit}`,
            'any.required': `Username is a required field`
        }),

    password: Joi.string()
        .min(3)
        .pattern(new RegExp('^[a-zA-Z0-9]$'))
        .required()
        .messages({
            'string.min': `Password should have a minimum length of {#limit}`,
            "string.pattern.base": "Password must contains alphanumeric symbols only",
            'string.empty': `Password cannot be an empty field`,
            'string.min': `Password should have a minimum length of {#limit}`,
            'any.required': `Password is a required field`
        }),

    repeatPassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Repeat password')
        .messages({'any.only': '{{#label}} does not match'})

}).options({abortEarly: false, allowUnknown: true});

const registerValidation = (req) => {
    return schema.validate(req.body).error;
}

module.exports = registerValidation;