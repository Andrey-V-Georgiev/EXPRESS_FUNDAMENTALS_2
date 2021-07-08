const Joi = require('joi');

class JoiValidatior {

    constructor() { }

    registerValidation(req) {
        const registerSchema = Joi.object().keys({
            body: Joi.object().keys({
                email: Joi.string()
                    .pattern(new RegExp('^.*@.*$'))
                    .required()
                    .messages({
                        "string.pattern.base": "Not valid email format",
                        'string.empty': `Email cannot be empty field`,
                        'any.required': `Email is a required field`
                    }),
                password: Joi.string()
                    .min(4)
                    .required()
                    .messages({
                        'string.min': `Password should have a minimum length of {#limit}`,
                        'string.empty': `Password cannot be empty field`,
                        'any.required': `Password is a required field`
                    }),
                rePassword: Joi.any()
                    .equal(Joi.ref('password'))
                    .required()
                    .label('Repeat password')
                    .messages({'any.only': '{{#label}} does not match'}),
                gender: Joi.string()
                    .pattern(new RegExp('^(male|female)$'))
                    .required()
                    .messages({
                        "string.pattern.base": "Gender must be 'male' or 'female'",
                        'string.empty': `Email cannot be empty field`,
                        'any.required': `Email is a required field`
                    }),
            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return registerSchema.validate(req).error;
    }

    loginValidation(req) {
        const loginSchema = Joi.object().keys({
            body: Joi.object().keys({
                email: Joi.string()
                    .pattern(new RegExp('^.*@.*$'))
                    .required()
                    .messages({
                        "string.pattern.base": "Not valid email format",
                        'string.empty': `Email cannot be empty field`,
                        'any.required': `Email is a required field`
                    }),
                password: Joi.string()
                    .min(4)
                    .required()
                    .messages({
                        'string.min': `Password should have a minimum length of {#limit}`,
                        'string.empty': `Password cannot be empty field`,
                        'any.required': `Password is a required field`
                    }),
            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return loginSchema.validate(req).error;
    }

    createTripValidation(req) {
        const createTripSchema = Joi.object().keys({
            body: Joi.object().keys({
                startPoint: Joi.string()
                    .min(4)
                    .required()
                    .messages({
                        'string.min': `Start point should have minimum length of {#limit}`,
                        'string.empty': `Start point is cannot be empty field`,
                        'any.required': `Start point is a required field`
                    }),
                endPoint: Joi.string()
                    .min(4)
                    .required()
                    .messages({
                        'string.min': `End point should have minimum length of {#limit}`,
                        'string.empty': `End point is cannot be empty field`,
                        'any.required': `End point is a required field`
                    }),
                date: Joi.string()
                    .pattern(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'))
                    .required()
                    .messages({
                        "string.pattern.base": "Invalid date format",
                        'string.empty': `Date point is cannot be empty field`,
                        'any.required': `Date point is a required field`
                    }),
                time: Joi.string()
                    .pattern(new RegExp('^[0-9]{2}:[0-9]{2}$'))
                    .required()
                    .messages({
                        "string.pattern.base": "Invalid time format",
                        'string.empty': `Time point is cannot be empty field`,
                        'any.required': `Time point is a required field`
                    }),
                carImage: Joi.string()
                    .pattern(new RegExp('^(https|http).*'))
                    .required()
                    .messages({
                        "string.pattern.base": "Car image must starts with 'https'",
                        'string.empty': `Car image cannot be empty field`,
                        'any.required': `Car image is a required field`
                    }),
                carBrand: Joi.string()
                    .min(4)
                    .required()
                    .messages({
                        'string.min': `Car brand should have minimum length of {#limit}`,
                        'string.empty': `Car brand cannot be empty field`,
                        'any.required': `Car brand is a required field`
                    }),
                seats: Joi.number().integer()
                    .min(1)
                    .max(4)
                    .required()
                    .messages({
                        'string.min': `Seats can be minimum {#limit}`,
                        'string.max': `Seats can be maximum {#limit}`,
                        'string.empty': `Seats cannot be empty field`,
                        'any.required': `Seats is a required field`
                    }),
                price: Joi.number().integer()
                    .min(1)
                    .max(50)
                    .required()
                    .messages({
                        'string.min': `Price can be minimum {#limit}`,
                        'string.max': `Price can be maximum {#limit}`,
                        'string.empty': `Price cannot be empty field`,
                        'any.required': `Price is a required field`
                    }),
                description: Joi.string()
                    .min(10)
                    .required()
                    .messages({
                        'string.min': `Description should have minimum length of {#limit}`,
                        'string.empty': `Description cannot be empty field`,
                        'any.required': `Description is a required field`
                    }),

            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return createTripSchema.validate(req).error;
    }

    editTripValidation(req) {
        const editTripSchema = Joi.object().keys({
            body: Joi.object().keys({
                startPoint: Joi.string()
                    .min(4)
                    .required()
                    .messages({
                        'string.min': `Start point should have minimum length of {#limit}`,
                        'string.empty': `Start point is cannot be empty field`,
                        'any.required': `Start point is a required field`
                    }),
                endPoint: Joi.string()
                    .min(4)
                    .required()
                    .messages({
                        'string.min': `End point should have minimum length of {#limit}`,
                        'string.empty': `End point is cannot be empty field`,
                        'any.required': `End point is a required field`
                    }),
                date: Joi.string()
                    .pattern(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'))
                    .required()
                    .messages({
                        "string.pattern.base": "Invalid date format",
                        'string.empty': `Date point is cannot be empty field`,
                        'any.required': `Date point is a required field`
                    }),
                time: Joi.string()
                    .pattern(new RegExp('^[0-9]{2}:[0-9]{2}$'))
                    .required()
                    .messages({
                        "string.pattern.base": "Invalid time format",
                        'string.empty': `Time point is cannot be empty field`,
                        'any.required': `Time point is a required field`
                    }),
                carImage: Joi.string()
                    .pattern(new RegExp('^(https|http).*'))
                    .required()
                    .messages({
                        "string.pattern.base": "Car image must starts with 'https'",
                        'string.empty': `Car image cannot be empty field`,
                        'any.required': `Car image is a required field`
                    }),
                carBrand: Joi.string()
                    .min(4)
                    .required()
                    .messages({
                        'string.min': `Car brand should have minimum length of {#limit}`,
                        'string.empty': `Car brand cannot be empty field`,
                        'any.required': `Car brand is a required field`
                    }),
                seats: Joi.number().integer()
                    .min(1)
                    .max(4)
                    .required()
                    .messages({
                        'string.min': `Seats can be minimum {#limit}`,
                        'string.max': `Seats can be maximum {#limit}`,
                        'string.empty': `Seats cannot be empty field`,
                        'any.required': `Seats is a required field`
                    }),
                price: Joi.number().integer()
                    .min(1)
                    .max(50)
                    .required()
                    .messages({
                        'string.min': `Price can be minimum {#limit}`,
                        'string.max': `Price can be maximum {#limit}`,
                        'string.empty': `Price cannot be empty field`,
                        'any.required': `Price is a required field`
                    }),
                description: Joi.string()
                    .min(10)
                    .required()
                    .messages({
                        'string.min': `Description should have minimum length of {#limit}`,
                        'string.empty': `Description cannot be empty field`,
                        'any.required': `Description is a required field`
                    }),
            })
        }).options({
            abortEarly: false, allowUnknown: true
        });
        return editTripSchema.validate(req).error;
    }
}
module.exports = JoiValidatior;