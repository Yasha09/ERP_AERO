import jwt from 'jsonwebtoken';

import {User} from "../../entity/User.entity";
import config from '../../configs'
import {Exception} from "../../errorHandler/exception";
import errorMessages from "../../common/constants/errorMessages";
import {HTTPStatus} from "../../errorHandler/types";

class AccessTokenService {
    async createOne(user: User): Promise<string> {
        try {
            const jwtPayload: AccessTokenPayload = {
                userId: user.id,
                identifier: user.email ?? user.phone,
                identifierType: user.email ? 'email' : 'phone'
            }

            return jwt.sign(
                jwtPayload,
                config.JWT_SECRET,
                {
                    expiresIn: `${config.JWT_EXPIRATION_DATE}`,
                }
            );
        } catch (error) {
            // todo: add logger
            throw new Exception(HTTPStatus.Unauthorized, {
                message: errorMessages.unAuthenticated,
            });
        }
    }

    async verify(token: string): Promise<jwt.JwtPayload> {
        try {
            return await new Promise((resolve, reject) => {
                jwt.verify(token, config.JWT_SECRET, (error, userPayload) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(userPayload as jwt.JwtPayload);
                });
            });
        } catch (error) {
            console.log('3333333333333333333')
            throw new Exception(HTTPStatus.Unauthorized, {
                message: errorMessages.unAuthenticated,
            });
        }
    }
}

const accessTokenService = new AccessTokenService();
export default accessTokenService;