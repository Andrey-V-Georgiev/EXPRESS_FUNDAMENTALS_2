const Joi = require('joi');

class JoiValidatior {

    constructor() { }

    registerValidation(req) {
        const registerSchema = Joi.object().keys({
            body: Joi.object().keys({
                username: Joi.string()
                    .alphanum()
                    .min(3)
                    .required()
                    .messages({
                        'string.empty': `Username cannot be empty field`,
                        'string.min': `Username should have a minimum length of {#limit}`,
                        'any.required': `Username is a required field`
                    }),
                password: Joi.string()
                    .min(3)
                    .pattern(new RegExp('^[a-zA-Z0-9]+$'))
                    .required()
                    .messages({
                        'string.min': `Password should have a minimum length of {#limit}`,
                        "string.pattern.base": "Password must contains alphanumeric symbols only",
                        'string.empty': `Password cannot be empty field`,
                        'string.min': `Password should have a minimum length of {#limit}`,
                        'any.required': `Password is a required field`
                    }),
                repeatPassword: Joi.any()
                    .equal(Joi.ref('password'))
                    .required()
                    .label('Repeat password')
                    .messages({'any.only': '{{#label}} does not match'})
            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return registerSchema.validate(req).error;
    }

    loginValidation(req) {
        const loginSchema = Joi.object().keys({
            body: Joi.object().keys({
                username: Joi.string()
                    .alphanum()
                    .min(3)
                    .required()
                    .messages({
                        'string.empty': `Username cannot be empty field`,
                        'string.min': `Username should have a minimum length of {#limit}`,
                        'any.required': `Username is a required field`
                    }),
                password: Joi.string()
                    .min(3)
                    .pattern(new RegExp('^[a-zA-Z0-9]+$'))
                    .required()
                    .messages({
                        'string.min': `Password should have a minimum length of {#limit}`,
                        "string.pattern.base": "Password must contains alphanumeric symbols only",
                        'string.empty': `Password cannot be empty field`,
                        'string.min': `Password should have a minimum length of {#limit}`,
                        'any.required': `Password is a required field`
                    })
            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return loginSchema.validate(req).error;
    }

    createPlayValidation(req) {
        const createPlaySchema = Joi.object().keys({
            body: Joi.object().keys({
                title: Joi.string()
                    //  .min(4)
                    .required()
                    .messages({
                        'string.min': `Title should have minimum length of {#limit}`,
                        'string.empty': `Title cannot be empty field`,
                        'any.required': `Title is a required field`
                    }),
                description: Joi.string()
                    //.min(20)
                    .max(50)
                    .required()
                    .messages({
                        'string.min': `Description should have minimum length of {#limit}`,
                        'string.max': `Description should have a maximum length of {#limit}`,
                        'string.empty': `Description cannot be empty field`,
                        'any.required': `Description is a required field`
                    }),
                imageUrl: Joi.string()
                    .pattern(new RegExp('^https.*'))
                    .required()
                    .messages({
                        "string.pattern.base": "Image URL must starts with 'https'",
                        'string.empty': `Image URL cannot be empty field`,
                        'any.required': `Image URL is a required field`
                    })
            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return createPlaySchema.validate(req).error;
    }

    editPlayValidation(req) {
        const editPlaySchema = Joi.object().keys({
            body: Joi.object().keys({
                title: Joi.string()
                    //  .min(4)
                    .required()
                    .messages({
                        'string.min': `Title should have minimum length of {#limit}`,
                        'string.empty': `Title cannot be empty field`,
                        'any.required': `Title is a required field`
                    }),
                description: Joi.string()
                    //  .min(20)
                    .max(50)
                    .required()
                    .messages({
                        'string.min': `Description should have minimum length of {#limit}`,
                        'string.max': `Description should have a maximum length of {#limit}`,
                        'string.empty': `Description cannot be empty field`,
                        'any.required': `Description is a required field`
                    }),
                imageUrl: Joi.string()
                    .pattern(new RegExp('^https.*'))
                    .required()
                    .messages({
                        "string.pattern.base": "Image URL must starts with 'https'",
                        'string.empty': `Image URL cannot be empty field`,
                        'any.required': `Image URL is a required field`
                    })
            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return editPlaySchema.validate(req).error;
    }
}
module.exports = JoiValidatior;