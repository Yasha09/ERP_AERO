import {AuthRequest} from "../common/interfaces";
import {Exception} from "../errorHandler/exception";
import {HTTPStatus} from "../errorHandler/types";
import errorMessages from "../common/constants/errorMessages";
import {JwtPayload} from "jsonwebtoken";
import {User} from "../entity/User.entity";
import userService from "../models/users/user.service";

export const getAccessToken = (req: AuthRequest): string => {
    const {authorization} = req.headers;
    console.log('authorization', authorization)
    if (!authorization) {
        throw new Exception(HTTPStatus.Unauthorized, {
            message: errorMessages.unAuthenticated,
        });
    }
    return authorization.startsWith('Bearer ') ? authorization.slice(7, authorization.length) : authorization
};

export const getUserByPayload = async (userPayload: JwtPayload): Promise<User> => {
    console.log('aaaaaaaaa')
    const user: User | null = await userService.getOne({
        id: userPayload.userId,
    });
    console.log('user', user)
    if (!user) {
        throw new Exception(HTTPStatus.Unauthorized, {
            message: errorMessages.unAuthenticated,
        });
    }

    return user;
};
