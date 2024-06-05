import jwt from "jsonwebtoken";

import {TRefreshTokenPayload, TRefreshTokenResponse} from "./types/refreshToken.type";
import accessTokenService from "./accessToken.service";
import config from "../../configs";
import {Exception} from "../../errorHandler/exception";
import {HTTPStatus} from "../../errorHandler/types";
import errorMessages from "../../common/constants/errorMessages";
import {AppDataSource} from "../../data-source";
import {RefreshToken} from "../../entity/RefreshToken.entity";
import {User} from "../../entity/User.entity";


class RefreshTokenService {
    async generateAccessToken(payload: TRefreshTokenPayload): Promise<string> {
        const jwtPayload: TRefreshTokenPayload = {
            userId: payload.userId,
            deviceId: payload.deviceId
        }

        try {
            return jwt.sign(
                jwtPayload,
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

    async refresh(payload: { deviceId: string, refreshToken: string, user: User }): Promise<TRefreshTokenResponse> {
        const {user, deviceId} = payload;
        const oldRefreshTokenData = await this.getRefreshToken({
            deviceId: payload.deviceId,
            token: payload.refreshToken,
        });


        const [accessTokenPayload, refreshTokenPayload] = await Promise.all([
            accessTokenService.createOne(user),
            this.updateOne({
                userId: user.id,
                deviceId,
                tokenId: oldRefreshTokenData.id,
            })
        ]);

        return {
            accessToken: accessTokenPayload,
            refreshToken: refreshTokenPayload
        }

    }


    async createOne(data: TRefreshTokenPayload): Promise<string> {
        const {userId, deviceId} = data;
        const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

        const newRefreshToken = await this.generateAccessToken({
            userId,
            deviceId
        });

        await refreshTokenRepository.save({
            userId,
            deviceId,
            token: newRefreshToken
        });


        return newRefreshToken

    }

    async updateOne(data: {
        userId: number,
        deviceId: string,
        tokenId: number
    }): Promise<string> {
        const {userId, deviceId} = data;
        const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

        const newRefreshToken = await this.generateAccessToken({
            userId,
            deviceId
        });

        const updatedToken = await refreshTokenRepository.save({
            id: data.tokenId,
            userId,
            deviceId,
            token: newRefreshToken
        });

        return updatedToken.token;

    }

    // todo: add types
    async getRefreshToken(criteria: { userId?: number, deviceId: string, token: string }): Promise<RefreshToken> {
        const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
        console.log('criteria', criteria)
        const refreshToken = await refreshTokenRepository.findOne({
            where: criteria,
            relations: ['user']
        });

        if (!refreshToken) {
            throw new Exception(HTTPStatus.Unauthorized, {message: 'Refresh token not found'});
        }

        return refreshToken;
    }


    async verify(token: string): Promise<jwt.JwtPayload> {
        try {
            return await new Promise((resolve, reject) => {
                jwt.verify(token, config.REFRESH_TOKEN_SECRET, (error, userPayload) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(userPayload as jwt.JwtPayload);

                });
            });
        } catch (error) {
            throw new Exception(HTTPStatus.Unauthorized, {
                message: errorMessages.forbidden,
            });
        }
    }

    async deleteRefreshToken(criteria: { userId?: number, deviceId: string, token: string }): Promise<boolean> {
        const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

        const refreshToken = await refreshTokenRepository.findOne({
            where: criteria
        });

        if (!refreshToken) {
            throw new Exception(HTTPStatus.Unauthorized, {message: 'Refresh token not found'});
        }

        await refreshTokenRepository.delete(refreshToken.id);

        return true;

    }
}


const refreshTokenService = new RefreshTokenService();
export default refreshTokenService;
