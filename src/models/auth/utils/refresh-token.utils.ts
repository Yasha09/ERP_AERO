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

    async verify(token: string): Promise<jwt.JwtPayload> {
        try {
            return await new Promise((resolve, reject) => {
                jwt.verify(token, config.REFRESH_TOKEN_SECRET, (error, decoded) => {
                    if (error) {
                        return reject(error);
                    }
                    // const hackedUser = await User.findOne({id: decoded.userId}).exec();
                    // remove all refresh tokens for this user
                });
            });
        } catch (error) {
            throw new Exception(HTTPStatus.Unauthorized, {
                message: errorMessages.forbidden,
            });
        }
    }
}

const refreshTokenModel = new RefreshTokenModel();
export default refreshTokenModel;