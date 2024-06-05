import {NextFunction, Request, Response} from 'express';
import Joi from "joi";
import Validator from "../../../validation/validation";

const signUpSchema = Joi.object({
    id: Joi.alternatives().try(
        Joi.string().email().message('Invalid email format'),
        Joi.string().pattern(/^[0-9]{9,15}$/).message('Invalid phone number format')
    ).required().messages({
        'any.required': 'id is required',
        'alternatives.match': 'id must be a valid email or phone number'
    }),
    name: Joi.string().optional(),
    password: Joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,30})")).required()
        .messages({
            "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
            "string.empty": `Password cannot be empty`,
            "any.required": `Password is required`,
        }),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().label('Confirm Password').messages({
        "any.only": `Passwords do not match`,
        "any.required": `Confirm Password is required`,
    }),
});

const signInSchema = Joi.object({
    id: Joi.alternatives().try(
        Joi.string().email().message('Invalid email format'),
        Joi.string().pattern(/^[0-9]{9,15}$/).message('Invalid phone number format')
    ).required().messages({
        'any.required': 'id is required',
        'alternatives.match': 'id must be a valid email or phone number'
    }),
    deviceId: Joi.string().uuid({version: 'uuidv4'}).required().messages({
        'string.uuid': 'Invalid device id',
        'any.required': 'Device id is required'
    }),
    password: Joi.string().required().label('Password'),
});


const authValidator = {
    signUp(req: Request, res: Response, next: NextFunction) {
        const {error, value} = signUpSchema.validate(req.body);

        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        // Format the input data
        if (!Joi.string().email().validate(value.id).error) {
            req.body.email = value.id;
        } else {
            req.body.phone = value.id;
        }
        delete req.body.id;

        next();
    },

    signIn(req: Request, res: Response, next: NextFunction) {
        const {error, value} = signInSchema.validate(req.body);

        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        // Format the input data
        if (!Joi.string().email().validate(value.id).error) {
            req.body.email = value.id;
        } else {
            req.body.phone = value.id;
        }
        delete req.body.id;

        next();
    },

    refreshToken(req: Request, res: Response, next: NextFunction) {
        const validator = new Validator({
            refreshToken: Joi.string().required().label('Refresh Token'),
            deviceId: Joi.string().uuid({version: 'uuidv4'}).required().messages({
                'string.uuid': 'Invalid device id',
                'any.required': 'Device id is required'
            }),
        });
        validator.validate(req.body);
        next();
    }



};

const formatUserInput = (error: Joi.ValidationError, value: any) => {

}

export default authValidator;

