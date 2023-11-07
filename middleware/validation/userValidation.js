const Joi = require("joi");

const createUserValidation = (req, res, next) => {
    try {
        const JoiSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{8,20}$"))
                .required(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            phone: Joi.number(),
        }).options({ abortEarly: false });
        const validate = JoiSchema.validate(req.body);
        if (validate.error) {
            return res.status(400).json({
                status: false,
                message: "Validation error!",
                error: validate.error.details,
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const updateUserValidation = (req, res, next) => {
    try {
        const JoiSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$")),
            firstName: Joi.string(),
            lastName: Joi.string(),
            phone: Joi.number(),
        }).options({ abortEarly: false });
        const validate = JoiSchema.validate(req.body);
        if (validate.error) {
            return res.status(400).json({
                status: false,
                message: "Validation error!",
                error: validate.error.details,
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

module.exports = { createUserValidation, updateUserValidation };
