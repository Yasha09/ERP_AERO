import jwt from 'jsonwebtoken';

import config from '../../../configs'
import {Exception} from "../../../errorHandler/exception";
import errorMessages from "../../../common/constants/errorMessages";
import {HTTPStatus} from "../../../errorHandler/types";

class RefreshTokenModel {
    // todo: add types
    async create(payload: {
        userId: number,
        deviceId: string,
    }): Promise<string> {
        try {
            return jwt.sign(
                {userId: payload.userId, deviceId: payload.deviceId},
                config.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: `${config.REFRESH_TOKEN_EXPIRATION_DATE}`,

                }
            );
        } catch (error) {
            throw new Exception(HTTPStatus.Unauthorized, {
                message: errorMessages.unAuthenticated,
            });
        }
    }
}

const refreshTokenModel = new RefreshTokenModel();
export default refreshTokenModel;