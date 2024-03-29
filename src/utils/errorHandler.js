const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const validateUser = (user) => {
    const schema = Joi.object({
        phoneNumber: Joi.string().required(),
        password: passwordComplexity().required(),
    });

    return schema.validate(user);
}

const validateRegisterUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        password: passwordComplexity().required(),
        passwordConfirmation: passwordComplexity().required().valid(Joi.ref('password')),
    });

    return schema.validate(user);
}

const validateOtp = (otpd) => {
    const schema = Joi.object({
        otp: Joi.string().required(),
    });

    return schema.validate(otpd);
}

const validatePasswordResetRequest = (user) => {
    const schema = Joi.object({
        phoneNumber: Joi.string().required(),
    });

    return schema.validate(user);
}

const validatePasswordReset = (user) => {
    const schema = Joi.object({
        phoneNumber: Joi.string().required(),
        currentPassword: Joi.string().required(),
        password: passwordComplexity().required(),
        passwordConfirmation: passwordComplexity().required().valid(Joi.ref('password')),
    });

    return schema.validate(user);
}

const validateUserId = (user) => {
    const schema = Joi.object({
        userId: Joi.string().required()
    });

    return schema.validate(user);
}


module.exports = {
    validateUser,
    validateRegisterUser,
    validateOtp,
    validateUserId,
    validatePasswordResetRequest,
    validatePasswordReset
}