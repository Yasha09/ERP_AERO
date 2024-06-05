import Joi from 'joi';
import {Exception} from "../errorHandler/exception";
import {HTTPStatus} from "../errorHandler/types";


class Validator {
    private schema: Joi.ObjectSchema;

    constructor(schema: Joi.SchemaMap) {
        this.schema = Joi.object(schema).options({ allowUnknown: true });
    }

    validate(value: any, assign: boolean = true): void {
        const result = this.schema.validate(value);
        if (result.error) {
            throw new Exception(HTTPStatus.BadRequest, {
                message: result.error?.message,
            });
        }
        if (assign) {
            Object.assign(value, result.value);
        }
    }
}

export default Validator;
