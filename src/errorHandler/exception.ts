import {HTTPStatus} from "./types";

export class Exception extends Error {
    public status: HTTPStatus = HTTPStatus.InternalServerError;

    constructor(
        code = HTTPStatus.InternalServerError,
        public metaData: { message: string} | null = null
    ) {
        super();

        this.metaData = metaData;
        this.status = code;
    }
}
