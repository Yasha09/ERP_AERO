import {Response, NextFunction, Request} from 'express';

import authService from "./auth.service";
import {ISignInResponse} from "./interface";
import refreshTokenService from "./refreshToken.service";
import {HTTPStatus} from "../../errorHandler/types";
import {successMessages} from "../../common/constants/successMessages";
import {TRefreshTokenResponse} from "./types/refreshToken.type";
import {AuthRequest} from "../../common/interfaces";
import {logger} from "../../common/logger/winston";

class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            await authService.signUp(req.body);

            res.status(HTTPStatus.Created).json({
                message: successMessages.userCreated,
            });
        } catch (error) {
            next(error);
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const {deviceId} = req.body;
            const user = await authService.validateUserCredentials(req.body);

            const response: ISignInResponse = await authService.signIn({
                user,
                deviceId
            });

            res.cookie('jwt', response.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24, // 1 day
            });

            res.status(HTTPStatus.OK).json({
                message: successMessages.login,
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    async refreshTokens(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const cookies = req.cookies;

            res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'none'});

            const refreshToken: TRefreshTokenResponse = await refreshTokenService.refresh({
                deviceId: cookies.deviceId,
                refreshToken: cookies.jwt,
                user: req.user
            });

            res.cookie('jwt', refreshToken.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24, // 1 day
            });

            res.status(HTTPStatus.OK).json({
                message: 'User logged in successfully',
                data: {
                    accessToken: refreshToken.accessToken
                }
            });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const cookies = req.cookies;

            await refreshTokenService.deleteRefreshToken({
                userId: req.user.id,
                deviceId: cookies.deviceId,
                token: cookies.jwt
            });

            res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'none'});
            res.status(HTTPStatus.OK).json({
                message: 'User logged out successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();
export default authController;