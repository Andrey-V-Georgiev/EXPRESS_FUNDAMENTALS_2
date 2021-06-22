const Joi = require('joi');

class JoiValidatior {

    constructor() { }

    registerValidation(req) {
        const registerSchema = Joi.object().keys({
            body: Joi.object().keys({
                username: Joi.string()
                    .alphanum()
                    //.min(5)
                    .min(3)
                    .required()
                    .messages({
                        'string.empty': `Username cannot be an empty field`,
                        'string.min': `Username should have a minimum length of {#limit}`,
                        'any.required': `Username is a required field`
                    }),
                password: Joi.string()
                    //.min(5)
                    .min(3)
                    .pattern(new RegExp('^[a-zA-Z0-9]+$'))
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
                    //.min(5)
                    .min(3)
                    .required()
                    .messages({
                        'string.empty': `Username cannot be an empty field`,
                        'string.min': `Username should have a minimum length of {#limit}`,
                        'any.required': `Username is a required field`
                    }),
                password: Joi.string()
                    //.min(5)
                    .min(3)
                    .pattern(new RegExp('^[a-zA-Z0-9]+$'))
                    .required()
                    .messages({
                        'string.min': `Password should have a minimum length of {#limit}`,
                        "string.pattern.base": "Password must contains alphanumeric symbols only",
                        'string.empty': `Password cannot be an empty field`,
                        'string.min': `Password should have a minimum length of {#limit}`,
                        'any.required': `Password is a required field`
                    })
            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return loginSchema.validate(req).error;
    }

    createCourseValidation(req) {
        const createCourse = Joi.object().keys({
            body: Joi.object().keys({
                title: Joi.string()
                    .required()
                    .messages({
                        'string.empty': `Title cannot be an empty field`,
                        'any.required': `Title is a required field`
                    }),
                description: Joi.string()
                    .max(50)
                    .required()
                    .messages({
                        'string.max': `Description should have a maximum length of {#limit}`,
                        'string.empty': `Description cannot be an empty field`,
                        'any.required': `Description is a required field`
                    }),
                imageUrl: Joi.string()
                    .required()
                    .messages({
                        'string.empty': `Image URL cannot be an empty field`,
                        'any.required': `Image URL is a required field`
                    })
            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return createCourse.validate(req).error;
    } 

    editCourseValidation(req) {
        const paramsIdSchema = Joi.object().keys({
            params: Joi.object().keys({
                id: Joi.string()
                    .required()
                    .messages({
                        'string.empty': `Id cannot be an empty field`,
                        'any.required': `Id is a required field`
                    })
            }),
            body: Joi.object().keys({
                title: Joi.string()
                    .required()
                    .messages({
                        'string.empty': `Title cannot be an empty field`,
                        'any.required': `Title is a required field`
                    }),
                description: Joi.string()
                    .max(50)
                    .required()
                    .messages({
                        'string.max': `Description should have a maximum length of {#limit}`,
                        'string.empty': `Description cannot be an empty field`,
                        'any.required': `Description is a required field`
                    }),
                imageUrl: Joi.string()
                    .required()
                    .messages({
                        'string.empty': `Image URL cannot be an empty field`,
                        'any.required': `Image URL is a required field`
                    })
            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return paramsIdSchema.validate(req).error;
    }
}
module.exports = JoiValidatior;