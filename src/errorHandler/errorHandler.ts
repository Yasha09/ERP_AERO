import { Request, Response, NextFunction } from 'express';
import {Exception} from "./exception";
import {HTTPStatus} from "./types";
import errorMessages from "../common/constants/errorMessages";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    if (err instanceof Exception) {
        res.status(err.status).send(err);
    } else {
        // eslint-disable-next-line no-console
        console.log("err---------->", err);
        res.status(HTTPStatus.InternalServerError).send({ metaData: { message: errorMessages.internalServerError } });
    }
};
export const errorThrower = (code: number, message: string) => {
    throw new Exception(code, { message });
};
